import React from "react";

import "./Legilo.scss";
import {legi} from "../API";

export function Legilo() {
   const eniro = React.createRef<HTMLTextAreaElement>();

   return <div className="legilo">
      <textarea className="legilo-eniro"
                rows={10}
                ref={eniro}/>
      <button type="button" className="serĉiButono legi-butono"
              onClick={async event => {
                 const eniraTeksto = eniro.current!.value;
                 const respondo = await legi(eniraTeksto);
                 console.log(respondo);
              }}>
         Parse
      </button>
   </div>;
}