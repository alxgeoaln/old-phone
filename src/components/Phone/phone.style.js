import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  svgContainer(rotate, screen_width) {
    return {
      width: screen_width - 15,
      height: screen_width - 15,
      borderRadius: screen_width - 15 / 2,
      backgroundColor: "#1E1E2C",
      transform: [{ rotate }],
    }
  },
  eraseButtonContainer(value) {
    return {
      transform: [{ scaleY: value }],
      top: 100,
      position: 'absolute',
      width: '100%',
      paddingHorizontal: 30,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  phoneButton(value) {
    return {
      position: 'absolute',
      height: 150,
      width: 150,
      transform: [{ scale: value }]
    }
  },
  aboslute: { position: 'absolute' }
});

export default styles;