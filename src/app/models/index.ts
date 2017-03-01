export interface Alien{
    type: string;
    submitted_by: string;
    id: number;
    decription: string;
}

export interface Job{
    name: string;
    id: string;
    description: string;
}

export interface Colonist{
    name: string;
    job: Job;
    id: number;
    age: number;
}

export interface Encounter{
    id: number;
    date: string;
    colonist_id: number;
    atype: string;
    action: string;
}

export class NewColonist{
    name: string;
    age: string;
    job_id: string;

    constructor(name: string, age:string, job_id:string){
        this.name = name;
        this.age = age;
        this.job_id = job_id;
    }
}


export class NewEncounter{
    atype: string;
    date: string;
    action: string;
    colonist_id: number;
}
