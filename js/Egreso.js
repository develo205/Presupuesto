class Egreso extends Dato {
    static contadorIngresos = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = ++Egreso.contadorIngresos;
    }
    get id() {
        return this._id;
    }
}