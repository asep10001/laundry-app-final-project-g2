import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setLogin} from '../../actions';
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
} from 'native-base';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
    };
  }

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

  signIn = (data) => {
    auth()
      .signInWithEmailAndPassword(
        data.email,
        data.password,
      )
      .then(() => {
        this.props.setStatusLogin()
        console.log('User signed in!');
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
                value={this.state.user.password}
                onChangeText={(text) => this.handleTextPassword(text)}></Input>
            </Item>
            <Item>
              <Button title="LOGIN" onPress={()=>{
                  this.signIn({email: this.state.user.email, password: this.state.user.password})                  
                  }}>
                <Text>Log In</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
});

const mapDispatchToProps = (dispatch) => ({
  setStatusLogin: () => dispatch(setLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
