import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {trovi, VortoRezulto} from "./API";

import "./Trovi.scss";

interface Params {
   peto: string;
}

function specialaRezulto(rezulto: VortoRezulto, peto: string) {
   if (rezulto.plenigitaVorto != null) {
      const ligoAlPlenigita = <Link to={`/word/${rezulto.plenigitaVorto}`}>{rezulto.plenigitaVorto}</Link>;
      if (rezulto.malinflektitaVorto != null) {
         return <span>{peto} is an inflected form of a reduced form of {ligoAlPlenigita}</span>;
      }
      return <span>{peto} is a reduced form of {ligoAlPlenigita}.</span>;
   }
   if (rezulto.malinflektitaVorto != null) {
      return <span>{peto} is an inflected form of <Link to={`/word/${rezulto.malinflektitaVorto}`}>
         {rezulto.malinflektitaVorto}
      </Link>.</span>;
   }
   return null;
}

export function Trovi() {
   const {peto} = useParams<Params>();
   const [rezulto, setResult] = useState<VortoRezulto | undefined>();

   useEffect(() => {
      trovi(peto).then(setResult);
   }, [peto]);

   if (rezulto == null) return <div>Searching...</div>;

   const speciala = specialaRezulto(rezulto, peto);
   return <div>
      <div className="peto">Search results for "{peto}":</div>
      {speciala == null ? null : <div><span>Note: </span> {speciala}</div>}
      {rezulto.rezultoj.map(r => <div className="rezulto">
         <span className="rezulto-vorto">
            <Link to={`/word/${r.vorto}`}>{r.vorto}</Link>
         </span>
         <span className="rezulto-signifo">{r.signifo}</span>
      </div>)}
   </div>;
}