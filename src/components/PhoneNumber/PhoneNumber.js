import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './phoneNumber.style';

const PhoneNumber = ({phoneNumber}) => (
    <>
        <Text style={styles.phoneNumberStyle}>{phoneNumber}</Text>
    </>
);

PhoneNumber.propTypes = {
    phoneNumber: PropTypes.string.isRequired
}

export default PhoneNumber;