export class Alimento {
    constructor(
        public nombre: string,
        public proteinas: string,
        public carbohidratos: string,
        public grasas: string,
        public clasificacion_id: string,
        public id?: number
    ) {
    }
}
