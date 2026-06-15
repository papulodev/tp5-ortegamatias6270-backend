import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Socio = sequelize.define('Socio', {
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  foto: DataTypes.STRING,
  dni: { type: DataTypes.STRING, unique: true },
  numero_socio: DataTypes.INTEGER,
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Socio;
