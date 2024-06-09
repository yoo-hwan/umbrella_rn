// import {StatusBar} from 'react-native';
// import Navigation from './routes/Navigation';
// import MainPage from '../pages/MainPage';

// const App = () => {
//   return (
//     <>
//       <StatusBar style="default" />
//       {/* <Navigation /> */}
//       <MainPage />
//     </>
//   );
// };

// export default App;

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './routes/Nest';

const App = () => {
  return (
    <>
      <StatusBar style="default" />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
