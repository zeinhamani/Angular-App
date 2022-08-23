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
        public tel: number,
        public reservations: [{id: number}],
        public habitats: [{id: number}],
        public notifications: [{content:string}],
        public media: Media
        ) {

    }
}
