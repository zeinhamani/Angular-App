import { Media } from './media.model.ts';
export class ReservationList {
    constructor(
        public id: number,
        public DateReservation: string,
        public Annulee : boolean,
        public user : {id: number, nom: string,media: Media},
        public habitat: {id: number,titre: string, medias: Media},
        ) {

    }
}