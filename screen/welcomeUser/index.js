import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {setDataUser, setDataCabang, setDataOrders} from '../../actions';
import {setLogin} from '../../actions/setLogin';
import {Text, View, Button} from 'native-base';

class WelcomeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAction: 1,
    };

    const component1 = () => <Text>My Order</Text>;
    const component2 = () => <Text>Orders</Text>;
    const buttons = [{element: component1}, {element: component2}];
  }
  componentDidMount() {
    // alert(this.props.dataUser[0])
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/profile-bg.jpg')}
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(87,206,159, 0, 0.5)',
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(87,206,159,0.5)'}}>
          <View style={{flex: 1, marginHorizontal: 30}}>
            <View style={{flex: 1}}>
              <Image
                style={{
                    flex: 1,
                  width: 100,
                  height: 100,
                  borderRadius: 200,
                  marginTop: 30,
                }}
                source={{
                  uri: this.props.dataUser[0].photo,
                }}></Image>
            </View>

            <View
              style={{ flex: 1,
                marginVertical: 20,
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>
                Hello, {this.props.dataUser[0].username}
              </Text>
            </View>

            <View
              style={{
                  flex: 1,
                marginRight: 100,
              }}>
              <Text
                style={{fontSize: 30, fontWeight: 'normal', color: 'white'}}>
                Please select your prefered actions!
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Button onPress={()=>this.props.navigation.navigate('Pesanan Saya')} style={{width: 150, justifyContent:'center', alignItems:'center', backgroundColor: '#03b876', borderBottomLeftRadius: 20}}>
                  <Text>My Order</Text>
                </Button>
              </View>
              <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Button onPress={()=>this.props.navigation.navigate('Orders')} style={{width: 150, justifyContent:'center', alignItems:'center', backgroundColor: '#03b876', borderTopRightRadius: 20}}>
                  <Text>Orders</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
  dataUser: state.userData.dataUser,
});

const mapDispatchToProps = (dispatch) => ({
  setStatusLogin: () => dispatch(setLogin()),
  setDataUSer: (payload) => dispatch(setDataUser(payload)),
  setDataCabang: (payload) => dispatch(setDataCabang(payload)),
  setDataOrders: (payload) => dispatch(setDataOrders(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeUser);
