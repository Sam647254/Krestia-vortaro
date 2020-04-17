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
            up words, even in their inflected forms, or view the full word list
            in the following formats:
            <ul>
               <li>
                  <Link to="/wordlist">Alphabetical</Link>
               </li>
               <li>
                  <Link to="/typedlist">Alphabetical by type</Link>
               </li>
            </ul>
         </p>
         {/*<p>*/}
         {/*   For the reference grammar, please see the{" "}*/}
         {/*   <a href="http://5am.link/krestia-book">Krestia book.</a>*/}
         {/*</p>*/}
         <div>
            <h2>Changelog</h2>
            <h3>v0.2 (work in progress)</h3>
            <ul>
               <li>Added slot information to verbs</li>
               <li>Added Blissymbols to dictionary entries</li>
               <li>(Recreated the lexicon)</li>
            </ul>
            <h3>v0.1 (2020/04/05)</h3>
            <ul>
               <li>Initial public release</li>
            </ul>
            <h2>Copyright information</h2>
            <p>This website uses Blissymbols.</p>
            <p className="malgranda">
               Blissymbol resources based on the Blissymbolics Communication
               International Authorized Vocabulary (BCI-AV) are licensed under a
               Creative Commons Attribution-Share Alike 3.0 Unported License.
               Based on a work by Blissymbolics Communication International
               (BCI) available via{" "}
               <a
                  href="http://blissymbolics.org"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  www.blissymbolics.org.
               </a>{" "}
               (An alternative royalty based supported license option for
               commercial distribution of Blissymbol resources is also
               available. Please contact BCI at{" "}
               <a href="mailto:bic@blissymbolics.org">bci@blissymbolics.org</a>{" "}
               for further details.)
            </p>
         </div>
      </div>
   );
}
