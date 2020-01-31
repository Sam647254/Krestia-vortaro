import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API, VortoRezulto} from "./API";

interface Params {
   peto: string;
}

export function Trovi() {
   const {peto} = useParams<Params>();
   const [rezulto, setResult] = useState<VortoRezulto | undefined>();

   useEffect(() => {
      API(peto).then(setResult);
   }, [peto]);

   if (rezulto == null) return <div>???</div>;
   return <div>
      <p>Peto: {peto}</p>
      <p>Rezultoj: {rezulto?.rezultoj?.length}</p>
   </div>;
}