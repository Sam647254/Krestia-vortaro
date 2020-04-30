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
         {/*<p>*/}
         {/*   For the reference grammar, please see the{" "}*/}
         {/*   <a href="http://5am.link/krestia-book">Krestia book.</a>*/}
         {/*</p>*/}
         <div>
            <h2>Changelog</h2>
            <h3>v0.2 (work in progress)</h3>
            <ul>
               <li>Added Blissymbols to dictionary entries</li>
               <li>(Recreated the lexicon)</li>
            </ul>
            <h3>v0.1 (2020/04/05)</h3>
            <ul>
               <li>Initial public release</li>
            </ul>
         </div>
      </div>
   );
}
