import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '../../config';
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

class Register extends Component {
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

  addDataFirebase = (data) => {
    firestore()
      .collection('customers')
      .doc(`${data.username}`)
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

export default Register;
