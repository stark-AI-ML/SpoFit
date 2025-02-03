import { useEffect, useState } from "react";
import FireBaseContext from "./fireBaseContext";
import firestore from "../../../firebaseConfig";



const FireBaseProvider = ({ children }) => {

    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const userCollection = await firestore.collection('Profile').get();
    //             const usersData = userCollection.docs.map(doc => ({
    //                 id: doc.id,
    //                 ...doc.data()
    //             }));
    //             setUsers(usersData);
    //         } catch (error) {
    //             console.error('Error fetching users: ', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const [isDarkMode, setDarkMode] = useState(false);
    const [LoggedIn0, setLoggedIn0] = useState(null);
    const [Users, setUsers] = useState(null);


    return (
        <FireBaseContext.Provider

            value={{
                isDarkMode, setDarkMode,
                LoggedIn0, setLoggedIn0,
                Users, setUsers
            }} >{children}
        </FireBaseContext.Provider>

    );

}

export default FireBaseProvider; 