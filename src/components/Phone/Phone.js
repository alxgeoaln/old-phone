import React from 'react';
import PropTypes from 'prop-types';
import {
    Animated,
} from 'react-native';

import Svg, {
    Circle,
    Text,
    Image,
    G
} from 'react-native-svg';

import { xyrad, screen_width } from './../../utils';
import styles from './phone.style';

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

//   Tint coords
const { x, y } = xyrad(50, 50, 45, 38);

const Phone = ({ rotatePhone, panResponder, rotate }) => (
    <>
        <Animated.View
            {...panResponder.panHandlers}
            style={styles.svgContainer(rotate, screen_width)}>
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
                {renderLines(10, rotatePhone)}
            </Svg>
        </Animated.View>
        <Svg style={{ position: 'absolute' }} height="100%" width="100%" viewBox="0 0 100 100">
            <Image
                href={require('../../../assets/tint.png')}
                width="10px"
                height="10px" x={x} y={y} />
        </Svg>

    </>
);


Phone.propTypes = {
    rotatePhone: PropTypes.func.isRequired,
    panResponder: PropTypes.object.isRequired,
    rotate: PropTypes.object.isRequired
};
export default Phone;