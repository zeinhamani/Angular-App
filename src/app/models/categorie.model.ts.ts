import { Media } from './media.model.ts';
import { Habitat } from 'src/app/models/habitat.model.ts';
export class Categorie {
   
    constructor(
        public id: number, 
        public nom: string, 
        public habitats: [{id:number}],
        public media: Media){

    }
}
