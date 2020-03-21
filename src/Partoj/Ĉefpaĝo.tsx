import React from "react";
import { Link } from "react-router-dom";

export function Ĉefpaĝo() {
   return (
      <div>
         <p>
            Krestia is an engineered language that I have started working on
            since late 2019.
         </p>
         <p>
            This website is the dictionary. You can use the search bar to look
            up words, even in their inflected forms, or view the full{" "}
            <Link to="/wordlist">word list</Link>.
         </p>
         <p>
            For the reference grammar, please see the{" "}
            <a href="http://5am.link/krestia-book">Krestia book.</a>
         </p>
      </div>
   );
}
