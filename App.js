import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import NavBar from './navbar';
import Splash from './screen/splash';
import allReducers from './reducers';
import { SQLite3 } from './config/index';
import { SQLiteContext } from './config/index';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, allReducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

const InitialNavigator = createSwitchNavigator({
  Splash: Splash,
  App: NavBar
});

const AppContainer = createAppContainer(InitialNavigator)

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SQLiteContext.Provider value={new SQLite3()}>
        <AppContainer />
        </SQLiteContext.Provider>
      </PersistGate>
    </Provider>
    )
  }
}

export default App

