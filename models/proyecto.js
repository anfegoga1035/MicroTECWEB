const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'Número requerido'],
        unique: true
    },
    titulo: {
        type: String,
        unique: true
    },
    fechaIniciacion: {
        type: Date,
        required: [true, 'Fecha de iniciación requerida']
    },
    fechaEntrega: {
        type: Date,
        required: [true, 'Fecha de entrega requerida']
    },
    valor: {
        type: Number,
        required: [true, 'Valor requerido']
    },
    tipoProyecto : {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    etapa: {
        type: Schema.Types.ObjectId,
        ref: 'Etapa',
        required: true
    },
    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Proyecto', ProyectoSchema);
