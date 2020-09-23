import Axios from "axios";

export async function trovi(peto: string) {
   const respondo = await Axios.get(`/api/trovi/${peto}`);
   return (await respondo.data) as VortoRezulto;
}

export async function alporti(vorto: string) {
   const respondo = await Axios.get(`/api/vorto/${vorto}`);
   return (await respondo.data) as PlenaVortoRespondo;
}

export async function alportiĈiujn() {
   const respondo = await Axios.get(`/api/vortlisto/alfabeta`);
   return (await respondo.data) as VortoRespondo[];
}

export async function alportiĈiujnTipajn() {
   const respondo = await Axios.get("/api/vortlisto/tipo");
   return (await respondo.data) as TipaVortlisto;
}

export async function alportiĈiujnKategoriojn() {
   const respondo = await Axios.get("/api/vortlisto/kategorioj");
   return (await respondo.data) as KategoriaVortlisto;
}

export async function legi(eniro: string) {
   const respondo = await Axios.post("/api/legi", { eniro });
   if (respondo.status === 200) {
      return (await respondo.data) as Rezulto;
   } else {
      throw respondo.data;
   }
}

export interface VortoRezulto {
   malinflektitaVorto: string | undefined;
   plenigitaVorto: string | undefined;
   rezultoj: VortoRespondo[];
   gloso: string | undefined;
   malinflektajŜtupoj: string[] | undefined;
   glosajVortoj: string[] | undefined;
   glosajŜtupoj: string[][] | undefined;
   bazajVortoj: string[] | undefined;
   nombroRezulto: number | undefined;
}

export interface VortoRespondo {
   vorto: string;
   signifo: string;
}

export interface PlenaVortoRespondo extends VortoRespondo {
   kategorioj: string[];
   noto: string;
   radikoj: string[];
   vorttipo: string;
   silaboj: string[];
   inflektitajFormoj: {
      [key: string]: string;
   };
   blissimbolo?: number[];
   ujoj: [string, string, string];
}

export interface TipaVortlisto {
   [key: string]: VortoRespondo[];
}

export interface KategoriaVortlisto {
   [key: string]: {
      vortoj: VortoRespondo[];
      subkategorioj: string[];
      superkategorioj: string[];
   }
}

export interface MalinflektitaVorto {
   originalaVorto: EniraVorto;
}

export interface EniraVorto {
   vico: number;
   pozo: number;
   vorto: string;
}

export type Argumento = {
   tipo: "ArgumentaVorto";
   vorto: ModifeblaVorto;
} | {
   tipo: "ene";
   predikato: Predikato;
   ene: ModifeblaVorto;
} | {
   tipo: "mine";
   predikato: Predikato;
   mine: MalinflektitaVorto;
}

export interface ModifeblaVorto {
   kapo: MalinflektitaVorto;
   modifantoj: Modifanto[];
}

export type Modifanto = {
   tipo: "Pridiranto";
   argumento: Argumento;
} | {
   tipo: "EcoDe";
   argumento: Argumento;
} | {
   tipo: "ModifantoKunFrazo";
   modifanto: string;
   frazo: Predikato;
};

export interface Rezulto {
   frazoj: Predikato[];
   argumentoj: Argumento[];
}

export interface Predikato {
   kapo: Verbo;
   argumentoj: Argumento[];
}

export interface Verbo {
   vorto: ModifeblaVorto;
}

export type Eraro = [EniraVorto, string];