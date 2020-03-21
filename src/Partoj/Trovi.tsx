import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trovi, VortoRezulto } from "../API";

import "./Trovi.scss";

const inflekcioj = new Map(
   Object.entries({
      Infinitivo: "INF",
      Difinito: "DEF",
      UnuNombro: "SING",
      PluraNombro: "PLUR",
      Havaĵo: "POSN",
      Progresivo: "PROG",
      Perfekto: "PERF",
      Estonteco: "INTN",
      NominativoVolo: "VOL1",
      AkuzativoVolo: "VOL2",
      DativoVolo: "VOL3",
      PredikativoEsti: "PRED_IS",
      AtributivoEstiAntaŭ: "ATTR_IS>",
      AtributivoEstiMalantaŭ: "ATTR_IS<",
      Havado: "POSS",
      UnuHavado: "POSS_SING",
      PluraHavado: "POSS_PLUR",
      Imperativo: "IMPR",
      Aganto: "ARG1",
      Patiento: "ARG2",
      NedirektaPatiento: "ARG3",
      Ekzistado: "EXST",
      UnuEkzistado: "EXST_SING",
      PluraEkzistado: "EXST_PLUR",
      Invito: "HRT",
      Translativo: "TRNS",
      Ĝerundo: "GER",
      SpecifaĜerundo: "SGER",
      PartaNominativo: "PRT1",
      PartaAkuzativo: "PRT2",
      PartaDativo: "PRT3",
      Igo: "CSTV",
      Sola: "STL",
      Etigo: "DIM",
      Reflekcio: "RFLX"
   })
);

interface Params {
   peto: string;
}

function inflektajŜtupoj(rezulto: VortoRezulto) {
   return `It is inflected as ${rezulto.gloso}-${rezulto.malinflektajŜtupoj
      ?.reverse()
      .map(ŝ => inflekcioj.get(ŝ) || ŝ)
      .join("-")}.`;
}

function specialaRezulto(rezulto: VortoRezulto, peto: string) {
   if (rezulto.plenigitaVorto != null) {
      const ligoAlPlenigita = (
         <Link to={`/word/${rezulto.plenigitaVorto}`}>
            {rezulto.plenigitaVorto}
         </Link>
      );
      if (rezulto.malinflektitaVorto != null) {
         return (
            <span>
               {peto} is an inflected form of a reduced form of{" "}
               {ligoAlPlenigita}. <br /> {inflektajŜtupoj(rezulto)}
            </span>
         );
      }
      return (
         <span>
            {peto} is a reduced form of {ligoAlPlenigita}.
         </span>
      );
   }
   if (rezulto.malinflektitaVorto != null) {
      return (
         <span>
            {peto} is an inflected form of{" "}
            <Link to={`/word/${rezulto.malinflektitaVorto}`}>
               {rezulto.malinflektitaVorto}
            </Link>
            . <br /> {inflektajŜtupoj(rezulto)}
         </span>
      );
   }
   return null;
}

type Ŝtato = "trovado" | "trovita";

export function Trovi() {
   const { peto } = useParams<Params>();
   const [rezulto, setResult] = useState<VortoRezulto | undefined>();
   const [ŝtato, setSearchState] = useState<Ŝtato>("trovado");

   useEffect(() => {
      setSearchState("trovado");
      trovi(peto).then(rezulto => {
         setSearchState("trovita");
         setResult(rezulto);
      });
   }, [peto]);

   if (ŝtato === "trovado" || rezulto == null) return <div>Searching...</div>;

   const speciala = specialaRezulto(rezulto, peto);
   if (
      rezulto.rezultoj.length === 0 &&
      rezulto.plenigitaVorto == null &&
      rezulto.malinflektitaVorto == null &&
      rezulto.glosajVortoj == null
   ) {
      return <div>No results for "{peto}".</div>;
   }

   if (rezulto.glosajVortoj != null) {
      const vortoj = peto.split(" ");
      return (
         <div>
            <p>Gloss result for "{peto}":</p>
            <table className="gloso-tabelo">
               <thead>
                  <tr>
                     <th>Word</th>
                     <th>Base</th>
                     <th>Gloss</th>
                  </tr>
               </thead>
               <tbody>
                  {vortoj.map((v, i) => (
                     <tr>
                        <td>{v}</td>
                        <td>
                           {rezulto?.bazajVortoj![i].length === 0 ? null : (
                              <Link to={`/word/${rezulto?.bazajVortoj![i]}`}>
                                 {rezulto?.bazajVortoj![i]}
                              </Link>
                           )}
                        </td>
                        <td>
                           {rezulto?.glosajVortoj![i]}
                           {rezulto?.glosajŜtupoj?.length! > 0
                              ? rezulto
                                   ?.glosajŜtupoj![i]?.reverse().map(
                                      ŝ => `-${inflekcioj.get(ŝ) || ŝ}`
                                   )
                                   .join("")
                              : null}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   }

   return (
      <div>
         <div className="peto">Search results for "{peto}":</div>
         {speciala == null ? null : (
            <div>
               <span>Special result: </span> {speciala}
            </div>
         )}
         {rezulto.rezultoj.map(r => (
            <div className="rezulto" key={r.vorto}>
               <span className="rezulto-vorto">
                  <Link to={`/word/${r.vorto}`}>{r.vorto}</Link>
               </span>
               <span className="rezulto-signifo">{r.signifo}</span>
            </div>
         ))}
      </div>
   );
}
