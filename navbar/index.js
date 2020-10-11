import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  Button,
  Alert,
  RefreshControl,
  Animated,
} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import SQLite from 'react-native-sqlite-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {
  setLogin,
  setDataUser,
  setDataCabang,
  setDataOrders,
  setReady,
} from '../actions';
import {
  Home,
  Register,
  Login,
  Orders,
  ServiceOptions,
  OtherOptions,
  StatusOrder,
  SplashScreen01,
  SplashScreen02,
  SplashScreen03,
  SplashScreen04,
  WelcomeUser,
} from '../screen';
import {SQLiteContext} from '../config';
import {Container, Content, Grid, Col, Thumbnail, Row} from 'native-base';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Container
        style={{
          height: 'auto',
        }}>
        <Content
          style={{
            backgroundColor: '#00CE9F',
          }}>
          <Grid>
            <Col
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%',
              }}>
              <Thumbnail
                large
                source={{
                  uri: props.data.photo,
                }}
              />
            </Col>
            <Col
              style={{
                backgroundColor: '#00CE9F',
                width: '50%',
              }}></Col>
          </Grid>
          <Content
            style={{
              backgroundColor: '#00CE9F',
              paddingHorizontal: '8%',
            }}>
            <Row>
              <Text
                style={{
                  color: '#ffff',
                  fontWeight: 'bold',
                }}>
                {props.data.name.toUpperCase()}
              </Text>
            </Row>
            <Row>
              <Text
                style={{
                  color: '#ffff',
                }}>
                {props.data.alamat}
              </Text>
            </Row>
          </Content>
        </Content>
      </Container>
      <DrawerItemList {...props} />
      <Button
        title="LOG OUT"
        onPress={() => {
          props.setUserLogin();
        }}></Button>
    </DrawerContentScrollView>
  );
};

export class NavBarOld extends Component {
  constructor(props) {
    super(props);
    this.fecthingUserSQL();
    this.fecthingCabangSQL();
    this.fecthingOrdersSQL();
    this.state = {
      isReady: false,
      isLoggedIn: this.props.statusLogin,
      userData: [],
      servicesCost: 0,
      orders: {
        branch: 'kemang',
        cost: '10000',
        duration: 3,
        item_weigh: 1,
        services: 'setrika',
      },
      totalHarga: 0,
    };
  }

