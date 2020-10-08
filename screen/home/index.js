import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.getUser();
    this.subcriber = firestore()
      .collection('customers')
      .doc('cecep@example.com')
      .onSnapshot((doc) => {
        this.setState({
          user: {
            name: doc.data().name,
          },
        });
      });
    this.state = {
      user: {
        name: '',
      },
      orders: {
        branch: 'kemang',
        cost: '10000',
        duration: 3,
        item_weigh: 1,
        services: 'setrika',
      },
    };
  }

  getUser = async () => {
    const custDocument = await firebase
      .firestore()
      .collection('customers')
      .doc('rerIymvXfcl5xNQFh5B1')
      .get();
    console.log(custDocument.data());
  };

  render() {
    return (
      <View>
        <Text>Name: {this.state.user.name}</Text>
      </View>
    );
  }
}

export default Home;
