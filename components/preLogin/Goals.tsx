import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import PreLoginContext from './preLoginContext/preLoginContext';
import { FlatList } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

import weightImg from './images/weigh.jpg';
import gainWeightImg from './images/gainWeigh.jpg';

export default function TraningGoals({ navigation }) {
    const { progressValue, setProgressValue } = useContext(PreLoginContext);

    const { selectedGoal, setSelectedGoal } = useContext(PreLoginContext);

    const dataAll = [
        {
            id: 'looseWeight',
            goal: 'Loose Weight',
            img: weightImg,
        },
        {
            id: 'gainMuscles',
            goal: 'Gain Muscles',
            img: gainWeightImg,
        },
    ];

    const handleSelection = (id) => {
        setSelectedGoal(id);
        setProgressValue(progressValue + 10);
        navigation.navigate('FitnessQ')
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={dataAll}
                    renderItem={({ item }) => {
                        const isSelected = item.id === selectedGoal;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.listDataContainer,
                                    isSelected && styles.selectedItem,
                                ]}
                                onPress={() => handleSelection(item.id)}
                            >
                                <Text style={styles.goalText}>{item.goal}</Text>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={item.img}
                                        style={styles.img}
                                    />
                                    {isSelected && (
                                        <Svg
                                            height="24"
                                            width="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            style={styles.checkmark}
                                        >
                                            <Path
                                                d="M20 6L9 17L4 12"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </Svg>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    img: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    listDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        justifyContent: 'space-between',
    },
    selectedItem: {
        backgroundColor: '#4F75FF',
    },
    goalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    imageContainer: {
        position: 'relative',
    },
    checkmark: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#4F75FF',
        borderRadius: 12,
        padding: 2,
    },
});


