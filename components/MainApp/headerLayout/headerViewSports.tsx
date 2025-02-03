import React, { useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Modal, useColorScheme } from 'react-native';
import Svg, { Circle, Path } from "react-native-svg";
// import { useNavigation } from "@react-navigation/native";
import FireBaseContext from "../FireBaseContextMake/fireBaseContext";
import { getAuth } from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const UserIcon = ({ color }) => (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Circle cx="16" cy="16" r="15" stroke={color} strokeWidth="2" />
        <Circle cx="16" cy="10" r="4" stroke={color} strokeWidth="2" />
        <Path d="M8.5 24a7.5 7.5 0 0115 0" stroke={color} strokeWidth="2" />
    </Svg>
);

export default function MainHeader(props) {
    const { Users, setUsers } = useContext(FireBaseContext);

    const auth = getAuth();
    const { isDarkMode, setDarkMode } = useContext(FireBaseContext);
    // const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDarkModeToggle = () => {
        setDarkMode(!isDarkMode);
    };

    const Logout = async () => {
        auth.signOut();
        await AsyncStorage.removeItem('isDataLoaded');
        await AsyncStorage.removeItem('userData');
        setUsers(null);

    }




    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                <UserIcon color={isDarkMode ? "#fff" : "#000"} />
            </TouchableOpacity>
            <Text style={[styles.Head, isDarkMode && styles.darkText]}>SpoFit</Text>
            <TouchableOpacity style={styles.iconButton} onPress={handleDarkModeToggle}>
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, isDarkMode && styles.darkModalContainer]}>
                        <Text style={[styles.modalText, isDarkMode && styles.darkText]}>User Name  </Text>
                        <Text style={[styles.modalText, isDarkMode && styles.darkText]}>Sports Info  </Text>
                        <TouchableOpacity onPress={() => (Logout())}>
                            <Text style={[styles.modalButton, isDarkMode && styles.darkText]}>LogOut    </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={[styles.modalButton, isDarkMode && styles.darkText]}>Close     </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    darkModalContainer: {
        backgroundColor: '#333',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#000',
    },
    modalButton: {
        fontSize: 16,
        color: '#007bff',
        marginTop: 10,
    },
});
