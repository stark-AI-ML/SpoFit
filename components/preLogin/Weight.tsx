import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PreLoginContext from './preLoginContext/preLoginContext';



export default function Weight({ navigation }) {

    const { progressValue, setProgressValue } = useContext(PreLoginContext);
    const { finalWeight, setFinalWeight } = useContext(PreLoginContext);
    const [weight, setweight] = useState("");
    const [unit, setUnit] = useState("kg");

    const handleInputChange = (text) => {
        if (parseInt(weight) >= 60)
            return;
        setweight(text);
    }

    const handleSelctionPress = (current) => {
        setUnit(current);
    }

    const handleContinue = () => {

        if (unit === "kg")
            setFinalWeight(weight);
        else {
            let inKg = parseFloat(weight) / 2.2;
            setFinalWeight(inKg.toString());
        }
        if (weight.length < 2) {
            Alert.alert("enter Valid Weight");
            return;
        }
        navigation.navigate('TraningGoals')
    }

    return (
        <SafeAreaView style={styles.container}>



            <View style={styles.nameQTextContainer}>
                <Text style={styles.nameQ}>What's is Your weight?</Text>
            </View>

            <View style={styles.inputContainer}>
                {
                    unit === "kg" ? (
                        <TextInput
                            style={[styles.namesInput, { textAlign: 'center' }]}
                            placeholder='0'
                            placeholderTextColor={'lightgray'}
                            value={weight}
                            onChangeText={(text) => { handleInputChange(text) }}
                            keyboardType="number-pad"
                        />
                    ) : (
                        <View style={styles.unitlbs}>
                            <TextInput
                                style={[styles.namesInputlbs, { textAlign: 'center' }]}
                                placeholder='0'
                                placeholderTextColor={'lightgray'}
                                value={weight}
                                onChangeText={(text) => { handleInputChange(text) }}
                                keyboardType="number-pad"
                            />
                        </View>
                    )
                }

                <View style={styles.kglbsContainer}>
                    <TouchableOpacity
                        style={[styles.kglbsButton, unit === "kg" ? { backgroundColor: 'white' } : { backgroundColor: 'lightgray' }]}
                        onPress={() => { handleSelctionPress("kg") }}
                    >
                        <Text>kg </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.kglbsButton, unit === "lbs" ? { backgroundColor: 'white' } : { backgroundColor: 'lightgray' }]}
                        onPress={() => { handleSelctionPress("lbs") }}
                    >
                        <Text>lbs.</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.continue}>
                <TouchableOpacity style={styles.continueButton} onPress={() => { handleContinue() }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>Continue</Text>
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
        fontWeight: '600',
    },
    namesInputlbs: {
        height: 150,
        width: 100,
        fontSize: 50,
        color: 'black',
        fontWeight: '600',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unitlbs: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    unitLabel: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 10,
    },
    nameQTextContainer: {
        marginTop: '30%',
        alignSelf: 'flex-start',
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameQ: {

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
    },
    kglbsContainer: {
        flexDirection: 'row',
        height: 35,
        width: 180,
        backgroundColor: 'lightgray',
        borderRadius: 19,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    kglbsButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 34.9,
        width: 90,
        borderRadius: 19,
        marginVertical: 4,
    },
});

