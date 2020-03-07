import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    svgContainer(rotate, screen_width) {
      return {
        width: screen_width - 15,
        height: screen_width - 15,
        borderRadius: screen_width - 15 / 2,
        backgroundColor: "#1E1E2C",
        transform: [{ rotate }]
      }
    },
  });

  export default styles;