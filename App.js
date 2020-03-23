

import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  PanResponder,
  Animated,
  Linking
} from 'react-native';

import Phone from './src/components/Phone';
import PhoneNumber from './src/components/PhoneNumber';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ''
    };

    this.pan = new Animated.Value(0.01);

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (a, { dx, dy }) => {
        this.pan.setValue(-dx);

      },
      onPanResponderRelease: () => {
        Animated.spring(
          this.pan, // Auto-multiplexed
          { toValue: 0.01 }, // Back to zero
        ).start();
      },
    });

    this.rotate = this.pan.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    this.opacity = new Animated.Value(0.01);

    this.opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.phoneNumber.length > 0) {
      Animated.spring(
        this.opacity,
        {
          toValue: 1,
          friction: 1,
        }
      ).start();
    };

    return true;
  }

  eraseNumber = () => {
    this.setState({ phoneNumber: '' });
    Animated.spring(
      this.opacity,
      {
        friction:2,
        toValue: 0
      }
    ).start()
    
  }

  rotatePhone = (number, angle) => () => {

    // calculate value
    const num = number === 0 ? 0 : (10 - number);
    const x = (360 - angle) + 45;
    const value = x / 360;

    // calculate duration
    const duration = num === 0 ? 1500 : 500 + (100 * num);

    Animated.timing(this.pan, {
      toValue: value,
      duration,
    }).start(() => Animated.timing(this.pan, {
      duration: 100,
      toValue: 0.01,
    }).start());

    this.setState({ phoneNumber: this.state.phoneNumber + num });
  }

  ring = () => {
    Linking.openURL(`tel:${this.state.phoneNumber}`);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Phone
            eraseNumber={this.eraseNumber}
            panResponder={this.state.panResponder}
            rotatePhone={this.rotatePhone}
            rotate={this.rotate}
            ring={this.ring}
            buttonOpacity={this.opacity}
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
