export class Usuario {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public tipo: number,
        public password_confirmation?: string,
        public id?: number
    ) {
    }
}
