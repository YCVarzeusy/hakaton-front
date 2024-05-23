import { techiniqueInterface } from "./technique";

export interface levelInterface {
    id:number;
    power:number;
   fighter_id:number;
   technique_id:number;
   techinique:techiniqueInterface;
   created_at: string;
}