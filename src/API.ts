import Axios from "axios";

export async function trovi(peto: string) {
   const respondo = await Axios.get(`/trovi/${peto}`);
   return (await respondo.data) as VortoRezulto;
}

export async function alporti(vorto: string) {
   const respondo = await Axios.get(`/vorto/${vorto}`);
   return (await respondo.data) as PlenaVortoRespondo;
}

export async function alportiĈiujn() {
   const respondo = await Axios.get(`/vortlisto/alfabeta`);
   return (await respondo.data) as VortoRespondo[];
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
}