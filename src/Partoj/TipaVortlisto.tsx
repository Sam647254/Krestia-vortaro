import React, { useEffect, useState } from "react";
import { alportiĈiujnTipajn, TipaVortlisto } from "../API";
import { Link } from "react-router-dom";

type Ŝtato = "alportado" | "alportita" | "eraro";

export function TipoVortlisto() {
   const [ŝtato, setFetchState] = useState<Ŝtato>("alportado");
   const [rezulto, setResult] = useState<TipaVortlisto | undefined>();

   useEffect(() => {
      setFetchState("alportado");
      alportiĈiujnTipajn()
         .then(listo => {
            setResult(listo);
            setFetchState("alportita");
         })
         .catch(eraro => {
            setFetchState("eraro");
            console.error(eraro);
         });
   }, []);

   if (ŝtato === "alportado") return <div>Loading</div>;
   if (ŝtato === "eraro")
      return <div>An error occurred while fetching the word list.</div>;
   if (rezulto == null) throw new Error("Unreachable state");

   return (
      <div>
         {Object.entries(rezulto).map(valuo => (
            <div>
               <h2>{valuo[0]}</h2>
               <table className="vortlisto">
                  <thead>
                     <tr>
                        <th>Word</th>
                        <th>Meaning</th>
                     </tr>
                  </thead>
                  <tbody>
                     {valuo[1].map(v => (
                        <tr>
                           <td>
                              <Link to={`/word/${v.vorto}`}>{v.vorto}</Link>
                           </td>
                           <td>{v.signifo}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ))}
      </div>
   );
}
