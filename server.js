const soap = require('soap');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express();

//Middlewares
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.set('views', path.join(__dirname, 'views'))

//Routes
app.use('/', require('./routes/index'))

function calculaEdad(fecha) {
    let hoy = new Date()
    let fechaNacimiento = new Date(fecha)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let calculaMeses = hoy.getMonth() - fechaNacimiento.getMonth()

    if (calculaMeses < 0 || (calculaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad;
}

var service = {
    BMI_Service: {
        BMI_Port: {
            calculateBMI: function (args) {
                const { nombres, correo, fecha_nac } = args

                let saludo = `
                Hola ${nombres}. Bienvenido a Consultas SA
                Tienes ${calculaEdad(fecha_nac)} años
                Tu Correo Electrónico es ${correo}
                Saludos
                Atte. Consultas SA
                `;

                return {
                    saludo: saludo
                };

            }
        }
    }
}
// xml data is extracted from wsdl file created
const xml = require('fs').readFileSync('./bmicalculator.wsdl', 'utf8');

//create an express server and pass it to a soap server
const server = app.listen(3030, function () {
    const host = "127.0.0.1";
    const port = server.address().port;
});

soap.listen(server, '/bmicalculator', service, xml, function () {
    //console.log('server initialized');
    console.log('¡Server UP! en http://localhost:3030');
});