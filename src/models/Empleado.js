import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Empleado = sequelize.define('Empleado', {
  apellido: DataTypes.STRING,
  nombre: DataTypes.STRING,
  dni: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

export default Empleado;
