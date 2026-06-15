import Socio from './Socio.js';
import Transaccion from './Transaccion.js';
import Empleado from './Empleado.js';
import Publicacion from './Publicacion.js';

// Associations
Empleado.hasMany(Publicacion, { foreignKey: 'empleado_id' });
Publicacion.belongsTo(Empleado, { foreignKey: 'empleado_id' });

export { Socio, Transaccion, Empleado, Publicacion };
