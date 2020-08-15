import React, { useState } from "react";

import "./Legilo.scss";
import { legi, Modifanto, ModifeblaVorto, Predikato, Rezulto } from "../API";
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
            onClick={async event => {
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
                    <FrazoAfiŝo frazo={frazo} key={i} />
                 ))
              ]
            : null}
         {rezulto.argumentoj.length > 0
            ? [
                 <h2>Leftover arguments</h2>,
                 rezulto.argumentoj.map((a, i) => (
                    <span>
                       <VortoAfiŝo key={i} vorto={a.vorto} />{" "}
                    </span>
                 ))
              ]
            : null}
      </div>
   );
}

function FrazoAfiŝo({ frazo }: { frazo: Predikato }) {
   return (
      <div>
         <div className="predikata-vorto">
            {frazo.kapo.vorto.kapo.originalaVorto.vorto}
         </div>{" "}
         {frazo.argumentoj.map((a, i) => (
            <div className="argumenta-vorto">
               <VortoAfiŝo key={i} vorto={a.vorto} />
            </div>
         ))}
      </div>
   );
}

function VortoAfiŝo({ vorto }: { vorto: ModifeblaVorto }) {
   const [kaŝita, setHidden] = useState(true);
   return (
      <span>
         <span>{vorto.kapo.originalaVorto.vorto}</span>{" "}
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

function ModifantoAfiŝo({ modifanto }: { modifanto: Modifanto }) {
   switch (modifanto.tipo) {
      case "Pridiranto": {
         return <VortoAfiŝo vorto={modifanto.Argumento.vorto} />;
      }
      case "EcoDe": {
         return (
            <span>
               de: <VortoAfiŝo vorto={modifanto.Argumento.vorto} />
            </span>
         );
      }
   }
}
