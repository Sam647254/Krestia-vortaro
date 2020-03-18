import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trovi, VortoRezulto } from "../API";

import "./Trovi.scss";

interface Params {
   peto: string;
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
               {ligoAlPlenigita}.
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
            .
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
   if (rezulto.rezultoj.length === 0 && rezulto.plenigitaVorto == null && rezulto.malinflektitaVorto == null) {
      return <div>No results for "{peto}".</div>
   }
   return (
      <div>
         <div className="peto">Search results for "{peto}":</div>
         {speciala == null ? null : (
            <div>
               <span>Note: </span> {speciala}
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
