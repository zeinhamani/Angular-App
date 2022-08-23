import { Media } from './media.model.ts';
export class ReservationList {
    constructor(
        public id: number,
        public DateReservation: string,
        public Annulee : boolean,
        public user : {id: number, nom: string,media: {url: string}},
        public habitat: {id: number,titre: string, medias: [{url: string}],user:{id:number}},
        ) {

    }
}