import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PreLoginContext from './preLoginContext/preLoginContext';


/*
    ave tune ek v props pass nahi kiye hai contextProvider sea toh kuch  Update nahi hai
    sirf Progress Tracker ke alawa smjha chutiyea
*/

export default function FoodPreference({ route, navigation }) {

    const { progressValue, setProgressValue } = useContext(PreLoginContext);
    const { isFoodSelected, setFoodSelected } = useContext(PreLoginContext);


    const handleSelectionPress = (val) => {
        setProgressValue(progressValue + 10);
        if (isFoodSelected != val)
            setFoodSelected(val);
        else setFoodSelected("");
    }


    const handleContinuePress = () => {
        setProgressValue(45);
        navigation.navigate('Height');
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>
                <View>
                    <Text style={styles.headerTextContainer}>
                        Select Your Food Preference
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => { handleSelectionPress("veg") }}>
                        <Image style={[styles.prefImage, isFoodSelected === "veg" ? { borderWidth: 3, borderColor: 'green', } : { borderWidth: 1.5, borderColor: 'blue', opacity: 0.3 }]} source={require('./images/veg.jpg')} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { handleSelectionPress("nonVeg") }}>
                        <Image style={[styles.prefImage, isFoodSelected === "nonVeg" ? { borderWidth: 3, borderColor: 'green' } : { borderWidth: 1.5, borderColor: 'blue', opacity: 0.3 }]} source={require('./images/nonVeg.jpg')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.continue}>
                    <TouchableOpacity style={styles.continueButton}
                        onPress={() => { handleContinuePress() }}

                    >
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', }}>Continue  </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    headerTextContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '10%',
    },
    prefImage: {
        height: 200,
        width: 200,
        marginHorizontal: 10,
        borderRadius: 10,
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