import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {API, VortoRezulto} from "./API";

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
      API(peto).then(setResult);
   }, [peto]);

   if (rezulto == null) return <div>Searching...</div>;

   const speciala = specialaRezulto(rezulto, peto);
   return <div>
      {speciala == null ? null : <div><span>Note: </span> {speciala}</div>}
      <p>Rezultoj: {rezulto?.rezultoj?.length}</p>
   </div>;
}