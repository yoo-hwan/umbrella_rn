import RNEventSource from 'react-native-event-source';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';

export const EventSources = () => {
  const [eventMessage, setEventMessage] = useState('');

  console.log('mes : ', eventMessage);

  useEffect(() => {
    const eventSource = new RNEventSource(`http://192.168.0.17:8000/sse/`);

    eventSource.addEventListener('open', event => {
      console.log('Open SSE connection.');
    });
    eventSource.addEventListener('message', async event => {
      console.log(event.type);
      console.log(event.data);
      setEventMessage(event.data);
    });

    eventSource.addEventListener('error', event => {
      console.error('EventSource error:', event);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <View style={styles.text_container}>
      <Text>{eventMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text_container: {
    marginLeft: 70,
    marginTop: 70,
  },
});
