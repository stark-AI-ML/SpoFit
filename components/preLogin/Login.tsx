// import { AuthCredential } from 'firebase/auth/web-extension';
import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import auth, { sendEmailVerification } from '@react-native-firebase/auth';
import FireBaseContext from '../MainApp/FireBaseContextMake/fireBaseContext';
import PreLoginContext from './preLoginContext/preLoginContext';


export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [isVerified , setVerified] = useState(false); 

    const { isLoggedIn, setLoggedIn } = useContext(PreLoginContext);


    const handleLogin = async (email, password) => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password)
            const user = userCredential.user;


            if (user.emailVerified) {
                Alert.alert("login SuccessFul, Email is Verified");
                // setVerified(true); 
                navigation.navigate('Load');
            } else {

                Alert.alert("email Not VeriFied", "Please Verify your email");
                await user.sendEmailVerification();
                Alert.alert('Verification email sent', 'Please check your email inbox and verify your email.');
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Login Failed', 'Invalid Email or Password');
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Svg height="24" width="24" viewBox="0 0 24 24">
                        <Path d={showPassword ? "M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6.05-7.5-11-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" : "M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6.05-7.5-11-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"} fill="gray" />
                    </Svg>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { handleLogin(email, password) }}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}> Don't have an account? Sign Up         </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingRight: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
        color: 'black',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#007BFF',
        fontSize: 16,
        marginTop: 10,
    },
});
