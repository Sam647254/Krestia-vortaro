import React, {useEffect} from "react";

export interface Props {
   alteco: number;
   silaboj: string[];
}

const desegniloj = new Map<string, (ctx: CanvasRenderingContext2D, alteco: number, larĝeco: number) => void>();

export function Timeran({alteco, silaboj}: Props) {
   const kanvaso = React.createRef<HTMLCanvasElement>();

   useEffect(() => {
      const ctx = kanvaso.current;
   }, [kanvaso, silaboj]);

   return <div>
      <canvas height={alteco} width={500} ref={kanvaso}/>
   </div>;
}