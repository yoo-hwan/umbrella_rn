import {NavigationContainer} from '@react-navigation/native';
// import StackScreen from './Nest';
import TabNavigator from './Nest';

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
export default Navigation;
