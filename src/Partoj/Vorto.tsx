import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { alporti, PlenaVortoRespondo } from "../API";

import "./Vorto.scss";

interface Params {
  vorto: string;
}

export function Vorto() {
  const { vorto } = useParams<Params>();
  const [rezulto, setResult] = useState<PlenaVortoRespondo | undefined>();

  useEffect(() => {
    alporti(vorto).then(setResult);
  }, [vorto]);

  if (rezulto == null) return <div>Word not found: {vorto}</div>;

  return (
    <div>
      <h2 className="vorto">{rezulto.vorto}</h2>
      <div className="streko" />
      <p className="vorttipo">{rezulto.vorttipo}</p>
      <p>{rezulto.signifo}</p>
      {rezulto.noto.length > 0 ? <p>Notes: {rezulto.noto}</p> : null}
      {rezulto.radikoj.length > 0 ? (
        <p>
          Roots:{" "}
          {rezulto?.radikoj
            .map(r => (
              <Link to={`/word/${r}`} key={r}>
                {r}
              </Link>
            ))
            .reduce((lasta, sekva) => [lasta, ", ", sekva] as any)}
        </p>
      ) : null}
    </div>
  );
}
