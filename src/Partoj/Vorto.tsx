import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { alporti, PlenaVortoRespondo } from "../API";

import "./Vorto.scss";
import { Timeran } from "./Timeran";

const inflekcioj = new Map(
   Object.entries({
      Infinitivo: "Infinitive",
      Difinito: "Definite",
      UnuNombro: "Singular",
      PluraNombro: "Plural",
      Havaĵo: "Possession",
      Progresivo: "Progressive",
      Perfekto: "Perfect",
      Estonteco: "Intention",
      NominativoVolo: "Slot-1 volition",
      AkuzativoVolo: "Slot-2 volition",
      DativoVolo: "Slot-3 volition",
      PredikativoEsti: "Predicative identity",
      AtributivoEstiAntaŭ: "Attributive identity (prefix)",
      AtributivoEstiMalantaŭ: "Attributive identity (postfix)",
      Havado: "Possessive",
      Imperativo: "Imperative",
      Aganto: "Slot-1 argument",
      Patiento: "Slot-2 argument",
      NedirektaPatiento: "Slot-3 argument",
      Ekzistado: "Existential",
      Invito: "Hortative",
      Translativo: "Translative",
      Ĝerundo: "Gerund",
      SpecifaĜerundo: "Specific gerund",
      PartaNominativo: "Slot-1 partial",
      PartaAkuzativo: "Slot-2 partial",
      PartaDativo: "Slot-3 partial",
      Igo: "Causative",
      Sola: "Standalone",
      Etigo: "Diminutive",
      Reflekcio: "Reflexive",
      Okazo: "Occurrence",
      AktualaOkazo: "Ongoing occurrence",
      FinitaOkazo: "Complete occurrence"
   })
);

interface Params {
   vorto: string;
}

type Ŝtato = "alportado" | "alportita" | "netrovita" | "eraro";

export function Vorto() {
   const { vorto } = useParams<Params>();
   const [rezulto, setResult] = useState<PlenaVortoRespondo | undefined>();
   const [ŝtato, setFetchState] = useState<Ŝtato>("alportado");

   useEffect(() => {
      setFetchState("alportado");
      alporti(vorto)
         .then(respondo => {
            setResult(respondo);
            setFetchState("alportita");
         })
         .catch(eraro => {
            console.error(eraro.response);
            if (eraro.response.status === 404) {
               setFetchState("netrovita");
            } else {
               setFetchState("eraro");
            }
         });
   }, [vorto]);

   if (ŝtato === "alportado") return <div>Loading...</div>;
   if (ŝtato === "netrovita") return <div>Word not found: {vorto}</div>;
   if (ŝtato === "eraro")
      return <div>A server-side error occurred when fetching {vorto}.</div>;
   if (rezulto == null) throw new Error("Unreachable state");

   return (
      <div>
         <h2 className="vorto">{rezulto.vorto}</h2>
         <Timeran alteco={25} silaboj={rezulto.silaboj} />
         <div className="streko" />
         <p className="vorttipo">{rezulto.vorttipo}</p>
         <p>{rezulto.signifo}</p>
         {rezulto.noto.length > 0 ? <p>Notes: {rezulto.noto}</p> : null}
         {rezulto.radikoj.length > 0 ? (
            <p>
               Roots:{" "}
               {rezulto?.radikoj
                  .map(r => (
                     <Link to={`/word/${r}`} key={r}>
                        {r}
                     </Link>
                  ))
                  .reduce((lasta, sekva) => [lasta, ", ", sekva] as any)}
            </p>
         ) : null}
         {rezulto?.inflektitajFormoj == null
            ? null
            : [
                 <h3 key="h3">Inflected forms</h3>,
                 <table className="inflekcio-tabelo" key="tabelo">
                    <thead>
                       <tr>
                          <th>Inflection</th>
                          <th>Inflected form</th>
                       </tr>
                    </thead>
                    <tbody>
                       {Object.entries(rezulto.inflektitajFormoj).map(
                          ([inflekcio, inflektitaFormo]) => (
                             <tr key={inflekcio}>
                                <td>
                                   {inflekcioj.get(inflekcio) || inflekcio}
                                </td>
                                <td>{inflektitaFormo}</td>
                             </tr>
                          )
                       )}
                    </tbody>
                 </table>
              ]}
      </div>
   );
}
