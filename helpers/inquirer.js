const inquirer = require('inquirer');
const { validate } = require('uuid');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tareas`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]

    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('=========================='.green);
    console.log('Seleccione una opción'.white);
    console.log('==========================\n'.green);


    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}
// Menú 6 de borrado 
// Crear arreglo
const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    // Salir del menú borrar presionando 0
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    // Manda a llamar el Prompt del menú con choices ( opciones a seleccionar )
    const { id } = await inquirer.prompt(preguntas);
    return id;
}


const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            // se añade la propiedad check
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        { // CHECKBOX va a regresar un arreglo con todos los IDS seleccionados
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    // Manda a llamar el Prompt del menú con choices ( opciones a seleccionar )
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}