import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Ĉefpaĝo } from "./Partoj/Ĉefpaĝo";
import { Trovi } from "./Partoj/Trovi";
import { Serĉilo } from "./Partoj/Serĉilo";
import { Vorto } from "./Partoj/Vorto";
import { Vortlisto } from "./Partoj/Vortlisto";
import { TipoVortlisto } from "./Partoj/TipaVortlisto";

function App() {
   return (
      <BrowserRouter>
         <div className="titolo">
            <h1>
               <Link to="/">voliste vol Krestia</Link>
            </h1>
            <p className="subtitolo">Krestia dictionary</p>
         </div>

         {/* eslint-disable-next-line*/}
         <Serĉilo />

         <div className="enhavo">
            <Switch>
               <Route exact path="/">
                  {/* eslint-disable-next-line*/}
                  <Ĉefpaĝo />
               </Route>
               <Route path="/search/:peto">
                  <Trovi />
               </Route>
               <Route path="/word/:vorto">
                  <Vorto />
               </Route>
               <Route exact path="/wordlist">
                  <Vortlisto />
               </Route>
               <Route exact path="/typedlist">
                  <TipoVortlisto />
               </Route>
            </Switch>
         </div>
      </BrowserRouter>
   );
}

export default App;
