import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import auth from '@react-native-firebase/auth';

export default function SignUpPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValid, setValid] = useState(false);

    const handleSignUp = useCallback(() => {
        if (isValid) {
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match');
                return;
            }
            createUser(email, password);
        } else {
            Alert.alert('Error', 'Create a Valid Password');
        }
    }, [isValid, password, confirmPassword]);

    const createUser = useCallback(async (email, password) => {
        if (!email || !password) {
            console.log('Email and password must be provided');
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            console.log('User account created & signed in!');
            await sendVerificationEmail(userCredential.user);

            Alert.alert('Success', 'Account created successfully');
            navigation.navigate('Login');
        } catch (error) {
            handleAuthError(error);
        }
    }, [navigation]);

    const sendVerificationEmail = useCallback(async (user) => {
        try {
            await user.sendEmailVerification();
            console.log('Verification email sent!');
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    }, []);

    const handleAuthError = useCallback((error) => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('email adress is already in use');
        } else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        } else {
            console.error(error);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View>
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    isValid={isValid}
                    setValid={setValid}
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="gray"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Svg height="24" width="24" viewBox="0 0 24 24">
                        <Path d={showConfirmPassword ? "M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6.05-7.5-11-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" : "M12 4.5C7.05 4.5 2.73 7.61 1 12c1.73 4.39 6.05 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6.05-7.5-11-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"} fill="gray" />
                    </Svg>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Log In     </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const PasswordInput = ({ password, setPassword, showPassword, setShowPassword, isValid, setValid }) => {
    const passwordValidation = useCallback(() => {
        if (password.length === 0) return;

        if (password.length < 8) {
            setValid(false);
            return <Text style={styles.validationText}>Minimum 8 characters required</Text>;
        }

        const specialCharacters = "!@#$%^&*()_+-=[]{}|;':\",.<>/?";
        const hasSpecialCharacter = specialCharacters.split("").some(char => password.includes(char));

        if (!hasSpecialCharacter) {
            setValid(false);
            return <Text style={styles.validationText}>At least one special character required</Text>;
        }

        setValid(true);
        return <Text style={styles.validationTextSuccess}>Password length is okay and contains a special character</Text>;
    }, [password, setValid]);

    return (
        <View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={[styles.passwordInput]}
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
            <View style={styles.passwordValidation}>
                {passwordValidation()}
            </View>
        </View>
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
        // flexGrow: 1,
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
        width: 350,
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
        width: 350,
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
    passwordValidation: {
        marginTop: 5,
        height: 20,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    validationText: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 15,
        fontWeight: '300',
    },
    validationTextSuccess: {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 15,
        fontWeight: '300',
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
