

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';

import Phone from './src/components/Phone';
import PhoneNumber from './src/components/PhoneNumber';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.Value(0),
      phoneNumber: ''
    };

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (a, { dx, dy }) => {
        this.state.pan.setValue(-dx);

      },
      onPanResponderRelease: () => {
        Animated.spring(
          this.state.pan, // Auto-multiplexed
          { toValue: 0 }, // Back to zero
        ).start();
      },
    });

    this.rotate = this.state.pan.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
  }

  rotatePhone = (number, angle) => () => {

    // calculate value
    const num = number === 0 ? 0 : (10 - number);
    const x = (360 - angle) + 45;
    const value = x / 360;

    // calculate duration
    const duration = num === 0 ? 1500 : 500 + (100 * num);

    Animated.timing(this.state.pan, {
      toValue: value, 
      duration
    }).start(() => Animated.timing(this.state.pan, {
      duration:100,
      toValue: 0,
    }).start());

    this.setState({ phoneNumber: this.state.phoneNumber + num });
  }
  
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Phone
            panResponder={this.state.panResponder}
            rotatePhone={this.rotatePhone}
            rotate={this.rotate}
          />
          <PhoneNumber
            phoneNumber={this.state.phoneNumber}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efd2bc',
  }
});

export default App;
