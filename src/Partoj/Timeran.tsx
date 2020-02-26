import React, { useEffect } from "react";

import "./Timeran.scss";

export interface Props {
   alteco: number;
   silaboj: string[];
}

type Desegnilo = (
   ctx: CanvasRenderingContext2D,
   alteco: number,
   larĝeco: number,
   x: number,
   y: number
) => void;

const m: Desegnilo = (ctx, alteco, larĝeco, x, y) => {
   ctx.lineTo(x, y + alteco);
   ctx.lineTo(x + larĝeco, y + alteco);
};

const p: Desegnilo = (ctx, alteco, larĝeco, x, y) => {
   ctx.moveTo(x, y + alteco);
   ctx.lineTo(x, y);
   ctx.lineTo(x + larĝeco, y);
};

const k: Desegnilo = (ctx, alteco, larĝeco, x, y) => {
   ctx.lineTo(x + larĝeco, y);
   ctx.lineTo(x + larĝeco, y + alteco);
};

const klaso: Desegnilo = (ctx, alteco, larĝeco, x, y) => {
   ctx.moveTo(x + larĝeco, y);
   ctx.lineTo(x, y + alteco / 2);
   ctx.lineTo(x + larĝeco, y + alteco);
};

const desegniloj = new Map<string, Desegnilo>([
   ["p", p],
   [
      "b",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
      }
   ],
   ["m", m],
   [
      "v",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco, y);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
      }
   ],
   [
      "t",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
      }
   ],
   [
      "d",
      (ctx, alteco, larĝeco, x, y) => {
         if (larĝeco < 10) {
            ctx.moveTo(x, y + alteco);
            ctx.lineTo(x, y);
            ctx.lineTo(x + larĝeco, y);
            ctx.lineTo(x + larĝeco, y + alteco);
         } else {
            ctx.lineTo(x + larĝeco, y);
            ctx.moveTo(x + larĝeco / 3, y);
            ctx.lineTo(x + larĝeco / 3, y + alteco);
            ctx.moveTo(x + (larĝeco * 2) / 3, y);
            ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
         }
      }
   ],
   [
      "n",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   [
      "s",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x, y + alteco);
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   [
      "l",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x, y);
      }
   ],
   [
      "r",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
         ctx.lineTo(x, y);
      }
   ],
   [
      "j",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   ["k", k],
   [
      "g",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.moveTo(x + (larĝeco < 10 ? larĝeco / 5 : (larĝeco * 2) / 3), y);
         ctx.lineTo(
            x + (larĝeco < 10 ? larĝeco / 5 : (larĝeco * 2) / 3),
            y + alteco
         );
      }
   ],
   [
      "w",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco, y + alteco / 2);
         ctx.ellipse(
            x + larĝeco / 2,
            y + alteco / 2,
            larĝeco / 2,
            alteco / 2,
            0,
            0,
            360
         );
      }
   ],
   [
      "h",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   ["i", p],
   [
      "e",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x, y + alteco);
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
      }
   ],
   ["a", m],
   ["u", k],
   [
      "o",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
         ctx.moveTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   [
      "ɒ",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x + larĝeco, y);
      }
   ],
   [
      "pl",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
      }
   ],
   [
      "pr",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo((x * 3) / 4, y + alteco);
         ctx.lineTo(x / 2, y);
      }
   ],
   [
      "bl",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
      }
   ],
   [
      "br",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + (larĝeco * 5) / 6, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
      }
   ],
   [
      "tl",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
      }
   ],
   [
      "tr",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 4, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
         ctx.lineTo(x + (larĝeco * 3) / 4, y);
      }
   ],
   [
      "dl",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
      }
   ],
   [
      "dr",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
      }
   ],
   [
      "kl",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   [
      "kr",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.moveTo(x, y);
         ctx.lineTo(x + larĝeco / 4, y + alteco);
         ctx.lineTo(x + larĝeco / 2, y);
      }
   ],
   [
      "gl",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco / 3, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x, y);
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.moveTo(x + (larĝeco * 2) / 3, y);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
      }
   ],
   [
      "gr",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.moveTo(x, y);
         ctx.lineTo(x + larĝeco / 3, y + alteco);
         ctx.lineTo(x + (larĝeco * 2) / 3, y);
         ctx.moveTo(x + (larĝeco * 2) / 3, y);
         ctx.lineTo(x + (larĝeco * 2) / 3, y + alteco);
      }
   ],
   ["NombrigeblaKlaso", klaso],
   ["NenombrigeblaKlaso", klaso],
   [
      "AntaŭNenombrigeblaEco",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco, y + alteco);
         ctx.ellipse(
            x + larĝeco,
            y + alteco / 2,
            larĝeco,
            alteco / 2,
            0,
            Math.PI / 2,
            Math.PI * 1.5
         );
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
      }
   ],
   [
      "AntaŭNombrigeblaEco",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x + larĝeco, y);
         ctx.lineTo(x, y);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
      }
   ],
   [
      "MalplenaVerbo",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco / 2, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
      }
   ],
   [
      "NetransitivaVerbo",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
      }
   ],
   [
      "TransitivaVerbo",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
      }
   ],
   [
      "DutransitivaVerbo",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.lineTo(x + larĝeco, y);
         ctx.lineTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.moveTo(x, y + alteco / 2);
         ctx.lineTo(x + larĝeco, y + alteco / 2);
      }
   ],
   [
      "Lokokupilo",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x + larĝeco, y);
         ctx.moveTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco / 2, y + alteco);
      }
   ],
   [
      "Pridiranto",
      (ctx, alteco, larĝeco, x, y) => {
         ctx.moveTo(x, y + alteco);
         ctx.lineTo(x + larĝeco / 2, y);
         ctx.lineTo(x + larĝeco, y + alteco);
         ctx.lineTo(x, y + alteco);
      }
   ]
]);

