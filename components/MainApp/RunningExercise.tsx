import React, { useContext, useState } from 'react';
import { FlatList, Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FireBaseContext from './FireBaseContextMake/fireBaseContext';


const data = [
    { "id": '1', "name": 'Squats', "img": "https://www.tonal.com/wp-content/uploads/2022/10/Bodyweight-Squat.jpg?w=800" },
    { "id": '2', "name": 'Lunges', "img": "https://www.tonal.com/wp-content/uploads/2022/10/Bodyweight-Squat.jpg?w=800" },
    { "id": '3', "name": 'Box Jumps', "img": "https://www.tonal.com/wp-content/uploads/2022/10/Bodyweight-Squat.jpg?w=800" },
    { "id": '4', "name": 'Calf Raises', "img": "https://www.tonal.com/wp-content/uploads/2022/10/Bodyweight-Squat.jpg?w=800" },
    { "id": '5', "name": 'Squats', "img": "https://www.tonal.com/wp-content/uploads/2022/10/Bodyweight-Squat.jpg?w=800" }
]



export default function RunningExercise(props) {

    const hadlePress = (set: string) => {
        setShow(!show);
        setSelcted(set);
    }
    const handleShow = () => {

        if (show) {
            return (
                <View>
                    <Text> 100 push up 100pull up and 10 km run do it every day</Text>
                </View>
            )
        }
        else;

    }


    const [show, setShow] = useState(false);
    const [isSelected, setSelcted] = useState(null);


    const { isDarkMode, setDarkMode } = useContext(FireBaseContext);



    return (
        <SafeAreaView style={isDarkMode ? { backgroundColor: 'black' } : { backgroundColor: 'white' }}>


            <View>
                <FlatList data={data}
                    scrollEnabled={true}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={[styles.workOut, isDarkMode ? { backgroundColor: 'black' } : { backgroundColor: 'white' }]}>
                                    <TouchableOpacity onPress={() => { hadlePress(item.id) }} >
                                        <Image style={[{ height: 100, width: 100 }, styles.workOutImage]} source={{
                                            uri: item.img
                                        }} />
                                        <Text style={[styles.workOutText,]}>{item.name}   </Text>
                                    </TouchableOpacity>
                                    {isSelected === item.id ? handleShow() : null}
                                </View>
                            )
                        }
                    } />
            </View>

        </SafeAreaView>
    )

}




const styles = StyleSheet.create({
    workOut: {
        height: 190,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 19,
        backgroundColor: 'black',
        marginVertical: 19,
        justifyContent: 'center',
    },
    workOutImage: {
        // marginTop: 21,
        height: 190,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 19,
    },
    workOutText: {
        // color: 'black',
        position: 'absolute',
        bottom: 95,
        right: 23,
        alignSelf: 'flex-end',
        fontSize: 19,
        marginLeft: 25,

    }

})
