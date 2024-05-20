import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Define the functions and then set them as event handlers
    const onSpeechStart = (e) => {
      console.log('onSpeechStart: ', e);
      setStarted('start');
    };

    const onSpeechEnd = (e) => {
      console.log('onSpeechEnd: ', e);
      setEnded("end");
    };

    const onSpeechResults = (e) => {
      console.log('onSpeechResults: ', e);
      setResults(e.value);
    };

    const onSpeechError = (e) => {
      console.error('onSpeechError: ', e);
    };

    // Add the event listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Cleanup function
    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setStarted('');
      setEnded('');
      setResults([]);
    } catch (error) {
      console.error('Error starting Voice recognition: ', error);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setStarted('');
      setEnded('');
    } catch (error) {
      console.error('Error stopping Voice recognition: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Voice to text</Text>
      <TouchableOpacity onPress={startRecognizing}>
        <Image style={styles.micpic} source={require("./src/Assests/mic.png")} />
      </TouchableOpacity>

      <View style={styles.container2}>
        <Text>Started {started}</Text>
        <Text>Ended {ended}</Text>
      </View>

      <ScrollView horizontal>
       {
        results.map(item=>{
          return(
            <Text>
            {item}
            </Text>
          )
        })
       }
      </ScrollView>

      <TouchableOpacity style={styles.stopButton} onPress={stopRecognizing}>
        <Text style={styles.stopButtonText}>Stop listening</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    color: "black",
    alignSelf: "center",
    marginTop: 20,
    fontSize: 40,
  },
  micpic: {
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 150,
  },
  container2: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-evenly",
  },
  txt2: {
    color: "black",
    margin: 10,
    fontSize: 18,
  },
  stopButton: {
    width: '100%',
    height: 60,
    justifyContent: "center",
    backgroundColor: 'black',
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  stopButtonText: {
    color: 'white',
  },
});
