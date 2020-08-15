import React, { useState } from "react";

import "./Legilo.scss";
import {legi, ModifeblaVorto, Predikato, Rezulto} from "../API";

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
         <h2>Sentences</h2>
         {rezulto.frazoj.map((frazo, i) => (
            <FrazoAfiŝo frazo={frazo} key={i} />
         ))}
         <h2>Leftover arguments</h2>
      </div>
   );
}

function FrazoAfiŝo({ frazo }: { frazo: Predikato }) {
   return (
      <div>
         <span>{frazo.kapo.vorto.kapo.originalaVorto.vorto}</span>{" "}
         {frazo.argumentoj.map((a, i) => (
            <span key={i}>{a.vorto.kapo.originalaVorto.vorto}</span>
         ))}
      </div>
   );
}

function VortoAfiŝo({ vorto }: { vorto: ModifeblaVorto}) {
   return <span>

   </span>;
}