import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setLogin,
  setDataUser,
  setDataCabang,
  setDataOrders,
} from '../../actions';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  View,
} from 'native-base';
import { SQLiteContext } from '../../config';
import firestore from '@react-native-firebase/firestore';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LoginOld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      userNow: {},
      cabangNow: [],
    };
  }

  // componentDidMount() {}
  subcriber = async (collection, document) => {
    await firestore()
      .collection(collection)
      .doc(document)
      .get()
      .then(async (snap) => {
        await this.setState({
          userNow: snap.data(),
        })
      }).catch( error => console.error(error))
    // console.info("this is userNow" + JSON.stringify(this.state.userNow))
  await  this.props.setDataUSer(this.state.userNow)
  // console.log('this is data user' + JSON.stringify(this.props.dataUser))
    await this.cabangSubcriber('branch', this.state.userNow.alamat);
   // this.userNowSQLite(custDocument.data());
  };

  cabangSubcriber = async (collection, document) => {
    const data = [];
    const branchDocument = await firestore()
      .collection(collection)
      .doc(document)
      .get();
    // alert('Branch now ' + JSON.parse(branchDocument.data().kuningan).alamat)
    for (const property in branchDocument.data()) {
      //   alert(property + ' : ' + branchDocument.data()[property]);
      data.push(JSON.parse(branchDocument.data()[property]));
    }
    this.setState({
      cabangNow: data,
    });

    // alert(JSON.stringify(data));
    this.props.setDataCabang(data);
  };
  handleTextEmail = (text) => {
    this.setState({
      user: {
        email: text,
        password: this.state.user.password,
      },
    });
  };

  handleTextPassword = (text) => {
    this.setState({
      user: {
        email: this.state.user.email,
        password: text,
      },
    });
  };

  signIn = async (data) => {
    await auth()
      .signInWithEmailAndPassword(data.email, data.password).then(()=>console.info('user logged in')).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
        // alert ("logged in")
       await this.subcriber('customers', data.email);
        
        // alert("ini dari sign in " + JSON.stringify(this.props.dataUser))
        //  this.props.setStatusLogin();
        // alert(JSON.stringify(this.props.dataUser));


      this.props.setStatusLogin();
  };
  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: '#03b876',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require('../../assets/images/logo.png')}
          />
        </View>
        <Container>
          <Content style={{ marginTop: 50, marginHorizontal: 20 }}>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input
                  value={this.state.user.email}
                  onChangeText={(text) => this.handleTextEmail(text)}></Input>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  value={this.state.user.password}
                  onChangeText={(text) =>
                    this.handleTextPassword(text)
                  }></Input>
              </Item>
            </Form>
            <View style={{
              width: 200, marginTop: 30, alignSelf: 'center'
            }}>
              <Button
                style={{
                  width: 200,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#03b876',
                }}
                title="LOGIN"
                onPress={() => {
                  this.signIn({
                    email: this.state.user.email,
                    password: this.state.user.password,
                  });
                  //   this.cabangSubcriber('branch', 'jakarta selatan');
                }}>
                <Text>Log In</Text>
              </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30 }}>
              <Text>Forgot Password?</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 60 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                <Text>New Here? Sign Up!</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
  dataUser: state.userData.dataUser,
  dataOrder: state.orders.orders,
});

const mapDispatchToProps = (dispatch) => ({
  setStatusLogin: () => dispatch(setLogin()),
  setDataUSer: (payload) => dispatch(setDataUser(payload)),
  setDataCabang: (payload) => dispatch(setDataCabang(payload)),
  setDataOrders: (payload) => dispatch(setDataOrders(payload)),
});

class Login extends Component {
  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => <LoginOld {...this.props} sqlite={sqlite} />}
      </SQLiteContext.Consumer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
