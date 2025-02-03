import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import FireBaseContext from './FireBaseContextMake/fireBaseContext';
import moment from 'moment';
import firestore from '../preLogin/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from '@react-native-firebase/auth';
import PreLoginContext from '../preLogin/preLoginContext/preLoginContext';
import Height from '../preLogin/Height';
const { width } = Dimensions.get('window');

export default function Sports() {
    const { isDarkMode } = useContext(FireBaseContext);


    const { selectedSportsContext, setSelectedSportsContext } = useContext(PreLoginContext);

    const SportsLikesDAta = [
        { "id": "1", "name": "Running", "img": "https://th.bing.com/th/id/R.eba0c7b6b68a681cff1e60888c6899b7?rik=0QZ%2b0bHsqiXL8g&riu=http%3a%2f%2fprogressivesoccertraining.com%2fwp-content%2fuploads%2f2021%2f01%2fhow-to-run-faster.jpg&ehk=0Q9SqAGOwn0pn%2bWq5EhewOcoUxaXA%2biXDi1FbfY71FM%3d&risl=&pid=ImgRaw&r=0" },
        { "id": "2", "name": "kalaripayattu", "img": "https://www.keralatourism.org/images/enchanting_kerala/large/kalaripayattu20150821085515_559_1.jpg" },
        { "id": "3", "name": "Kabbaddi", "img": "https://s4.scoopwhoop.com/anj/Kabaddi/64996047.jpg" }

    ]

    const FocusArea = [
        { "id": '1', "name": "Calves", "img": "https://moyerwellness.com/wp-content/uploads/2023/09/Calves-2.jpg" },
        { "id": '2', "name": "Quads", "img": "https://media.istockphoto.com/id/1125710206/photo/upper-legs-muscles-anatomy.jpg?s=612x612&w=0&k=20&c=FMb01R6kEuUImHCGM4ZOm7NceeedXTyFdK-ptRUmuqI=" },
        { "id": '3', "name": "Flexibility", "img": "https://assets.gqindia.com/photos/5d108f5ceaf24a896054da34/16:9/w_2560%2Cc_limit/Kalaripayattu%2520fitness%2520benefits.jpg.jpg" },
        { "id": '4', "name": "Agility", "img": "https://humankinetics.me/wp-content/uploads/2019/03/Agility_2.jpg" },
        { "id": '5', "name": "Strength", "img": "https://www.verywellfit.com/thmb/tf2Wfi_PrLmyPT8lrv52cMM3RCM=/7016x4683/filters:fill(FFDB5D,1)/making-a-concerted-effort-to-get-fit-498334765-5aa988e5ae9ab80037feb6ac.jpg" },

    ]

    const [profiles, setProfiles] = useState([]);

    const auth = getAuth();

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    console.log(user);
                    const userProfile = await firestore.collection('Profile').doc(user.uid).get();
                } catch (error) {
                    console.error('Error fetching user profile: ', error);
                }
            } else {
                console.log('User not logged in');
            }
        });
        return subscriber;
    }, []);


    const { Users, setUsers } = useContext(FireBaseContext);




    const getusersData = async () => {
        const userProfile = await firestore.collection('Profile').doc(Users).get();
        console.log(userProfile);

        console.log(Users);
    }



    const getWeekDates = () => {
        const startOfWeek = moment().startOf('week');
        const endOfWeek = moment().endOf('week');
        const dates = [];

        for (let day = startOfWeek; day <= endOfWeek; day.add(1, 'day')) {
            dates.push(day.clone());
        }

        return dates;
    };
    const weekDates = getWeekDates();

    const getDATA = () => {
        console.log(profiles);
    };


    const LogOut = () => {

        signOut(auth);
    }



    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
            <ScrollView>
                <View>
                    <TouchableOpacity>
                        <View style={[styles.ActiveDContainer, isDarkMode && styles.darkActiveDContainer]}>
                            <View>
                                <Text style={[styles.title, isDarkMode && styles.darkText]}>Active Days</Text>
                            </View>
                            <View style={styles.weekContainer}>
                                {weekDates.map(date => (
                                    <View
                                        key={date.format('YYYY-MM-DD')}
                                        style={[
                                            styles.dateContainer,
                                            date.isSame(moment(), 'day') && styles.currentDayContainer,
                                            isDarkMode && { backgroundColor: 'gray', borderRadius: 5 }, date.isSame(moment(), 'day') && styles.darkCurrentDayContainer
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.dateText,
                                                date.isSame(moment(), 'day') && styles.currentDayText,
                                                isDarkMode ? styles.darkText : null
                                            ]}
                                        >
                                            {date.format('D ')}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{ margin: 100, width: 100, height: 100, backgroundColor: 'green', }} onPress={() => { getusersData() }}>
                        <Text>
                            pressMe
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { LogOut() }} style={{ margin: 23, height: 50, width: 60, backgroundColor: 'blue' }}>
                        <Text>
                            LogOut
                        </Text>
                    </TouchableOpacity> */}

                </View>

                <View>

                    <FlatList data={SportsLikesDAta}
                        horizontal={true}
                        renderItem=
                        {({ item }) => {
                            return (

                                <View style={styles.SportsCard}>
                                    <TouchableOpacity>
                                        <Image
                                            style={[styles.SportsCardImage]}
                                            source={{ uri: item.img }}
                                        />
                                        <Text style={styles.SportsCardText}>{item.name}          </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        }
                    />
                </View>

                <View style={[styles.FocusAreaContainer, isDarkMode ? { backgroundColor: 'black' } : null]}>
                    <Text style={[styles.FocusAreaText, isDarkMode ? { color: 'white' } : null]}>
                        Focus Areas for Your Sports Preference
                    </Text>

                    <View style={styles.FocusAreaListContainer}>
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            data={FocusArea}
                            renderItem={({ item }) => (
                                <View style={styles.FocusACard}>
                                    <TouchableOpacity>
                                        <Image
                                            style={[styles.FocusACardImage]}
                                            source={{ uri: item.img }}
                                        />
                                        <Text style={styles.FocusACardText}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>



                <View>
                    <FlatList
                        data={profiles}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.profileContainer, isDarkMode && styles.darkProfileContainer]}>
                                <Text style={[styles.profileText, isDarkMode && styles.darkText]}>Name: {item.Name}</Text>
                                <Text style={[styles.profileText, isDarkMode && styles.darkText]}>Height: {item.Height}</Text>
                                <Text style={[styles.profileText, isDarkMode && styles.darkText]}>Weight: {item.Weight}</Text>
                                <Text style={[styles.profileText, isDarkMode && styles.darkText]}>Gender: {item.gender}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: '#000',
    },
    ActiveDContainer: {
        height: 100,
        width: '90%',
        backgroundColor: 'white',
        marginVertical: 19,
        marginHorizontal: 19,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
    },
    darkActiveDContainer: {
        backgroundColor: '#333',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    darkText: {
        color: '#fff',
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dateContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
    },
    currentDayContainer: {
        backgroundColor: '#007bff',
    },
    darkCurrentDayContainer: {
        backgroundColor: '#4F75FF',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    currentDayText: {
        color: '#fff',
    },
    profileContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    darkProfileContainer: {
        borderBottomColor: '#555',
    },
    profileText: {
        fontSize: 16,
        color: '#333',
    },

    SportsCard: {
        height: 250,
        width: 300,
        backgroundColor: 'black',
        marginVertical: 19,
        marginHorizontal: 14,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    SportsCardImage: {
        // height: '100%',
        // width: '100%',
        height: 250,
        width: 300,
        borderRadius: 10,
    },

    SportsCardText: {
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 23,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
    },
    FocusAreaText: {
        fontSize: 19,
        margin: 19,

    },

    FocusAreaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    FocusAreaListContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FocusACard: {
      
    
        backgroundColor: 'black',
        marginVertical: 19,
        borderRadius: 10,
        padding: 10,
        width: width * 0.9,

    },
    FocusACardImage: {
        height: 190,
        width: '100%', // Adjust the width to fit the card
        borderRadius: 10,
    },
    FocusACardText: {
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 10,
        fontSize: 23,
        padding: 5,
    },
    FocusAreaText: {
        fontSize: 19,
        margin: 19,
    },

});
