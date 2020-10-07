import React, {Component} from 'react';
import {firebase} from '../../config'
import { View, Text } from 'react-native';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.getUser()
    this.subcriber = firebase.firestore().collection('customers').doc('rerIymvXfcl5xNQFh5B1').onSnapshot(
        doc => {
            this.setState({
                user: {
                    name : doc.data().nama
                }
            })
        }
    )
    this.state = {
        user : {
            name : ''
        }
    };
  }

  getUser = async () => {
    const custDocument = await firebase.firestore()
      .collection('customers')
      .doc('rerIymvXfcl5xNQFh5B1')
      .get();
      console.log(custDocument.data())
  };

  render() {
    return <View>
        <Text>Name: {this.state.user.name}</Text>
    </View>
  }
}

export default Home;

