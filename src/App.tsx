import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {Ĉefpaĝo} from "./Partoj/Ĉefpaĝo";
import {Trovi} from "./Partoj/Trovi";
import {Serĉilo} from "./Partoj/Serĉilo";
import {Vorto} from "./Partoj/Vorto";

function App() {
   return (
      <BrowserRouter>
         <div className="titolo">
            <h1>
               <Link to="/">voliste vol Krestia</Link>
            </h1>
            <p className="subtitolo">
               Krestia dictionary
            </p>
         </div>

         <Serĉilo/>

         <div className="enhavo">
            <Switch>
               <Route exact path="/">
                  <Ĉefpaĝo/>
               </Route>
               <Route path="/search/:peto">
                  <Trovi/>
               </Route>
               <Route path="/word/:vorto">
                  <Vorto/>
               </Route>
            </Switch>
         </div>
      </BrowserRouter>
   );
}

export default App;
