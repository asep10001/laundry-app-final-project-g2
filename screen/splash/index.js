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
            2000
          )
        );
      }
    
    render() { 
        return (
            <Animatable.View style={styles.view}>
                <Animatable.Image 
                    animation="bounceIn"
                    duration={1500}
                    iterationDelay={500}
                    source={require('../../assets/images/logo.png')}
                    resizeMode={'stretch'}
                    style={styles.logo}   
                />

                <Animatable.Text 
                    animation="fadeIn"
                    duration
                    style={styles.text}>
                    Clean Laundry
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
        backgroundColor:'teal',
        alignItems: 'center',
        justifyContent: 'center',
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