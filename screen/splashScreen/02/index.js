import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';
import {ImageBackground , Image} from 'react-native';

export class SplashScreen02 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={
            require('../../../assets/images/bgsplash02.jpg')
          }
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(87,206,159, 0, 0.5)',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(87,206,159,0.5)',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/baju.png')}
                style={{width: 230, height: 200}}></Image>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',

              }}>
              <Text style={{color: '#fbfffe', fontSize: 25}}>
               Dress Up Next Day
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',

              }}>
              <Text style={{color: '#fbfffe', fontSize: 16}}>
                We Bring Your Clothes Back
              </Text>
              <Text style={{color: '#fbfffe', fontSize: 16}}>
                In The Very Next Day
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
              style={{
                width: '100%',
                justifyContent: 'center',
                backgroundColor: '#eaf8f3',
              }}
              onPress={() => this.props.navigation.push('03')}>
              <Text style={{color: '#09b97c'}}> Continue</Text>
            </Button>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
              style={{
                width: '100%',
                justifyContent: 'center',
                backgroundColor: '#09b97c',
              }}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{color: '#eaf8f3'}}>Back</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default SplashScreen02;
