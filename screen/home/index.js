import React, {Component} from 'react';
import {ImageBackground, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {View, Text, Button} from 'native-base';

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
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/bg-sign-in.jpg')}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(87,206,159, 0, 0.5)',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'rgba(87,206,159,0.5)',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{width: 300, height: 300}}></Image>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
              }}>

              <Text style={{color: '#fbfffe', fontSize: 25}}>
                YO-NYUCI
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: -150
              }}>
              <Text style={{color: '#fbfffe', fontSize: 16}}>
                We Pick Up , Wash and Deliver
              </Text>
              <Text style={{color: '#fbfffe', fontSize: 16}}>Your Laundry</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  style={{
                    width: 200,
                    backgroundColor: '#09b97c',
                    justifyContent: 'center',
                    borderRadius: 25,
                    marginVertical: 10,
                  }}
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={{color: '#eaf8f3'}}> REGISTER</Text>
                </Button>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  style={{
                    width: 200,
                    backgroundColor: '#09b97c',
                    justifyContent: 'center',
                    borderRadius: 25,
                    marginVertical: 10,
                  }}
                  onPress={() => this.props.navigation.navigate('Log In')}>
                  <Text
                    style={{
                      color: '#eaf8f3',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    SIGN IN
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Home;
