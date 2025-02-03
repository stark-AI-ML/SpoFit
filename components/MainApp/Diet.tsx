import React from 'react';

import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';


const DietData = [
    { "id": '1', "foodName": "", "img": "" },
    { "id": '2', "foodName": "", "img": "" },
    { "id": '3', "foodName": "", "img": "" },
    { "id": '4', "foodName": "", "img": "" },
]


export default function Diet() {
    return (
        <SafeAreaView>

            <ScrollView>
                <View>
                    <Text style={Styles.MainText}>
                        Diet For Preffered Sports
                    </Text>
                </View>
                <View>
                    <FlatList data={DietData}
                        renderItem={
                            ({ item }) => {
                                return (
                                    <View>
                                        {item.foodName}
                                    </View>
                                )
                            }
                        } />
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    MainText: {
        margin: 19,
        fontSize: 23,

    }

})