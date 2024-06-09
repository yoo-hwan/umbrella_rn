import {
  StyleSheet,
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {EventSources} from './EventSource';
import {humidity_fetchData, controlFan} from '../shared/api';

const MainPage = () => {
  const [isFanEnabled, setIsFanEnabled] = useState(false);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);
  const [humidity, setHumidity] = useState('70');

  const toggleFanSwitch = async () => {
    const newFanState = !isFanEnabled;
    setIsFanEnabled(newFanState);
    try {
      await controlFan(newFanState);
    } catch (error) {
      console.error('Error controlling fan:', error);
      setIsFanEnabled(!newFanState); // Revert the state if there was an error
    }
  };

  const toggleAlarmSwitch = () =>
    setIsAlarmEnabled(previousState => !previousState);

  const handleIconPress = async () => {
    const data = await humidity_fetchData();
    setHumidity(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.first_container}>
        <Image
          source={require('../assets/humidity.png')}
          style={styles.humidity_image}
        />
        <EventSources />
        {/* <View style={styles.text_container}>
          <Text>{serverMessage}</Text>
        </View> */}
      </View>

      <View style={styles.humidity_value}>
        <View style={styles.humidity_text_container}>
          <Text style={styles.humity_text}>습도 : {humidity} %</Text>
          <TouchableOpacity onPress={handleIconPress}>
            <Icon name="sync" type="MaterialCommunityIcons" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.humidity_figure}>
          <Progress.Bar
            progress={humidity / 100}
            width={null}
            height={10}
            marginTop={10}
            color={'#1E90FF'}
          />
        </View>
      </View>

      <View style={styles.second_container}>
        <View style={styles.image1_container}>
          <Image source={require('../assets/fan.png')} style={styles.image1} />
          <Switch
            trackColor={{false: '#767577', true: '#32CD32'}}
            thumbColor={isFanEnabled ? '#F0F8FF' : '#F0F8FF'}
            onValueChange={toggleFanSwitch}
            value={isFanEnabled}
            style={styles.first_switch}
          />
        </View>
        <View style={styles.image2_container}>
          <Image
            source={require('../assets/alarm.png')}
            style={styles.image2}
          />
          <Switch
            trackColor={{false: '#767577', true: '#32CD32'}}
            thumbColor={isAlarmEnabled ? '#F0F8FF' : '#F0F8FF'}
            onValueChange={toggleAlarmSwitch}
            value={isAlarmEnabled}
            style={styles.second_switch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  first_container: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 50,
  },
  humidity_image: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
  text_container: {
    marginLeft: 70,
    marginTop: 70,
  },
  humidity_value: {
    marginTop: 20,
  },
  humidity_text_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 65,
  },
  humity_text: {
    marginRight: 5,
  },
  humidity_figure: {
    marginLeft: 20,
    marginRight: 230,
  },
  second_container: {
    marginTop: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image1_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  image1: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  first_switch: {
    marginTop: 20,
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  image2_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image2: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
  },
  second_switch: {
    marginBottom: 20,
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
});

export default MainPage;
