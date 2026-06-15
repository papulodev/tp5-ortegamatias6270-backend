import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Publicacion = sequelize.define('Publicacion', {
  titulo: DataTypes.STRING,
  contenido: DataTypes.TEXT,
  imagen_asociada: DataTypes.TEXT,
  fecha_publicacion: DataTypes.STRING,
  empleado_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Empleado',
      key: 'id'
    }
  },
  vigente: DataTypes.BOOLEAN
}, {
  timestamps: false,
  freezeTableName: true
});

export default Publicacion;
