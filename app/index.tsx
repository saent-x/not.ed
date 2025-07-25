import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default () => {
  const [textInput1, onChangeTextInput1] = useState('');
  const [textInput2, onChangeTextInput2] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.column2}>
            <View style={styles.view}>
              <Image src={require('./logo.png')} height={100} width={100}/>
            </View>
            <Text style={styles.text2}>{'Welcome back'}</Text>
            <TextInput
              placeholder={'Email'}
              value={textInput1}
              onChangeText={onChangeTextInput1}
              style={styles.input}
            />
            <TextInput
              placeholder={'Password'}
              value={textInput2}
              onChangeText={onChangeTextInput2}
              style={styles.input}
            />
            <Text style={styles.text3}>{'Forgot password?'}</Text>
            <TouchableOpacity style={styles.button} onPress={() => alert('Pressed!')}>
              <View style={styles.view2}>
                <Text style={styles.text4}>{'Log In'}</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.text5}>{'Or continue with'}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button2} onPress={() => alert('Pressed!')}>
                <Text style={styles.text4}>{'Gmail'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button3} onPress={() => alert('Pressed!')}>
                <View style={styles.view2}>
                  <Text style={styles.text4}>{'Outlook'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.text5}>{"Don't have an account? Sign up"}</Text>
            <View style={styles.box}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  box: {
    height: 20,
    backgroundColor: '#F9F9F9',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#CC9368',
    borderRadius: 8,
    paddingVertical: 9,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#F2EDEA',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 62,
    marginRight: 12,
  },
  button3: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2EDEA',
    borderRadius: 8,
    paddingVertical: 9,
  },
  column: {
    backgroundColor: '#F9F9F9',
  },
  column2: {
    marginBottom: 318,
  },
  input: {
    color: '#89705B',
    fontSize: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#F2EDEA',
    borderRadius: 8,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 32,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#16140F',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 48,
  },
  text2: {
    color: '#16140F',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  text3: {
    color: '#89705B',
    fontSize: 14,
    marginVertical: 4,
    marginLeft: 16,
  },
  text4: {
    color: '#16140F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text5: {
    color: '#89705B',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 4,
    marginHorizontal: 16,
  },
  view: {
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  view2: {
    alignItems: 'center',
  },
});
