import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PreLoginContext from './preLoginContext/preLoginContext';

export default function Height({ navigation }) {

    const { progressValue, setProgressValue } = useContext(PreLoginContext);

    const { finalHeight, setFinalHeight } = useContext(PreLoginContext);

    const [height, setHeight] = useState("");
    const [heightFT, setHeightFt] = useState("");
    const [heightIn, setHeightIN] = useState("");

    const [unit, setUnit] = useState("cm");

    const handleInputChange = (text, type) => {
        if (type === "cm") {

            if (parseInt(text) > 190) return

            setHeight(text);
        }
        else if (type === "ft") {
            if (parseInt(text) > 10)
                return;
            setHeightFt(text);
        } else if (type === "in") {
            if (parseInt(text) > 100)
                return;
            setHeightIN(text);
        }


    }
    const handleSelctionPress = (current) => {
        setUnit(current);
    }
    const handleContinue = () => {
        setProgressValue(progressValue + 10);

        let inM = 0;
        if (heightFT === "") {
            setFinalHeight(height);
            console.log(finalHeight);


        }
        else {
            let totalStr = `${heightFT}.${heightIn}`;
            inM = (parseFloat(totalStr) * 30.48) / 100;
            setFinalHeight(inM.toString());
        }
        if (finalHeight.length <= 2) {
            Alert.alert("height Must Required");
            return
        }

        navigation.navigate('Weight');


    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.nameQTextContainer}>
                <Text style={styles.nameQ}>What's is Your Height?</Text>
            </View>

            <View style={styles.inputContainer}>
                {
                    unit === "cm" ? (
                        <TextInput
                            style={[styles.namesInput, { textAlign: 'center' }]}
                            placeholder='0'
                            placeholderTextColor={'lightgray'}
                            value={height}
                            onChangeText={(text) => { handleInputChange(text, "cm") }}
                            keyboardType="number-pad"
                        />
                    ) : (
                        <View style={styles.unitFT}>
                            <TextInput
                                style={[styles.namesInputft, { textAlign: 'center' }]}
                                placeholder='0'
                                placeholderTextColor={'lightgray'}
                                value={heightFT}
                                onChangeText={(text) => { handleInputChange(text, "ft") }}
                                keyboardType="numeric"
                            />
                            <Text style={styles.unitLabel}>Ft.</Text>

                            <TextInput
                                style={[styles.namesInputft, { textAlign: 'center' }]}
                                placeholder='0'
                                placeholderTextColor={'lightgray'}
                                value={heightIn}
                                onChangeText={(text) => { handleInputChange(text, "in") }}
                                keyboardType="number-pad"
                            />
                            <Text style={styles.unitLabel}>In</Text>
                        </View>
                    )
                }

                <View style={styles.cmFtContainer}>
                    <TouchableOpacity
                        style={[styles.cmFtButton, unit === "cm" ? { backgroundColor: 'white' } : { backgroundColor: 'lightgray' }]}
                        onPress={() => { handleSelctionPress("cm") }}
                    >
                        <Text>cm </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.cmFtButton, unit === "ft" ? { backgroundColor: 'white' } : { backgroundColor: 'lightgray' }]}
                        onPress={() => { handleSelctionPress("ft") }}
                    >
                        <Text>ft.</Text>
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

    namesInput: {
        height: 150,
        width: 300,
        fontSize: 50,
        color: 'black',
        fontWeight: '600',
    },
    namesInputft: {
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
    unitFT: {
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
    },
    cmFtContainer: {
        flexDirection: 'row',
        height: 35,
        width: 180,
        backgroundColor: 'lightgray',
        borderRadius: 19,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cmFtButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 34.9,
        width: 90,
        borderRadius: 19,
        marginVertical: 4,
    },
});

