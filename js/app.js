const ingresos = [
    new Ingreso("Sueldo", 2200),
    new Ingreso("Venta choce", 6000),
];

const egresos = [
    new Egreso("Renta", 500),
    new Egreso("Comida", 1000)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalIngresos()/totalIngresos();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", {style:"currency", currency:"USD", minimunFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {style:"percent", minimunFractionDigits:2});
}

const cargarIngresos = () => {
    let ingresosHTML = "";
    for(let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);

    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <iconify-icon icon="ion:close-outline"
                    onclick="eliminarIngreso(${ingreso.id})"></iconify-icon>                            
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

eliminarIngreso = (id) => {
    let eliminarIndice= ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(eliminarIndice, 1);
    cargarCabecero();
    cargarIngresos();
}

cargarEgresos = () => {
    let egresosHTML = "";
    for(let egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

crearEgresosHTML = (egreso) => {
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor)/totalEgresos()}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <iconify-icon icon="ion:close-outline"
                    onclick="eliminarEgreso(${egreso.id})"></iconify-icon>                            
                </button>
            </div>
        </div>
    </div>
    `;
    return egresosHTML;
}

eliminarEgreso = (id) => {
    let eliminarIndice= egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(eliminarIndice, 1);
    cargarCabecero();
    cargarEgresos();
}

agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if(descripcion.value !== "" && valor.value !== '') {
        if(tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value ==="egreso") {
            egresos.push(new Egreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarEgresos();
        }
    }
}