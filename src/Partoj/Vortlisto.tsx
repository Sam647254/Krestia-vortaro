import * as React from "react";
import { useEffect, useState } from "react";
import { alportiĈiujn, VortoRespondo } from "../API";
import "./Vortlisto.scss";
import {Link} from "react-router-dom";

type Ŝtato = "alportado" | "alportita" | "eraro";

export function Vortlisto() {
   const [ŝtato, setFetchState] = useState<Ŝtato>("alportado");
   const [rezulto, setResult] = useState<VortoRespondo[] | undefined>();

   useEffect(() => {
      setFetchState("alportado");
      alportiĈiujn()
         .then(vortoj => {
            setResult(vortoj);
            setFetchState("alportita");
         })
         .catch(eraro => {
            setFetchState("eraro");
            console.error(eraro.response);
         });
   }, []);

   if (ŝtato === "alportado") return <div>Loading...</div>;
   if (ŝtato === "eraro")
      return <div>An error occurred while fetching the word list.</div>;
   if (rezulto == null) throw new Error("Unreachable state");

   return (
      <div>
         <p className="centro">The dictionary currently holds {rezulto.length} words.</p>
         <table className="vortlisto">
            <thead>
               <tr>
                  <th>Word</th>
                  <th>Meaning</th>
               </tr>
            </thead>
            <tbody>
               {rezulto.map(v => (
                  <tr>
                     <td><Link to={`/word/${v.vorto}`}>{v.vorto}</Link></td>
                     <td>{v.signifo}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