  getHarga = () => {
    const data = this.props.dataOrder;
    let totalHarga = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === 'pending') {
        totalHarga += parseInt(data[i].cost);
      }
    }
    this.setState({
      totalHarga: totalHarga,
    });
  };

  fecthingUserSQL = async () => {
    const data = [];
    await this.props.sqlite
      .runQuery('SELECT * FROM user', [])
      .then(([results]) => {
        for (let i = 0; i < 10; i++) {
          // console.log(results.rows.item(1) !== undefined)
          if (results.rows.item(i) !== undefined) {
            data.push(results.rows.item(i));
          }
        }
        this.props.setDataUSer(data);
        // console.log(`data user`  + data);
      });

    return data;
  };

  fecthingCabangSQL = () => {
    const data = [];
    this.props.sqlite
      .runQuery(
        'SELECT branch.id, branch.branch, branch.photo FROM branch JOIN user ON branch.alamat = user.alamat',
        [],
      )
      .then(([results]) => {
        for (let i = 0; i < 100; i++) {
          if (results.rows.item(i) !== undefined) {
            data.push(results.rows.item(i));
          }
        }
        this.props.setDataCabang(data);
      })
      .then(
        this.setState({
          userData: data,
        }),
      )
      .catch((err) => console.log('tidak bisa fetching sql', err.message));
  };

  fecthingOrdersSQL = () => {
    let data = [];
    this.props.sqlite
      .runQuery(
        `select * from orders where email='${this.props.dataUser[0].email}'`,
        [],
      )
      .then(([results]) => {
        for (let i = 0; i < 100; i++) {
          if (results.rows.item(i) !== undefined) {
            data.push(results.rows.item(i));
          }
        }
        this.props.setDataOrders(data);
      })
      .catch((err) => console.log('tidak bisa fetching sql', err.message));
  };

  fetchingData = async () => {
    try {
      await this.fecthingUserSQL();
    } catch (err) {
      err.message;
    }
    try {
      await this.fecthingCabangSQL();
    } catch (err) {
      err.message;
    }
  };

  componentDidMount() {
    this.fecthingUserSQL();
    this.fecthingCabangSQL();
  }

  userLoggedin = () => {
    return (
      <>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              data={{
                photo: this.props.dataUser[0].photo,
                name: this.props.dataUser[0].username,
                alamat: this.props.dataUser[0].alamat,

                // name: 'Asep Agus Heri Hermawan',
                // alamat: 'jakarta selatan',
                // photo:
                //   'https://cdn3.iconfinder.com/data/icons/avatar-color/64/52-512.png',
              }}
              setUserLogin={this.props.setStatusLogin}
            />
          )}
          drawerStyle={{
            backgroundColor: '#c6cbef',
            width: 240,
          }}
          hideStatusBar="true"
          drawerType="back">
          <Drawer.Screen name="Home">
            {(props) => <WelcomeUser {...props} />}
          </Drawer.Screen>
          <Drawer.Screen name="Orders">
            {(props) => (
              <Orders
                {...props}
                orderServices={this.state.orders.services}
                orderItemWeigh={this.state.orders.item_weigh}
                orderDuration={this.state.orders.duration}
                orderCost={this.state.orders.cost}
                orderBranch={this.state.orders.branch}
                servicesCost={this.state.servicesCost}
                setOrdersServices={this.setOrdersServices}
                setOrdersBranch={this.setOrdersBranch}
                setOrdersCost={this.setOrdersCost}
                setOrdersItemWeigh={this.setOrdersItemWeigh}
                setOrdersDuration={this.setOrdersDuration}
                setServicesCost={this.setServicesCost}
                getHarga={this.getHarga}
                totalHarga={this.state.totalHarga}
              />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="Pesanan Saya">
            {(props) => (
              <StatusOrder
                {...props}
                getHarga={this.getHarga}
                totalHarga={this.state.totalHarga}
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </>
    );
  };

  userLoggedout = () => {
    return (
      <Stack.Navigator headerMode="false">
        <Stack.Screen name="Home">
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Log In" component={Login} />
      </Stack.Navigator>
    );
  };

  spalshScreen = () => {
    return (
      <Stack.Navigator
        navigationOption={{
          swipeEnabled: true,
        }}
        headerMode="false">
        <Stack.Screen name="01" component={SplashScreen01} />
        <Stack.Screen name="02" component={SplashScreen02} />
        <Stack.Screen name="03" component={SplashScreen03} />
        <Stack.Screen name="04">
          {(props) => (
            <SplashScreen04 {...props} setIsReady={this.setIsReady} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };
  setIsReady = () => {
    this.setState({
      isReady: !this.state.isReady,
    });
  };
  setOrdersBranch = (data) => {
    const {cost, duration, item_weigh, services} = this.state.orders;
    this.setState({
      orders: {
        branch: data,
        cost,
        duration,
        item_weigh,
        services,
      },
    });
  };

  setServicesCost = (data) => {
    this.setState({
      servicesCost: data,
    });
  };

  setOrdersServices = (data) => {
    const {branch, cost, duration, item_weigh} = this.state.orders;
    this.setState({
      orders: {
        branch,
        cost,
        duration,
        item_weigh,
        services: data,
      },
    });
  };

  setOrdersDuration = (data) => {
    const {branch, cost, item_weigh, services} = this.state.orders;
    this.setState({
      orders: {
        branch,
        cost,
        duration: data,
        item_weigh,
        services,
      },
    });
  };

  setOrdersCost = (data) => {
    const {branch, duration, item_weigh, services} = this.state.orders;
    this.setState({
      orders: {
        branch,
        cost: data,
        duration,
        item_weigh,
        services,
      },
    });
  };

  setOrdersItemWeigh = (data) => {
    const {branch, cost, duration, services} = this.state.orders;
    this.setState({
      orders: {
        branch,
        cost,
        duration,
        item_weigh: data,
        services,
      },
    });
  };

  showScreen = () => {
    if (this.props.isReady === false && this.props.statusLogin === false) {
      return (
        alert(this.props.isReady === false && this.props.statusLogin === false),
        this.spalshScreen()
      );
    } else if (
      this.props.isReady === true &&
      this.props.statusLogin === false
    ) {
      return this.userLoggedout();
    } else {
      return this.userLoggedin();
    }
  };
  render() {
    return (
      <NavigationContainer>
        {/* {this.props.isReady === false
          ? this.spalshScreen()
          : this.state.isLoggedIn === false
          ? this.userLoggedout()
          : this.userLoggedin()} */}
        {this.showScreen()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
  dataUser: state.userData.dataUser,
  isReady: state.ready.isReady,
  dataOrder: state.orders.orders,
});

const mapDispatchToProps = (dispatch) => ({
  setStatusLogin: () => dispatch(setLogin()),
  setDataUSer: (payload) => dispatch(setDataUser(payload)),
  setDataCabang: (payload) => dispatch(setDataCabang(payload)),
  setDataOrders: (payload) => dispatch(setDataOrders(payload)),
  setIsReady: () => dispatch(setReady()),
});

class NavBar extends Component {
  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => <NavBarOld {...this.props} sqlite={sqlite} />}
      </SQLiteContext.Consumer>
    );
  }
}
connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
