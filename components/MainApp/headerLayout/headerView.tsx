import React, { useContext } from "react";

import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg";



import { useNavigation } from "@react-navigation/native";
import FireBaseContext from "../FireBaseContextMake/fireBaseContext";

export default function Header({ title }) {

    const { isDarkMode, setDarkMode } = useContext(FireBaseContext)

    const BackButtonIcon = ({ color }) => (
        <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12" cy="12" r="11.5" stroke="#D3D3D3" />
            <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )

    const SunIcon = () => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="5" />
            <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </Svg>
    );

    const MoonIcon = () => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </Svg>
    );

    const handleDarkModeToggle = () => {
        setDarkMode(!isDarkMode);
    };

    const navigation = useNavigation();

    return (
        <View style={[styles.container, isDarkMode ? { backgroundColor: 'black' } : null]}>

            <TouchableOpacity style={[styles.backButton,]} onPress={() => navigation.goBack()}>

                <BackButtonIcon color={isDarkMode ? 'white' : 'black'} />

            </TouchableOpacity>

            <Text style={[styles.Head, isDarkMode && styles.darkText]}>{title}</Text>

            <TouchableOpacity style={styles.iconButton} onPress={handleDarkModeToggle}>
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </TouchableOpacity>



        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginTop: 19,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {

        padding: 10,
        alignSelf: 'center'

    },

    darkContainer: {
        backgroundColor: '#000',
        borderBottomColor: '#333',
    },
    Head: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    darkText: {
        color: '#fff',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 10,
        marginHorizontal: 5,
    },
})