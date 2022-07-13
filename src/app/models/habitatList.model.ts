import { Destination } from './destination.model.ts';
export class HabitatList {
    constructor(
        public id: number , 
        public titre: string,
        public prix: number,
        public categorie: {id: number, nom: string},
        public destination: Destination,
        ){

}
}