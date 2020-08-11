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

export interface VortoRezulto {
   malinflektitaVorto: string | undefined;
   plenigitaVorto: string | undefined;
   rezultoj: VortoRespondo[];
   gloso: string | undefined;
   malinflektajŜtupoj: string[] | undefined;
   glosajVortoj: string[] | undefined;
   glosajŜtupoj: string[][] | undefined;
   bazajVortoj: string[] | undefined;
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

export interface Argumento {
   vorto: ModifeblaVorto;
}

export interface ModifeblaVorto {
   Kapo: MalinflektitaVorto;
   Modifantoj: Modifanto[];
}

export type Modifanto = {
   tipo: "Pridiranto";
   argumento: Argumento;
} | {
   tipo: "EcoDe";
   argumento: Argumento;
};