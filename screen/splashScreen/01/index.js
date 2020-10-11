import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';
import {ImageBackground , Image} from 'react-native';

export class SplashScreen01 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={{
            uri:
              'https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/methode/2020/04/02/12d717d4-723f-11ea-ab8f-988daf8efd6f_image_hires_064640.jpg?itok=uzS6_itr&v=1585781217',
          }}
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
                source={require('../../../assets/images/pickUp/pick-up.png')}
                style={{width: 270, height: 100}}></Image>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',

              }}>
              <Text style={{color: '#fbfffe', fontSize: 25}}>
                Meet Our Pick Up Pilot
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',

              }}>
              <Text style={{color: '#fbfffe', fontSize: 16}}>
                We Collect Your Dirty Clothes
              </Text>
              <Text style={{color: '#fbfffe', fontSize: 16}}>
                From Your Doorsteps
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
              onPress={() => this.props.navigation.push('02')}>
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

export default SplashScreen01;
