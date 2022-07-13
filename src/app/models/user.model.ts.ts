import { Media } from './media.model.ts';
import { Reservation } from './reservation.model.ts';
import { Habitat } from "./habitat.model.ts";

export class User {
    constructor(
        public id: number,
        public email: string, 
        public password: string,
        public roles: string, 
        public nom: string ,
        public reservations: [{id: number}],
        public habitats: [{id: number}],
        public media: Media = new Media(0,''),
        ) {

    }
}
