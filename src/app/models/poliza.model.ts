export class Poliza {
    constructor(
        public aseguradora: string,
        public precio: number,
        public fecha_inicio: string,
        public fecha_vigencia: string,
        public clienteId: string,
        public tipoId: number,
        public estatusId: number,
        public agenteId: number,
        public id?: number
    ) {
    }
}