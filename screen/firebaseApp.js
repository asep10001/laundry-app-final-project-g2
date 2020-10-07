import React, {Component} from 'react';
import firestore from '@react-native-firebase/firestore';

export class firebaseApp extends Component {
  constructor(props) {
    super(props);
    this.getUser()
    this.state = {};
  }

  getUser = async () => {
    const custDocument = await firestore()
      .collection('customers')
      .doc('rerIymvXfcl5xNQFh5B1')
      .get();
      console.log(custDocument)
  };

  render() {
    return <div></div>;
  }
}

export default firebaseApp;
