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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
    };
  }

  createUser = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.setState({
          user: {
            email: data.email,
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
            <Text>HI {this.state.user.email}</Text>
            <Button
              onPress={() =>
                this.createUser({
                  email: this.state.user.email,
                  password: this.state.user.password,
                })
              }>
              <Text>REGISTER</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Register;
