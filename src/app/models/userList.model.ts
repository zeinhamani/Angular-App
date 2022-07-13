import { Media } from './media.model.ts';
export class UserList {
    constructor(
        public id: number,
        public roles: string[],
        public email: string ,
        public nom: string ,
        public media: Media
        ) {

    }
}