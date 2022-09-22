export interface TachePreventif{
    id?:string,
    planPreventif?:string,
    dateExecution?:string,
    personnel?:Array<any>,
    machine?:string,
    etatTache?:string,
    montant?:number,
    notes?:string,
    numero?:number,
    societeRacine?:string;
}