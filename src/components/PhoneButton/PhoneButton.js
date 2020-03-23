import React from 'react';
import PropTypes from 'prop-types';
import {
    Circle,
    Image
} from 'react-native-svg';


const PhoneButton = ({ring}) => (
    <>
        <Circle onPress={ring} stroke='#2D2D44' strokeWidth={5} cx={50} cy={50} r={35} fill='#FFAF20' />
        <Image
            onPress={ring}
            width="45px"
            height="45px"
            x={28} y={28}
            href={require('../../../assets/call.png')} />
    </>
)

PhoneButton.propTypes = {
    ring: PropTypes.func.isRequired
}

export default PhoneButton;