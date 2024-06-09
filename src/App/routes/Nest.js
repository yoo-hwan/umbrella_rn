import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ContentRoutes} from './routes';
import MainPage from '../../pages/MainPage';
import EventLog from '../../pages/EventLog';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ContentRoutes.HOME}
        component={MainPage}
        options={{
          tabBarLabel: '메인 화면',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ContentRoutes.EVENT_LOG}
        component={EventLog}
        options={{
          tabBarLabel: '이벤트 로그',
          tabBarIcon: ({color, size}) => (
            <Icon name="assignment" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
