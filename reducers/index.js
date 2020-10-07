import AuthReducer from './login';
import DataUser from './user';
import Cabang from './cabang';
import Orders from './orders';
const allReducers = {auth: AuthReducer, userData: DataUser, cabang: Cabang, orders: Orders};

export default allReducers;
