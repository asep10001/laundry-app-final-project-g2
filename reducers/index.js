import AuthReducer from './login';
import DataUser from './user';
import Cabang from './cabang';
import Orders from './orders';
import ReadyReducer from './isReady';
const allReducers = {
  auth: AuthReducer,
  userData: DataUser,
  cabang: Cabang,
  orders: Orders,
  ready: ReadyReducer,
};

export default allReducers;
