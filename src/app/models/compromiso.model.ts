export class Compromiso {
    constructor(
        public prioridad: number,
        public fecha: string,
        public responsable: string,
        public compromiso: string,
        public usuario: string,
        public archivo: string,
        public id_status: number,
        public id_pendiente: number,
        public id_compromiso?: number
    ) {
    }
}
