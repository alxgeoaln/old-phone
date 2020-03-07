

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  PanResponder,
  Animated,
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
    const num = number === 0 ? 0 : (10 - number);
    const x = (360 - angle) + 45;
    const value = ((x / 360) * 100) / 100;

    Animated.timing(this.state.pan, {
      toValue: value,
      duration: 500
    }).start(() => Animated.timing(this.state.pan, {
      toValue: 0,
      duration: 100
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
