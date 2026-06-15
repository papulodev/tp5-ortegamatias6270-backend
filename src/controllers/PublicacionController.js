import { Op } from 'sequelize';
import Publicacion from '../models/Publicacion.js';
import Empleado from '../models/Empleado.js';

export const create = async (req, res, next) => {
  try {
    const { empleado, ...data } = req.body;

    if (!empleado || !empleado.id) {
      return res.status(400).json({ error: 'empleado.id es requerido' });
    }

    const empleadoExists = await Empleado.findByPk(empleado.id);
    if (!empleadoExists) {
      return res.status(400).json({ error: 'Empleado no encontrado' });
    }

    const publicacion = await Publicacion.create({
      ...data,
      empleado_id: empleado.id
    });

    res.status(201).json(publicacion);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const publicaciones = await Publicacion.findAll({ include: Empleado });
    res.json(publicaciones);
  } catch (err) {
    next(err);
  }
};

export const buscar = async (req, res, next) => {
  try {
    const { titulo, vigente } = req.query;

    if (!titulo && vigente === undefined) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un parámetro de búsqueda: titulo o vigente' });
    }

    const where = {};

    if (titulo) {
      where.titulo = { [Op.like]: `%${titulo}%` };
    }

    if (vigente !== undefined) {
      where.vigente = vigente === 'true';
    }

    const publicaciones = await Publicacion.findAll({ where, include: Empleado });
    res.json(publicaciones);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    await publicacion.update(req.body);
    res.json(publicacion);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    await publicacion.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
