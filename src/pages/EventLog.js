import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {fetchEventLogs} from '../shared/api';

const EventLog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEventLogs = async () => {
      setLoading(true);
      const logs = await fetchEventLogs();
      setData(logs);
      setLoading(false);
    };

    getEventLogs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.logItem}>
          <Text style={styles.logText}>ID: {item.id}</Text>
          <Text style={styles.logText}>Sensor Type: {item.sensor_type}</Text>
          <Text style={styles.logText}>Log Message: {item.log_message}</Text>
          <Text style={styles.logText}>Timestamp: {item.timestamp}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  logText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default EventLog;
