import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import firestore from '../../firebaseConfig';
import PreLoginContext from './preLoginContext/preLoginContext';
import FireBaseContext from '../MainApp/FireBaseContextMake/fireBaseContext';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoadData = ({ onLoaded }) => {
    const [progress, setProgress] = useState(0);

    const { name, finalHeight, finalWeight, gender, isFoodSelected, selectedGoal, isFit, selectedSportsContext } = useContext(PreLoginContext);
    const auth = getAuth();

    const data = {
        "Name": name,
        "Height": finalHeight,
        "Weight": finalWeight,
        "gender": gender,
        "sportsLikes": selectedSportsContext,
        "foodPrefrence": isFoodSelected,
        "fintnessLevel": isFit,
        "fitnessGoal": selectedGoal,
        "LogIn": true
    };

    const sendData = async () => {
        onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    await firestore.collection('Profile').doc(user.uid).set(data);
                }
            } catch (error) {
                console.error('Error writing document: ', error);
            }
        });
    };

    const navigation = useNavigation();

    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            sendData().then(() => {
                onLoaded();
                // navigation.navigate('SportsHome');
            });
        }
    }, [progress]);

    const radius = 50;
    const strokeWidth = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressContainer}>
                <Svg height="140" width="140" viewBox="0 0 140 140">
                    <Circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="#e0e0e0"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="#0000FF"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </Svg>
                <Text style={styles.progressText}>{progress}%</Text>
            </View>
            <Text style={styles.loadText}>Loading Data...</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        position: 'absolute',
        fontSize: 24,
        fontWeight: 'bold',
    },
    loadText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#0000FF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default LoadData;
