export class Statistic {
    name: string;
    value: any;

    constructor(name : string, value : any){
        this.name = name;
        this.value = value;
    }

    toString() : string {
        return this.name + ": " + this.value;
    }
}