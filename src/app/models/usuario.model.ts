export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public password_confirmation?: string,
        public id?: number
    ) {
    }
}