const vokaloj = new Set(["i", "e", "a", "u", "o", "ɒ"]);
const larĝeco = 23;
const unuLarĝeco = 15;
const duonaLarĝeco = 8;
const spaceto = 7;

export function Timeran({ alteco, silaboj }: Props) {
   const kanvaso = React.createRef<HTMLCanvasElement>();
   const duonaAlteco = alteco / 2;
   const plenaAlteco = alteco + spaceto;

   useEffect(() => {
      const ctx = kanvaso.current!.getContext("2d")!;
      ctx.lineCap = "round";
      ctx.lineWidth = 4.7;
      ctx.lineJoin = "round";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();
      let x = 5,
         y = 5;
      silaboj.forEach(silabo => {
         ctx.moveTo(x, y);
         switch (silabo.length) {
            case 1:
               desegniloj
                  .get(silabo)
                  ?.call(null, ctx, plenaAlteco, unuLarĝeco, x, y);
               x -= larĝeco - unuLarĝeco;
               break;
            case 2: // VC
               if (vokaloj.has(silabo.charAt(0))) {
                  desegniloj
                     .get(silabo.charAt(0))
                     ?.call(null, ctx, plenaAlteco, duonaLarĝeco, x, y);
                  ctx.moveTo(x + duonaLarĝeco + spaceto, y);
                  desegniloj
                     .get(silabo.charAt(1))
                     ?.call(
                        null,
                        ctx,
                        plenaAlteco,
                        duonaLarĝeco,
                        x + duonaLarĝeco + spaceto,
                        y
                     );
               } else {
                  // CV
                  desegniloj
                     .get(silabo.charAt(0))
                     ?.call(null, ctx, duonaAlteco, unuLarĝeco, x, y);
                  ctx.moveTo(x, y + duonaAlteco + spaceto);
                  desegniloj
                     .get(silabo.charAt(1))
                     ?.call(
                        null,
                        ctx,
                        duonaAlteco,
                        unuLarĝeco,
                        x,
                        y + duonaAlteco + spaceto
                     );
                  x -= larĝeco - unuLarĝeco;
               }
               break;
            case 3: // CCV
               if (vokaloj.has(silabo.charAt(2))) {
                  desegniloj
                     .get(silabo.substr(0, 2))
                     ?.call(null, ctx, duonaAlteco, larĝeco, x, y);
                  ctx.moveTo(x, y + duonaAlteco + spaceto);
                  desegniloj
                     .get(silabo.charAt(2))
                     ?.call(
                        null,
                        ctx,
                        duonaAlteco,
                        larĝeco,
                        x,
                        y + duonaAlteco + spaceto
                     );
               } else {
                  // CVC
                  desegniloj
                     .get(silabo.charAt(0))
                     ?.call(null, ctx, duonaAlteco, larĝeco, x, y);
                  ctx.moveTo(x, y + duonaAlteco + spaceto);
                  desegniloj
                     .get(silabo.charAt(1))
                     ?.call(
                        null,
                        ctx,
                        duonaAlteco,
                        duonaLarĝeco,
                        x,
                        y + duonaAlteco + spaceto
                     );
                  ctx.moveTo(
                     x + duonaLarĝeco + spaceto,
                     y + duonaAlteco + spaceto
                  );
                  desegniloj
                     .get(silabo.charAt(2))
                     ?.call(
                        null,
                        ctx,
                        duonaAlteco,
                        duonaLarĝeco,
                        x + duonaLarĝeco + spaceto,
                        y + duonaAlteco + spaceto
                     );
               }
               break;
            case 4: // CCVC
               desegniloj
                  .get(silabo.substr(0, 2))
                  ?.call(null, ctx, duonaAlteco, larĝeco, x, y);
               ctx.moveTo(x, y + duonaAlteco + spaceto);
               desegniloj
                  .get(silabo.charAt(2))
                  ?.call(
                     null,
                     ctx,
                     duonaAlteco,
                     duonaLarĝeco,
                     x,
                     y + duonaAlteco + spaceto
                  );
               ctx.moveTo(
                  x + duonaLarĝeco + spaceto,
                  y + duonaAlteco + spaceto
               );
               desegniloj
                  .get(silabo.charAt(3))
                  ?.call(
                     null,
                     ctx,
                     duonaAlteco,
                     duonaLarĝeco,
                     x + duonaLarĝeco + spaceto,
                     y + duonaAlteco + spaceto
                  );
               break;
            default:
               // Finaĵo
               desegniloj
                  .get(silabo)
                  ?.call(null, ctx, plenaAlteco, (larĝeco * 2) / 3, x, y);
               break;
         }
         x += larĝeco + spaceto;
      });
      ctx.stroke();
   }, [duonaAlteco, kanvaso, plenaAlteco, silaboj]);

   return (
      <canvas
         className="kanvaso"
         height={alteco + spaceto * 2 + 3}
         width={300}
         ref={kanvaso}
      />
   );
}
