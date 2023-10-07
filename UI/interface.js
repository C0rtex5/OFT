import React from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const handleButtonClick = () => {
    // Add your logic here for what happens when the button is pressed
    alert('Button pressed!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, this is your JS program for Android!</Text>
      <Button title="Press Me" onPress={handleButtonClick} />
    </View>
  );
}