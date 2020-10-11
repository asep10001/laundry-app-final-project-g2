import React, { Component } from 'react';

import { 
    View, 
    Text, 
    Dimensions,
    StyleSheet 
} from 'react-native';
import * as Animatable from 'react-native-animatable';

class Splash extends Component {
    constructor(props) {
        super(props)
        this.state={}
    }

    
    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data!==null) {
            this.props.navigation.navigate('App')
        }
    }

    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { resolve('result') },
            5000
          )
        );
      }
    
    render() { 
        return (
            <Animatable.View style={styles.view}>
                <Animatable.Image 
                    animation="bounceIn"
                    duration={3000}
                    iterationDelay={500}
                    source={require('../../assets/images/logos.png')}
                    resizeMode={'stretch'}
                    style={styles.logo}   
                />

                <Animatable.Text 
                    animation="flipInX"
                    duration={3000}
                    style={styles.text}>
                    YO-NYUCI
                </Animatable.Text>

                <Animatable.Text 
                    animation="slideInRight"
                    duration={1500}
                    style={styles.text1}>
                    Final Project Team 01
                </Animatable.Text>
                <Animatable.Text 
                    animation="slideInRight"
                    duration={1500}
                    style={styles.text2}>
                    G2|Academy
                </Animatable.Text>
            </Animatable.View>
        );
    }
}

const {height} = Dimensions.get('screen');
const logo_height = height * 0.5 * 0.5

const styles = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor:'#03b876',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold', 
    },
    text2: {
        color: '#fcae18',
        fontSize: 18,
        fontWeight: 'bold', 
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold', 
    },
    logo: {
        width: logo_height, 
        height: logo_height,
        alignSelf:'center', 
    }

})
 
export default Splash;