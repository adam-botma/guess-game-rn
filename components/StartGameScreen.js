import React, { useState }from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from './Card';
import Input from './Input';
import Colors from '../constants/colors';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  let confirmedOutPut;

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetButtonHandler = () => {
    setEnteredValue('');
    setConfirmed(false);

  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert('Invalid Number!', 'You must choose a number between 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: resetButtonHandler }])
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }



  if(confirmed){
  confirmedOutPut = <Text>Chosen Number: {selectedNumber}</Text>
  }


  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={styles.startScreenMain}>
        <Text style={styles.title}>Start A Game!</Text>
        <Card style={styles.inputCard}>
          <Text>Select a Number:</Text>
          <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false}
          keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue}/>
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title="Reset" color={Colors.secondary} onPress={resetButtonHandler}/></View>
            <View style={styles.button}><Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler}/></View>
          </View>
        </Card>
        {confirmedOutPut}
      </View>
    </TouchableWithoutFeedback>
  )

}

const styles = StyleSheet.create({
  startScreenMain: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginVertical: 10,
  },

  inputCard: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',

  },

  button:{
    width: 100,

  },

  input: {
    width: 50,
    textAlign: 'center',
  }

});

export default StartGameScreen;
