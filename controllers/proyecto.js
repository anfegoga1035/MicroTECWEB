const Proyecto = require('../models/proyecto');
const { request, response } = require('express');

const TipoProyecto = require('../models/tipoProyecto');
const Cliente = require('../models/cliente');
const Etapa = require('../models/etapa');
const Universidad = require('../models/universidad');

// Crear proyecto
const createProyecto = async (req = request, res = response) => {
    try {
        const data = req.body;

        // Verificar si el tipo de proyecto existe
        const tipoProyectoDB = await TipoProyecto.findById(data.tipoProyecto);
        if (!tipoProyectoDB) {
            return res.status(400).json({ msg: 'Tipo de proyecto inválido' });
        }

        // Verificar si el cliente existe
        const clienteDB = await Cliente.findById(data.cliente);
        if (!clienteDB) {
            return res.status(400).json({ msg: 'Cliente inválido' });
        }

        // Verificar si la etapa existe
        const etapaDB = await Etapa.findById(data.etapa);
        if (!etapaDB) {
            return res.status(400).json({ msg: 'Etapa inválida' });
        }

        // Verificar si la universidad existe
        const universidadDB = await Universidad.findById(data.universidad);
        if (!universidadDB) {
            return res.status(400).json({ msg: 'Universidad inválida' });
        }

        const proyecto = new Proyecto(data);
        await proyecto.save();

        return res.status(201).json(proyecto);
    } catch (e) {
        return res.status(500).json({ msg: 'Error general ' + e });
    }
};

// Obtener todos los proyectos


const getProyectos = async (req = request, res = response) => {
    console.log('Petición a getProyectos...');
    try {
        const proyectosDB = await Proyecto.find()
            .populate({
                path: 'tipoProyecto',
                select: 'nombre'
            })
            .populate({
                path: 'cliente',
                select: 'nombre'
            })
            .populate({
                path: 'etapa',
                select: 'nombre'
            })
            .populate({
                path: 'universidad',
                select: 'nombre'
            });
        return res.json(proyectosDB);
    } catch (e) {
        return res.status(500).json({ msg: 'Error general ' + e });
    }
};
// Actualizar proyecto por ID
const updateProyectoByID = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();
        const proyecto = await Proyecto.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json(proyecto);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msj: 'Error' });
    }
};

module.exports = { 
    createProyecto, 
    getProyectos, 
    updateProyectoByID 
};
