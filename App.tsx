import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import GenderSelection from './components/preLogin/genderSelection';
import NameTab from './components/preLogin/nameTab';
import FoodPrefrence from './components/preLogin/foodPrefrence';
import Height from './components/preLogin/Height';
import Weight from './components/preLogin/Weight';
import PreLoginProvider from './components/preLogin/preLoginContext/preLoginContexProvider';
import ProgressValue from './components/preLogin/progressValue1';
import TraningGoals from './components/preLogin/Goals';
import FitnesQ from './components/preLogin/FitnessQuestion';
import SignUpPage from './components/preLogin/SignUp';
import LoginPage from './components/preLogin/Login';
import LoadData from './components/preLogin/LoadData';
import SportsSelection from './components/preLogin/SportsPref';
import Sports from './components/MainApp/SportsTraining';
import MainHeader from './components/MainApp/headerLayout/headerViewSports';
import FireBaseContext from './components/MainApp/FireBaseContextMake/fireBaseContext';
import FireBaseProvider from './components/MainApp/FireBaseContextMake/fireBaseContextProvider';
import firestore from './firebaseConfig';
import PreLoginContext from './components/preLogin/preLoginContext/preLoginContext';
import { firebase, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import Diet from './components/MainApp/Diet';
import Header from './components/MainApp/headerLayout/headerView';
// import Analytics from './Analytics';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import AnalyticsIcon from './AnalyticsIcon';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReducedMotion } from 'react-native-reanimated';
import RunningExercise from './components/MainApp/RunningExercise';
import Analytics from './Analytics';
// import auth from "@react-native-firebase/auth"



Analytics
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const auth = getAuth();

const PreLoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <ProgressValue />,
      }}
    >
      <Stack.Screen name="genderSelector" component={GenderSelection} options={{ headerShown: true }} />
      <Stack.Screen name="nameTab" component={NameTab} />
      <Stack.Screen name="foodPrefrence" component={FoodPrefrence} options={{ headerShown: true }} />
      <Stack.Screen name="Height" component={Height} />
      <Stack.Screen name="Weight" component={Weight} />
      <Stack.Screen name="TraningGoals" component={TraningGoals} />
      <Stack.Screen name="FitnessQ" component={FitnesQ} />
      <Stack.Screen name="SporstPref" component={SportsSelection} />

      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {

  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const { LoggedIn0, setLoggedIn0 } = useContext(FireBaseContext)
  const { Users, setUsers } = useContext(FireBaseContext);
  const [userDATA, setUserDATA] = useState(null);





  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setUsers(user);
      if (user) {
        const dataLoaded = await AsyncStorage.getItem('isDataLoaded');
        setIsDataLoaded(dataLoaded === 'true');

      }

    });
    return unsubscribe;
  }, []);

  const handleDataLoaded = async () => {

    const docs = await firebase.firestore().collection('Profile').doc(Users.uid).get();
    if (docs.exists) {
      // setUserDATA(docs.data());
      console.log(docs.data);
      await AsyncStorage.setItem('userData', JSON.stringify(data.data()));
    }

    await AsyncStorage.setItem('isDataLoaded', 'true');
    setIsDataLoaded(true);
  };



  // useEffect(
  //   () => {
  //     onAuthStateChanged(auth,
  //       async (user) => {
  //         if (user) {
  //           const userProfile = await firestore.collection('Profile').doc(user.uid).get();
  //           setUsers(user);
  //         }
  //         else {
  //           setLoggedIn0(false);
  //           console.log("not logged");
  //         }
  //       }
  //     )
  //   }, []
  // )

  // const handleDataLoaded = async () => {
  //   await AsyncStorage.setItem('isDataLoaded', 'true');
  //   setIsDataLoaded(true);
  // };

  return (
    <Stack.Navigator>
      {


        Users ? (
          isDataLoaded ? (
            <Stack.Group>
              <Stack.Screen options={{ headerShown: false }} name='SportsHome' component={TabNavigator} />
              <Stack.Screen name='Running' component={RunningExercise} options={{ header: (props) => (<Header title={props.route.name} />) }} />
            </Stack.Group>
          ) : (<Stack.Screen name="LoadData">
            {() => <LoadData onLoaded={handleDataLoaded} />}
          </Stack.Screen>)
        ) : (
          <Stack.Screen options={{ headerShown: false }} name="PreLogin" component={PreLoginNavigator} />

        )

      }

      {/* {




        !LoggedIn0 ? <Stack.Screen options={{ headerShown: false }} name="PreLogin" component={PreLoginNavigator} /> :
          loading ? (<Stack.Screen name="Load" component={LoadData} />) :
            <Stack.Group>
              <Stack.Screen options={{ headerShown: false }} name='Sports' component={TabNavigator} />
            </Stack.Group>
      } */}

    </Stack.Navigator>
  );
};

const App = () => {

  return (
    <NavigationContainer>
      <FireBaseProvider>
        <PreLoginProvider>

          <StackNavigator />

        </PreLoginProvider>
      </FireBaseProvider >
    </NavigationContainer>


    // {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //       <TouchableOpacity onPress={() => consoleData()}

    //         style={{ height: 100, width: 100, backgroundColor: 'blue' }}>
    //         <Text>Click me</Text>
    //       </TouchableOpacity>
    //     </View> */}

  );
};

const SportsIcon = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2" />
    <Line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" />
    <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
  </Svg>
);

const DietIcon = ({ color }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L12 22" stroke={color} strokeWidth="2" />
    <Path d="M6 7H18V17H6V7Z" stroke={color} strokeWidth="2" />
    <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2" />
  </Svg>
);

const TabNavigator = () => {
  const { isDarkMode } = useContext(FireBaseContext);
  return (
    <Tab.Navigator

      screenOptions={{
        tabBarStyle: {

        },
        tabBarInactiveTintColor: 'orange',
        // tabBarPosition: 'bottom',
        tabBarBackground: () => (
          <View style={{ backgroundColor: isDarkMode ? 'black' : '#fff', elevation: 10, shadowColor: 'gray', flex: 1, borderTopRightRadius: 23, borderTopLeftRadius: 23, opacity: 1, }}></View>),
      }
      }

    >
      <Tab.Screen name='Sports' component={Sports} options={{
        header: () => <MainHeader />,
        tabBarIcon: ({ color, size }) => (<SportsIcon color={isDarkMode ? 'white' : 'black'} />)
      }}

      />
      <Tab.Screen name='Diet' component={Diet} options={{
        header: (props) => <Header title={props.route.name} />,
        tabBarIcon: ({ color, size }) => (<DietIcon color={isDarkMode ? 'white' : 'black'} />)
      }} />

      <Tab.Screen name='Analytics' component={Analytics} options={{
        header: (props) => <Header title={props.route.name} />,
        tabBarIcon: ({ color, size }) => (<AnalyticsIcon color={isDarkMode ? "white" : "black"} />)
      }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
