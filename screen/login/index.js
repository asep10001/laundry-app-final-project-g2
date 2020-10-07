import React, {Component} from 'react';
import {connect} from 'react-redux';
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
} from 'native-base';
import {SQLiteContext} from '../../config';
import firestore from '@react-native-firebase/firestore';

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

  componentDidMount() {}
  subcriber = async (collection, document) => {
    const custDocument = await firestore()
      .collection(collection)
      .doc(document)
      .get();
    // console.log('user now ' + custDocument.data());

    this.setState({
      userNow: custDocument.data(),
    });
    this.userNowSQLite(custDocument.data());
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
    this.cabangNowSQLite(data);
  };

  cabangNowSQLite = async (dataNow) => {
    // console.log('datanow ' + JSON.stringify(dataNow));
    const data = [];
    for (let i = 0; i < dataNow.length; i++) {
      this.props.sqlite.runQuery(
        ' insert into branch values (?, ?, ?, ?)',
        [
          i + 1,
          dataNow[i].alamat,
          dataNow[i].branch,
          dataNow[i].photo,
        ],
        [],
      ).then(()=>console.info('successfully inserting data cabang'))
      .catch(err => {
        this.props.sqlite.runQuery(
            `update branch set id='${i+1}', alamat='${dataNow[i].alamat}', branch='${dataNow[i].branch}', photo='${dataNow[i].photo}' where id='${i+1}'`,
            [],
          )
      })
      console.log(i);
      continue;
    }
    this.props.sqlite.runQuery(`select * from branch`, []).then(([results]) => {
      console.log(results.rows.item(0));
      for (let i = 0; i < 100; i++) {
        if (results.rows.item(i) !== undefined) {
          data.push(results.rows.item(i));
        }
      }
      alert(JSON.stringify(data));
      this.props.setDataCabang(data);
    });
  };

  userNowSQLite = async (dataNow) => {
    // console.log('datanow ' + JSON.stringify(dataNow));
    const data = [];
    await this.props.sqlite.runQuery(
      `update user set username='${dataNow.name}', alamat='${dataNow.alamat}', photo='${dataNow.photo}' where id='1'`,
      [],
    );
    this.cabangSubcriber('branch', dataNow.alamat);
    this.props.sqlite.runQuery(`select * from user`, []).then(([results]) => {
      console.log(results.rows.item(0));
      for (let i = 0; i < 100; i++) {
        if (results.rows.item(i) !== undefined) {
          data.push(results.rows.item(i));
        }
      }
      this.props.setDataUSer(data);
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

  signIn = (data) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.subcriber('customers', data.email);
      })
      .then(() => {
        this.props.setStatusLogin();
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
              <Button
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
            </Item>
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
