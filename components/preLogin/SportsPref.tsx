import React, { useContext, useState } from 'react';
import { SafeAreaView, View, ScrollView, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg'; // Assuming you have react-native-svg installed
import PreLoginContext from './preLoginContext/preLoginContext'; // Assuming you have this context set up

const sportsData = [
    {
        "id": "1",
        "sportsTypeName": "Track and Field",
        "sports": [
            { "id": "a1", "isMarked": false, "sportsName": "Running", "img": "https://progressivesoccertraining.com/wp-content/uploads/2021/01/how-to-run-faster.jpg" },
            { "id": "a2", "isMarked": false, "sportsName": "Long Jump", "img": "https://images.unsplash.com/photo-1532274402865-ea6220b6e321?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "a3", "isMarked": false, "sportsName": "Shot Put", "img": "https://images.unsplash.com/photo-1503342020046-d3d3ca3a329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "a4", "isMarked": false, "sportsName": "High Jump", "img": "https://images.unsplash.com/photo-1504753793632-869f30f30b72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "a5", "isMarked": false, "sportsName": "Javelin Throw", "img": "https://images.unsplash.com/photo-1532374913748-5097a949a7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" }
        ]
    },
    {
        "id": "2",
        "sportsTypeName": "Team Sports",
        "sports": [
            { "id": "b1", "isMarked": false, "sportsName": "Soccer", "img": "https://images.unsplash.com/photo-1514546369613-1a85712c74c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "b2", "isMarked": false, "sportsName": "Basketball", "img": "https://images.unsplash.com/photo-1585829175005-37c2d150c7ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "b3", "isMarked": false, "sportsName": "Baseball", "img": "https://images.unsplash.com/photo-1518706894529-416beb2b676f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" }
        ]
    },
    {
        "id": "3",
        "sportsTypeName": "Individual Sports",
        "sports": [
            { "id": "c1", "isMarked": false, "sportsName": "Tennis", "img": "https://images.unsplash.com/photo-1526802013061-040a67733c4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80.jpg" },
            { "id": "c2", "isMarked": false, "sportsName": "Badminton", "img": "https://images.unsplash.com/photo-1503342020046-d3d3ca3a329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "c3", "isMarked": false, "sportsName": "Boxing", "img": "https://images.unsplash.com/photo-1503342020046-d3d3ca3a329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "c4", "isMarked": false, "sportsName": "Javelin Throw", "img": "https://images.unsplash.com/photo-1532374913748-5097a949a7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" }
        ]
    },
    {
        "id": "4",
        "sportsTypeName": "Combat Sports",
        "sports": [
            { "id": "d1", "isMarked": false, "sportsName": "Karate", "img": "https://images.unsplash.com/photo-1503342020046-d3d3ca3a329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "d2", "isMarked": false, "sportsName": "Judo", "img": "https://images.unsplash.com/photo-1503342020046-d3d3ca3a329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
            { "id": "d3", "isMarked": false, "sportsName": "Taekwondo", "img": "https://images.unsplash.com/photo-1503342020046-d3d3ca3a329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" },
        ]
    }]


    

const SportsSelection = ({ navigation}) => {



    const { setSelectedSportsContext } = useContext(PreLoginContext);
    const [selectedSports, setSelectedSports] = useState([]);



    const handleSelectionPress = (sport) => {
        let updatedSelection;
        if (selectedSports.includes(sport)) {
            updatedSelection = selectedSports.filter(selectedSport => selectedSport !== sport);
        } else if (selectedSports.length < 3) {
            updatedSelection = [...selectedSports, sport];
        } else {
            return;
        }
        setSelectedSports(updatedSelection);
    }

    const isSportSelected = (sport) => selectedSports.includes(sport);

    const saveSelectedSports = () => {
        setSelectedSportsContext(selectedSports);
        console.log('Selected sports saved to context:', selectedSports);
        navigation.navigate('SignUp');

    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text style={styles.heading}>
                        Select Your Sports
                    </Text>
                    <FlatList
                        data={sportsData}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.category}>
                                    {item.sportsTypeName}
                                </Text>
                                <FlatList
                                    data={item.sports}
                                    horizontal={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => handleSelectionPress(item.sportsName)}
                                            style={[
                                                styles.sportsTypeContainer,
                                                isSportSelected(item.sportsName) && styles.selectedContainer
                                            ]}
                                        >
                                            <Image style={styles.image} source={{ uri: item.img }} />
                                            <Text
                                                style={[
                                                    styles.sportName,
                                                    isSportSelected(item.sportsName) && styles.selectedText
                                                ]}
                                            >
                                                {item.sportsName}
                                            </Text>
                                            {isSportSelected(item.sportsName) && (
                                                <Svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    style={styles.markedSvg}
                                                >
                                                    <Path
                                                        d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-2-11.59l-2.29-2.3-1.42 1.42L10 12.41l7.29-7.29-1.42-1.42L10 10.41z"
                                                        fill="white"
                                                    />
                                                </Svg>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity onPress={saveSelectedSports} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save Selection</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// don't forget to handle onPress even for each sports focus are ..........:) 

const styles = StyleSheet.create({
    heading: {
        fontSize: 23,
        marginLeft: '5%',
        marginTop: '8%',
        fontWeight: 'bold'
    },
    category: {
        fontSize: 19,
        marginLeft: '5%',
        marginTop: '5%',
        fontWeight: 'bold'
    },
    sportsTypeContainer: {
        height: 250,
        width: 150,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    selectedContainer: {
        backgroundColor: 'dodgerblue'
    },
    image: {
        height: 150,
        width: 100,
        resizeMode: 'cover'
    },
    sportName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    selectedText: {
        color: 'white'
    },
    markedSvg: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    saveButton: {
        backgroundColor: 'dodgerblue',
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SportsSelection;
