import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {firebase, SQLiteContext} from '../../config';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { setDataOrders, setDataCabang, setDataUser } from '../../actions';
import { setLogin } from '../../actions/setLogin';

class RegisterOld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        username: '',
        alamat: '',
        photo: '',
      },
    };
  }

  userNowSQLite = (dataNow) => {
    const data = [];
    this.props.sqlite.runQuery(`update user set username=${dataNow.username}, alamat=${dataNow.alamat}, photo=${dataNow.photo}`,  [])
    .then(this.props.sqlite.runQuery(`select * from user`,  []))
    .then(([results]) => {
      for (let i = 0; i < 100; i++) {
        if (results.rows.item(i) !== undefined) {
          data.push(results.rows.item(i));
        }
      }
      this.props.setDataUSer(data);
    });
  };
  addDataFirebase = (data) => {
    firestore()
      .collection('customers')
      .doc(`${data.email}`)
      .set({
        email: data.email,
        name: data.username,
        alamat: data.alamat,
        photo: data.photo,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  createUser = (user) => {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(this.addDataFirebase(user))
      .then(this.userNowSQLite(user))
      .then(() => {
        this.setState({
          user: {
            username: user.username,
          },
        });
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  handleTextEmail = (text) => {
    const {password, username, alamat, photo} = this.state.user;
    this.setState({
      user: {
        email: text,
        password,
        username,
        alamat,
        photo,
      },
    });
  };

  handleTextPassword = (text) => {
    const {email, password, username, alamat, photo} = this.state.user;
    this.setState({
      user: {
        email,
        password: text,
        username,
        alamat,
        photo,
      },
    });
  };

  handleTextUsername = (text) => {
    const {email, password, username, alamat, photo} = this.state.user;
    this.setState({
      user: {
        email,
        password,
        username: text,
        alamat,
        photo,
      },
    });
  };

  handleTextAlamat = (text) => {
    const {email, password, username, alamat, photo} = this.state.user;
    this.setState({
      user: {
        email,
        password,
        username,
        alamat: text,
        photo,
      },
    });
  };

  handleTextPhoto = (text) => {
    const {email, password, username, alamat, photo} = this.state.user;
    this.setState({
      user: {
        email,
        password,
        username,
        alamat,
        photo: text,
      },
    });
  };

  render() {
    return (
      <Container>
        <Content>
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
                valuet={this.state.user.password}
                onChangeText={(text) => this.handleTextPassword(text)}></Input>
            </Item>
            <Item floatingLabel>
              <Label>Alamat</Label>
              <Input
                valuet={this.state.user.alamat}
                onChangeText={(text) => this.handleTextAlamat(text)}></Input>
            </Item>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                valuet={this.state.user.username}
                onChangeText={(text) => this.handleTextUsername(text)}></Input>
            </Item>
            <Item floatingLabel>
              <Label>Photo URL</Label>
              <Input
                valuet={this.state.user.photo}
                onChangeText={(text) => this.handleTextPhoto(text)}></Input>
            </Item>
            <Text>HI {this.state.user.username}</Text>
            <Button onPress={() => this.createUser(this.state.user)}>
              <Text>REGISTER</Text>
            </Button>
          </Form>
        </Content>
      </Container>
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

class Register extends Component {
  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => <RegisterOld {...this.props} sqlite={sqlite} />}
      </SQLiteContext.Consumer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
