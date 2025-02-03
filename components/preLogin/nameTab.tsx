import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PreLoginContext from './preLoginContext/preLoginContext';


export default function NameTab({ navigation }) {

    const { progressValue, setProgressValue } = useContext(PreLoginContext);


    // const { Finalname, setFinalName } = useContext(PreLoginContext);
    const { name, setName } = useContext(PreLoginContext);

    const handleContinuePress = () => {
        setProgressValue(progressValue + 10);
        if (name.length < 4) {
            Alert.alert("atleast 4 char required");
            return;
        }
        navigation.navigate('foodPrefrence');
    }

    const handleInputChange = (text) => {
        setName(text);
    }


    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.nameQTextContainer}>
                <Text style={styles.nameQ}>What is your Name? </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.namesInput} placeholder='Enter Name ' placeholderTextColor={'lightgray'}
                    value={name} onChangeText={(text) => { handleInputChange(text) }}
                ></TextInput>
            </View>
            <View style={styles.continue}>
                <TouchableOpacity style={styles.continueButton}
                    onPress={() => { handleContinuePress() }}

                >
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', }}>Continue  </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    progress: {
        height: 10,
        marginTop: '10%',
        margin: 10,
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#6439FF',
        borderRadius: 10,
    },
    namesInput: {
        height: 150,
        width: 300,
        fontSize: 50,
        color: 'black',
        fontWeight: 'condensedBold',

    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameQTextContainer: {
        marginTop: '30%',
        alignSelf: 'flex-start',
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',

    },
    nameQ: {
        marginLeft: 10,
        fontSize: 28,
        fontWeight: '500',
    },
    continue: {
        alignSelf: 'center',
        marginBottom: 19,
    },
    continueButton: {
        height: 35,
        width: 210,
        color: 'white',
        backgroundColor: '#4F75FF',
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    }

});