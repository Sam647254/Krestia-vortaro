import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";

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

         <form className="serĉilo">
            <input type="text" className="serĉiTeksto"/>
            <input type="submit" className="serĉiButono"
            value="Search"/>
         </form>
      </BrowserRouter>
   );
}

export default App;
