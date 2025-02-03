import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PreLoginContext from './preLoginContext/preLoginContext';


export default function GenderSelection(props) {

    const { progressValue, setProgressValue } = useContext(PreLoginContext);

    const { gender, setGender } = useContext(PreLoginContext);

    // i will update the contex progress value each time


    const handlePress = (proValue, gender) => {
        // setProgressVal(proValue);
        setProgressValue(10);
        setGender(gender) //nameTab
        props.navigation.navigate('nameTab', { progressVal: proValue }, { gender: gender });
    };

    return (
        <SafeAreaView >

            {/* <View style={[
                { borderWidth: 1, borderColor: 'black', }, styles.progress]
            }>
                <View style={[
                    { width: `${progressValue}%` }
                ]}>

                </View>
            </View> */}

            <View style={styles.container}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Welcome to Spofit</Text>
                    <Text style={[styles.headerText, styles.genderQuestionText]}>What's your gender?</Text>
                </View>

                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageWrapper}
                        onPress={() => {
                            handlePress(25, "male");
                        }}
                    >
                        <Image style={styles.humanImage} source={require('../preLogin/images/male.png')} />
                        <Text style={styles.imageText}>Male </Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageWrapper}
                        onPress={() => {
                            handlePress(25, "female");
                        }}
                    >
                        <Image style={styles.humanImage} source={require('../preLogin/images/female.png')} />
                        <Text style={styles.imageText}>Female </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '19%',
    },
    headerTextContainer: {
        alignItems: 'center',
        margin: 19,

    },

    headerText: {
        fontSize: 37,
        fontWeight: 'bold',
    },
    genderQuestionText: {
        color: 'grey',
        fontSize: 30,
        marginTop: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '10%',
    },
    imageWrapper: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    humanImage: {
        height: 300,
        width: 150,
    },
    imageText: {
        fontSize: 19,
        marginTop: 10,
    },
});