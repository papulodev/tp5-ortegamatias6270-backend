import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Transaccion = sequelize.define('Transaccion', {
  idioma_origen: DataTypes.STRING,
  TextoOrigen: DataTypes.STRING,
  idioma_destino: DataTypes.STRING,
  texto_destino: DataTypes.STRING,
  email_cliente: DataTypes.STRING
}, {
  timestamps: false,
  freezeTableName: true
});

export default Transaccion;
