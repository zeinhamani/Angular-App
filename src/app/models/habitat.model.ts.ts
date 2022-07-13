import { User } from './user.model.ts';
import { Media } from './media.model.ts';
import { Equipement } from './equipement.model.ts';
import { Destination } from './destination.model.ts';
import { Categorie } from './categorie.model.ts';
import { ServiceHabitat } from './service-habitat.model.ts';
export class Habitat {
    constructor(public id: number , 
                public titre: string,
                public presentation: string,
                public adresse: string,
                public prix: number,
                public superficie: number,
                public capaciteAccueil: number,
                public dateOuvertureDu: string ,
                public dateOuvertureAu: string,
                public fermetureExp: string,
                public heureArriveeDu: string,
                public heureArriveeAu: string,
                public heureDepartDu: string,
                public heureDepartAu: string,
                public categorie: Categorie,
                public user: User,
                public destination: Destination,
                public services: ServiceHabitat[]=[],
                public equipements: Equipement[]=[],
                public medias: Media[],
                ){

    }
}

