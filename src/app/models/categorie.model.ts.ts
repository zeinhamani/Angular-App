import { HabitatList } from 'src/app/models/habitatList.model';
import { Media } from './media.model.ts';
import { Habitat } from 'src/app/models/habitat.model.ts';
export class Categorie {
   
    constructor(
        public id: number, 
        public nom: string, 
        public habitats: HabitatList[],
        public media: {id: number,url:string}){}
}
 