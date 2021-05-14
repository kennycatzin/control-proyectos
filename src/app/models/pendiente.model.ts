export class Pendiente {
    constructor(
        public num_compromisos: number,
        public fecha: string,
        public solicitante: string,
        public prioridad: number,
        public pendiente: string,
        public tipo_pendiente: number,
        public descripcion: string,
        public titulo: string,
        public usuario: string,
        public archivo?: File,
        public id_solicitante?: number,
        public id_clasificacion?: number,
        public id_status?: number,
        public id_pendiente?: number
    ) {
    }
}
