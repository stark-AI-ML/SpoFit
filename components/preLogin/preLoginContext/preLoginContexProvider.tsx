
import React, { useState } from 'react';
import PreLoginContext from './preLoginContext';





const PreLoginProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [isFoodSelected, setFoodSelected] = useState("");
  const [finalHeight, setFinalHeight] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [gender, setGender] = useState('chhka'); // my every user is chkka until he choose one cuz there is only two gender male or female
  const [selectworOutDays, setWorkoutDays] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [isFit, setFit] = useState(null)
  const [selectedSportsContext, setSelectedSportsContext] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(true);



  return (
    <PreLoginContext.Provider value={{
      name, setName,
      finalHeight, setFinalHeight,
      finalWeight, setFinalWeight,
      gender, setGender,
      progressValue, setProgressValue,
      isFoodSelected, setFoodSelected,
      selectedGoal, setSelectedGoal,
      isFit, setFit,
      setSelectedSportsContext, selectedSportsContext,
      isLoggedIn, setLoggedIn

    }}>
      {children}
    </PreLoginContext.Provider>
  );



};

export default PreLoginProvider;
