import Axios from "axios";

export async function API(peto: string) {
   const respondo = await Axios.get(`/trovi/${peto}`);
   return (await respondo.data) as VortoRezulto;
}

export interface VortoRezulto {
   malinflektitaVorto: string | undefined;
   plenigitaVorto: string | undefined;
   rezultoj: VortoRespondo[];
}

interface VortoRespondo {

}