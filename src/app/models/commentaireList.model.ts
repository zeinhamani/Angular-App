export class Commentaire {
    constructor(
        public id: number,
        public Contenu: string,
        public DateCommentaire: string,
        public Evaluation: number, 
        public reservation: {
            id: number,
            user: {
                url: string
            },
            habitat: {
                id:number
            }
         },
        ) {

    }
}