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
                    <ArgumentoAfiŝo
                       key={i}
                       argumento={a}
                       montriSubtitolo={false}
                    />
                 )),
              ]
            : null}
      </div>
   );
}

function ArgumentoAfiŝo({
   argumento,
   montriSubtitolo,
   onHover,
}: {
   argumento: Argumento;
   montriSubtitolo: boolean;
   onHover?: (hover: boolean) => void;
}) {
   const [kaŝita, setHidden] = useState(true);
   const [hover, setHover] = useState(false);
   switch (argumento.tipo) {
      case "ene":
      case "mine":
         return (
            <span
               className={montriSubtitolo ? "argumenta-vorto" : ""}
               onMouseOver={() => onHover?.(true)}
               onMouseOut={() => onHover?.(false)}
            >
               <VortoAfiŝo
                  vorto={{
                     kapo:
                        argumento.tipo === "ene"
                           ? argumento.ene
                           : argumento.mine,
                     modifantoj: [],
                  }}
                  onHover={setHover}
               />{" "}
               {kaŝita ? (
                  <span onClick={() => setHidden(!kaŝita)}>(...)</span>
               ) : (
                  <FrazoAfiŝo frazo={argumento.predikato} subfrazo />
               )}
            </span>
         );
      case "ArgumentaVorto":
         return (
            <span className={montriSubtitolo ? "argumenta-vorto" : ""}>
               <VortoAfiŝo vorto={argumento.vorto} />{" "}
            </span>
         );
   }
}

function FrazoAfiŝo({
   frazo,
   subfrazo,
   onHover,
}: {
   frazo: Predikato;
   subfrazo: boolean;
   onHover?: (hover: boolean) => void;
}) {
   const [hover, setHover] = useState(false);
   const [childHover, setChildHover] = useState(false);
   return (
      <span
         className={subfrazo ? "" : "predikato"}
         onMouseOver={() => onHover?.(true)}
         onMouseOut={() => onHover?.(false)}
      >
         <span className={subfrazo ? "" : "verbo"}>
            <VortoAfiŝo
               className={[
                  "predikata-vorto",
                  hover ? "hover-self" : "",
                  childHover ? "hover-parent" : "",
               ].join(" ")}
               vorto={frazo.kapo.vorto}
               onHover={setHover}
            />
         </span>{" "}
         {frazo.argumentoj.map((a, i) => (
            <ArgumentoAfiŝo
               argumento={a}
               key={i}
               montriSubtitolo={!subfrazo}
               onHover={setChildHover}
            />
         ))}
      </span>
   );
}

function VortoAfiŝo({
   vorto,
   className = "",
   onHover,
}: {
   vorto: ModifeblaVorto;
   className?: string | undefined;
   onHover?: (hover: boolean) => void;
}) {
   const [kaŝita, setHidden] = useState(true);
   const [hover, setHover] = useState(false);
   return (
      <span
         onMouseOver={() => {
            if (!kaŝita) onHover?.(true);
         }}
         onMouseOut={() => {
            if (!kaŝita) onHover?.(false);
         }}
      >
         <span
            className={className + ` ${hover ? "hover-self" : ""}`}
            onMouseOver={() => {
               setHover(true);
            }}
            onMouseOut={() => {
               setHover(false);
            }}
         >
            {vorto.kapo.originalaVorto.vorto}
         </span>{" "}
         {vorto.modifantoj.length > 0 ? (
            kaŝita ? (
               <span className="kaŝita" onClick={() => setHidden(!kaŝita)}>
                  [...]
               </span>
            ) : (
               <span className="malkaŝita">
                  [{" "}
                  {vorto.modifantoj.map((m, i) => (
                     <ModifantoAfiŝo key={i} modifanto={m} />
                  ))}{" "}
                  ]
               </span>
            )
         ) : null}
      </span>
   );
}

function ModifantoAfiŝo({ modifanto }: { modifanto: Modifanto }): JSX.Element {
   const [kaŝita, setHidden] = useState(true);
   switch (modifanto.tipo) {
      case "Pridiranto": {
         return (
            <ArgumentoAfiŝo
               argumento={modifanto.argumento}
               montriSubtitolo={false}
            />
         );
      }
      case "EcoDe": {
         return (
            <span>
               de:{" "}
               <ArgumentoAfiŝo
                  argumento={modifanto.argumento}
                  montriSubtitolo={false}
               />
            </span>
         );
      }
      case "ModifantoKunFrazo": {
         return kaŝita ? (
            <span>
               {modifanto.modifanto}{" "}
               <span onClick={() => setHidden(!kaŝita)}>(...)</span>
            </span>
         ) : (
            <span>
               {modifanto.modifanto} ({" "}
               <FrazoAfiŝo frazo={modifanto.frazo} subfrazo /> )
            </span>
         );
      }
      case "SimplaModifanto": {
         return <span>{modifanto.modifanto} </span>;
      }
      case "ModifantoKunArgumentoj": {
         return modifanto.argumento.length > 0 ? (
            <span>
               {modifanto.modifanto} (
               {modifanto.argumento.map((argumento) => (
                  <ArgumentoAfiŝo
                     argumento={argumento}
                     montriSubtitolo={false}
                  />
               ))}
               )
            </span>
         ) : (
            <span>{modifanto.modifanto} </span>
         );
      }
      case "Keni": {
         return (
            <span>
               <ArgumentoAfiŝo
                  argumento={modifanto.argumento1}
                  montriSubtitolo={false}
               />
               <ArgumentoAfiŝo
                  argumento={modifanto.argumento2}
                  montriSubtitolo={false}
               />
            </span>
         );
      }
      case "Pini": {
         return (
            <span>
               <ArgumentoAfiŝo
                  argumento={modifanto.argumento1}
                  montriSubtitolo={false}
               />
               <ArgumentoAfiŝo
                  argumento={modifanto.argumento2}
                  montriSubtitolo={false}
               />
               <ArgumentoAfiŝo
                  argumento={modifanto.argumento3}
                  montriSubtitolo={false}
               />
            </span>
         );
      }
      case "Ene":
      case "Mine": {
         return <FrazoAfiŝo frazo={modifanto.predikato} subfrazo />;
      }
   }
}
