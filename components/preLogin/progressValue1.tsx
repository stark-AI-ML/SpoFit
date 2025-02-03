import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import PreLoginContext from './preLoginContext/preLoginContext';
import { useNavigation } from '@react-navigation/native';

const ProgressValue = () => {
    const { progressValue } = useContext(PreLoginContext);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Circle cx="12" cy="12" r="11.5" stroke="#D3D3D3" />
                    <Path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            </TouchableOpacity>


            <View style={styles.progressContainer}>
                <View style={styles.progress}>
                    <View style={[styles.progressBar, { width: `${progressValue}%` }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginTop: 19,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        margin: 10,
    },
    backButton: {

        padding: 10,
        alignSelf: 'center'

    },
    progressContainer: {
        flex: 1,
        alignItems: 'center',
    },
    progress: {
        height: 10,
        width: '50%',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});

export default ProgressValue;
