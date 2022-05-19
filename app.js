const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const { Tarea } = require('./models/tarea');
const Tareas = require('./models/tareas');
require('colors')


const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {  // cargar las tareas

        tareas.cargarTarasFromArray(tareasDB);
    }

    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': // completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                break;
            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;

        }


        guardarDB(tareas.listadoArr);

        await pausa();


    } while (opt !== '0');

    //pausa();
}


main();



