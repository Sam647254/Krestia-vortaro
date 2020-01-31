import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Ĉefpaĝo} from "./Ĉefpaĝo";
import {Trovi} from "./Trovi";
import {Serĉilo} from "./Serĉilo";

function App() {
   return (
      <BrowserRouter>
         <div className="titolo">
            <h1>
               voliste vol Krestia
            </h1>
            <p className="subtitolo">
               Krestia dictionary
            </p>
         </div>

         <Serĉilo/>

         <Switch>
            <Route exact path="/">
               <Ĉefpaĝo/>
            </Route>
            <Route path="/search/:peto">
               <Trovi/>
            </Route>
         </Switch>
      </BrowserRouter>
   );
}

export default App;
