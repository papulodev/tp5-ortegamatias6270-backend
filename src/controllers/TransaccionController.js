import Transaccion from '../models/Transaccion.js';

export const create = async (req, res, next) => {
  try {
    const transaccion = await Transaccion.create(req.body);
    res.status(201).json(transaccion);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (err) {
    next(err);
  }
};

export const getByEmail = async (req, res, next) => {
  try {
    const transacciones = await Transaccion.findAll({
      where: { email_cliente: req.params.email }
    });
    res.json(transacciones);
  } catch (err) {
    next(err);
  }
};

export const getByIdiomas = async (req, res, next) => {
  try {
    const transacciones = await Transaccion.findAll({
      where: {
        idioma_origen: req.params.origen,
        idioma_destino: req.params.destino
      }
    });
    res.json(transacciones);
  } catch (err) {
    next(err);
  }
};
