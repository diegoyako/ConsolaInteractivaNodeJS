const { Tarea } = require("./tarea");
require('colors');


class Tareas {

    _listado = {
        'abc': 123
    };


    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTarasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });


    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() { // TAREAS PENDIENTES O COMPLETADAS CON COLOR ROJO O VERDE
        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {


            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                // mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                // mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`);
                }
            }


        });

    }

    //crear la instruccion para recibir un arreglo de ID y hacer el procedimiento para ver si estan completadas o no

    toogleCompletadas(ids = []) {

        ids.forEach(id => {
            // si la tarea estaba completada no quiero modificar la fecha que tenia, si no tenia nada si la quiero grabar.
            // crea tarea que es igual a this._listado y extrae esa propiedad con el [ID];
            const tarea = this._listado[id];
            // pregunto si la tarea estaba previamente completada
            if (!tarea.completadoEn) { // genera fecha
                tarea.completadoEn = new Date().toISOString()
            }

        });
        //  Marcar como NO COMPLETADAS todas las tareas que no vengan en el arreglo de IDS
        this.listadoArr.forEach(tarea => {
            // Si en mi arreglo de Id no existe la tarea.id tengo que limpiarlo
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }
}
module.exports = Tareas;