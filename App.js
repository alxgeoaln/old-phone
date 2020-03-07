

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  PanResponder,
  Animated,
  Text as text
} from 'react-native';

import Svg, {
  Circle,
  Text,
  Image,
  G
} from 'react-native-svg';


const screen_width = Dimensions.get('window').width;
const halfScreen = screen_width / 2 + 100;
const radius = halfScreen / 2;

function xyrad(cx, cy, angle, r) {
  const rad = angle * (Math.PI / 180);

  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  return { rad, x, y };
}

const renderLines = (numberOfLines, onPress) => {
  const lines = new Array(numberOfLines).fill(0);
  let linesSize = lines.length;
  let angle = 90;

  return lines.map((line, i) => {
    const { x, y } = xyrad(50, 50, angle, 38);
    angle += 30;

    return (

        <G
          onPress={onPress(i, angle - 30)}
        >
          <Circle key={i} r="7" fill="#2D2D44" cx={x} cy={y} />
          <Text fontWeight="bold" fill="#FFAF20" fontSize="10" textAnchor="middle" x={x} y={y + 3.5}>{i === 0 ? 0 : linesSize -= 1}</Text>
        </G>

    );
  });

};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.Value(0),
      nums: []
    };

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (a, {dx, dy}) => {
          this.state.pan.setValue(-dx);

      },
      onPanResponderRelease: () => {
        Animated.spring(
          this.state.pan, // Auto-multiplexed
          { toValue: 0}, // Back to zero
        ).start();
      },
    });

    this.rotate = this.state.pan.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
  }

  rotatePhone = (number, angle) => () => {
    console.log('mffffAngle', angle);
    const num = number === 0 ? 0 : (10 - number);
    const x = (360 - angle) + 45;
    const value = ((x/360) * 100) / 100;

     Animated.timing(this.state.pan, {
      toValue: value,
      duration: 5000
    }).start(() =>  Animated.timing(this.state.pan, {
      toValue: 0,
      duration: 100
    }).start());

    this.setState({nums: [...this.state.nums, num]}, () => console.log('state', this.state.nums));
  }


  render() {
    // Tint coords
    const { x, y } = xyrad(50, 50, 45, 38);

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Animated.View
            {...this.state.panResponder.panHandlers}
            style={{
              width: screen_width - 15,
              height: screen_width - 15,
              borderRadius: screen_width - 15 / 2,
              backgroundColor: "#1E1E2C",
              transform: [{rotate: this.rotate}]
            }}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
              {renderLines(10, this.rotatePhone)}
            </Svg>
          </Animated.View>
          <Svg style={{position: 'absolute'}} height="100%" width="100%" viewBox="0 0 100 100">
          <Image
              href={require('./assets/tint.png')}
              width="10px"
              height="10px" x={x} y={y} />
          </Svg>
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
