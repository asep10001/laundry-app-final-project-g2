import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';

export class SplashScreen03 extends Component {
  render() {
    return (
      <>
        <View>
          <Text>03</Text>
        </View>
        <Button onPress={() => this.props.setIsReady()}>
          <Text>Continue</Text>
        </Button>
        <Button onPress={() => this.props.setIsReady()}>
          <Text>Back</Text>
        </Button>
      </>
    );
  }
}

export default SplashScreen03;
