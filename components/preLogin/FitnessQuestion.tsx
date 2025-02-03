import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image, ScrollView, FlatList } from 'react-native';
import PreLoginContext from './preLoginContext/preLoginContext';

import Svg, { Path } from 'react-native-svg';


export default function FitnesQ({ navigation }) {
    const { progressValue, setProgressValue } = useContext(PreLoginContext);

    const { isFit, setFit } = useContext(PreLoginContext);

    const dataAll = [
        {
            id: 'veryFit',
            Fitness: "I'm very Fit",
        },
        {
            id: 'MedFit',
            Fitness: "I'm Fit",
        },
        {
            id: 'notFit',
            Fitness: "I'm  not very Fit",
        },
    ];

    function toNavigate() {
        setProgressValue(progressValue + 10);
        navigation.navigate('SporstPref')
    }
    const handleSelection = (id) => {
        setFit(id);
        setProgressValue(75);
        toNavigate()

    };

    return (
        <SafeAreaView style={styles.safeArea}>


            <Text style={{ fontSize: 23, marginLeft: "5%", marginTop: '8%', fontWeight: 'bold' }}>How Fit You're</Text>
            <View style={styles.container}>
                <FlatList
                    data={dataAll}
                    renderItem={({ item }) => {
                        // we can 
                        const isSelected = item.id === isFit;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.listDataContainer,
                                    isSelected ? styles.selectedItem : null,
                                ]}
                                onPress={() => handleSelection(item.id)}
                            >
                                <Text style={styles.FitnessText}>{item.Fitness}</Text>
                                <View style={styles.imageContainer}>
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

    listDataContainer: {
        height: 80,
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
    FitnessText: {
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
        marginRight: 10,
    },
});

