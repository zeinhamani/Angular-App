import { User } from './user.model.ts';
import { Reservation } from './reservation.model.ts';
export class Commentaire {
    constructor(
        public id: number,
        public Contenu: string,
        public DateCommentaire: string,
        public Evaluation: number, 
        public reservation:  {
            id: number,
            user: {
                id: number,
                media: {
                    url: string
                }
            },
            habitat: {
                id:number
            }
        },
        ) {

    }
}

