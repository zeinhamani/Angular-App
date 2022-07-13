import { Media } from './media.model.ts';
import { User } from './user.model.ts';
import { Habitat } from "./habitat.model.ts";

export class Reservation {
    constructor(
        public id: number,
        public DateArrivee: string, 
        public DateDepart: string, 
        public NombrePersonnes: number,
        public MontantTotal: number,
        public DateReservation: string,
        public Annulee : boolean,
        public user : {id: number},
        public habitat: {id: number,titre: string, medias: Media},
        ) {

    }
}
