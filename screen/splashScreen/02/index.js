import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';

export class SplashScreen02 extends Component {
  render() {
    return (
      <>
        <View>
          <Text>02</Text>
        </View>
        <Button onPress={() => this.props.navigation.push('03')}>
          <Text>Continue</Text>
        </Button>
        <Button onPress={() => this.props.navigation.goBack()}>
          <Text>Back</Text>
        </Button>
      </>
    );
  }
}

export default SplashScreen02;
