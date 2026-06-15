import Socio from '../models/Socio.js';

export const create = async (req, res, next) => {
  try {
    const socio = await Socio.create(req.body);
    res.status(201).json(socio);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const socios = await Socio.findAll();
    res.json(socios);
  } catch (err) {
    next(err);
  }
};

export const getActivos = async (req, res, next) => {
  try {
    const socios = await Socio.findAll({ where: { activo: true } });
    res.json(socios);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) {
      return res.status(404).json({ error: 'Socio no encontrado' });
    }
    res.json(socio);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) {
      return res.status(404).json({ error: 'Socio no encontrado' });
    }
    await socio.update(req.body);
    res.json(socio);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) {
      return res.status(404).json({ error: 'Socio no encontrado' });
    }
    await socio.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
