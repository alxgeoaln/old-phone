import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './eraseButton.style';

const EraseButton = ({eraseNumber}) => (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={eraseNumber}>
        <Image style={styles.button} source={require('../../../assets/button.png')} />
    </TouchableOpacity>
);

export default EraseButton;