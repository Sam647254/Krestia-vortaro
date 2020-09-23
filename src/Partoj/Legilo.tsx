import React, { useState } from "react";

import "./Legilo.scss";
import {
   Argumento,
   legi,
   Modifanto,
   ModifeblaVorto,
   Predikato,
   Rezulto,
} from "../API";
import { Vortlisto } from "./Vortlisto";

export function Legilo() {
   const eniro = React.createRef<HTMLTextAreaElement>();
   const [rezulto, setResult] = useState<Rezulto | null>(null);

   return (
      <div className="legilo">
         <textarea className="legilo-eniro" rows={10} ref={eniro} />
         <button
            type="button"
            className="serĉiButono legi-butono"
            onClick={async (event) => {
               const eniraTeksto = eniro.current!.value;
               const respondo = await legi(eniraTeksto);
               setResult(respondo);
            }}
         >
            Parse
         </button>
         {rezulto != null ? RezultoAfiŝo(rezulto) : null}
      </div>
   );
}

function RezultoAfiŝo(rezulto: Rezulto) {
   return (
      <div>
         {rezulto.frazoj.length > 0
            ? [
                 <h2>Sentences</h2>,
                 rezulto.frazoj.map((frazo, i) => (
                    <FrazoAfiŝo frazo={frazo} key={i} subfrazo={false} />
                 )),
              ]
            : null}
         {rezulto.argumentoj.length > 0
            ? [
                 <h2>Leftover arguments</h2>,
                 rezulto.argumentoj.map((a, i) => (
                    <ArgumentoAfiŝo key={i} argumento={a} montriSubtitolo={false} />
                 )),
              ]
            : null}
      </div>
   );
}

function ArgumentoAfiŝo({ argumento, montriSubtitolo }: { argumento: Argumento, montriSubtitolo: boolean }) {
   switch (argumento.tipo) {
      case "ene":
         return null;
      case "ArgumentaVorto":
         return (
            <span className={montriSubtitolo ? "argumenta-vorto" : ""}>
               <VortoAfiŝo vorto={argumento.vorto} />{" "}
            </span>
         );
      case "mine":
         return (
            <span className={montriSubtitolo ? "argumenta-vorto" : ""}>
               <VortoAfiŝo vorto={{ kapo: argumento.mine, modifantoj: [] }} />(
               <FrazoAfiŝo frazo={argumento.predikato} subfrazo />
            </span>
         );
   }
}

function FrazoAfiŝo({ frazo, subfrazo }: { frazo: Predikato, subfrazo: boolean }) {
   return (
      <span className={subfrazo ? "" : "predikato"}>
         <span className={subfrazo ? "" : "verbo"}>
            <VortoAfiŝo className={subfrazo ? "" : "predikata-vorto"} vorto={frazo.kapo.vorto} />
         </span>{" "}
         {frazo.argumentoj.map((a, i) => (
            <ArgumentoAfiŝo argumento={a} key={i} montriSubtitolo={!subfrazo} />
         ))}
      </span>
   );
}

function VortoAfiŝo({ vorto, className = "" }: { vorto: ModifeblaVorto, className?: string | undefined }) {
   const [kaŝita, setHidden] = useState(true);
   return (
      <span>
         <span className={className}>{vorto.kapo.originalaVorto.vorto}</span>{" "}
         {vorto.modifantoj.length > 0 ? (
            kaŝita ? (
               <span className="kaŝita" onClick={() => setHidden(!kaŝita)}>
                  [...]
               </span>
            ) : (
               <span className="malkaŝita" onClick={() => setHidden(!kaŝita)}>
                  [{" "}
                  {vorto.modifantoj.map((m, i) => (
                     <ModifantoAfiŝo key={i} modifanto={m} />
                  ))}
                  ]
               </span>
            )
         ) : null}
      </span>
   );
}

function ModifantoAfiŝo({ modifanto }: { modifanto: Modifanto }): JSX.Element {
   switch (modifanto.tipo) {
      case "Pridiranto": {
         return <ArgumentoAfiŝo argumento={modifanto.argumento} montriSubtitolo={false} />;
      }
      case "EcoDe": {
         return (
            <span>
               de: <ArgumentoAfiŝo argumento={modifanto.argumento} montriSubtitolo={false} />
            </span>
         );
      }
      case "ModifantoKunFrazo": {
         return (
            <span>
               {modifanto.modifanto}(<FrazoAfiŝo frazo={modifanto.frazo} subfrazo/>)
            </span>
         );
      }
   }
}
