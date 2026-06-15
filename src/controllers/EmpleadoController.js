import Empleado from '../models/Empleado.js';

export const create = async (req, res, next) => {
  try {
    const empleado = await Empleado.create(req.body);
    res.status(201).json(empleado);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (err) {
    next(err);
  }
};
