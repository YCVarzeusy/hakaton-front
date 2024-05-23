
export interface fighterInterface {

    id:number;
    name:string;
    last_name:string;
    avatar_url:string;
    category_id:number;
    categoria:string;
    level: levelInterface[]
}

interface levelInterface {
    power:number,
    technique_id:number,
}
