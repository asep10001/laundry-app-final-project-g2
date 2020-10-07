import Register from './register';
import ServiceOptions from './orders/serviceOptions';
import StatusOrder from './status';



const {default: Home} = require('./home');
const {default: Login} = require('./login');
const {default: Orders} = require('./orders');

export {Home, Login, Orders, Register, StatusOrder, ServiceOptions};
