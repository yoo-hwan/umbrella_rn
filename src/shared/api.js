import axios from 'axios';

// 습도 값 가져오기
export const humidity_fetchData = async () => {
  try {
    const response = await axios.get(`http://192.168.0.17:8000/get_humidity`);
    return response.data.humidity;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// 펜 동작
export const controlFan = async state => {
  try {
    const response = await axios.post(`http://192.168.0.17:8000/control_fan/`, {
      state,
    });
    // console.log('Fan control response:', response.data);
  } catch (error) {
    console.error(
      'Error controlling fan:',
      error.response ? error.response.data : error.message,
    );
  }
};

// Event log 데이터 가져오기
export const fetchEventLogs = async () => {
  try {
    const response = await axios.get('http://192.168.0.17:8000/event_log/');
    return response.data;
  } catch (error) {
    console.error('Error fetching event logs:', error);
    return [];
  }
};
