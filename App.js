import React, {useState,useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';

const App = () => {
  // const [confirm, setConfirm] = useState(null);
  // const [number, setNumber] = useState('');
  // const [code, setCode] = useState('');
  const [email, setemail] = useState('')

useEffect(()=>{
  GoogleSignin.configure({
    webClientId: '253978691047-ke30soe5l5q4mo0amqietq1dkdg5esj8.apps.googleusercontent.com',
  });
  
},[])
 
  // const signin = async () => {
  //   console.log('pressed');
  //   const confirmation = await auth().signInWithPhoneNumber('+91' + number);
  //   console.log('confirmation', confirmation);
  //   if (confirmation) {
  //     alert('otp sent');
  //     setConfirm(confirmation);
      
  //   }
  // };
  // async function confirmCode() {
  //   try {
  //     await confirm.confirm(code);
  //     console.log('valid');
  //     alert('otp verified successfully');
  //   } catch (error) {
  //     alert('invalid otp');
  //     console.log('Invalid code.');
  //   }
  // }
  const signout = () => {
    
    auth()
      .signOut()
      .then(() => alert('User signed out!'));
      setemail('')
      
  };
  async function google() {
    // Get the users ID token
   
       
        
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
     auth().signInWithCredential(googleCredential)
     .then((e) => setemail(e.additionalUserInfo.profile.email) 
     
     )
  }

  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Mobile Login</Text>
      <View style={styles.view2}>
        {/* <TextInput
          placeholder="Enter Mobile Number"
          keyboardType="number-pad"
          style={styles.Input}
          onChangeText={number => setNumber(number)}></TextInput> */}
        <TouchableOpacity style={styles.btn}
        onPress={() => google()}
        >

          <Text style={styles.btnText}>Gmail Login</Text>
        </TouchableOpacity>
        <Text style={styles.emailText}>User Email : {email}</Text>
      
      </View>
      {/* <TextInput
        style={styles.Input}
        placeholder="Enter OTP"
        value={code}
        keyboardType='number-pad'
        onChangeText={text => setCode(text)}
      /> */}
      {/* <TouchableOpacity style={[styles.btn, {backgroundColor:'green'}]} onPress={() => confirmCode()}>
        <Text style={styles.btnText}>Verfify OTP</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity style={[styles.btn, {backgroundColor:'orange'}]} onPress={signout}>
        <Text style={styles.btnText}>Sign Out</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#E5D68A',
  },
  heading: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  view2: {
    height: 180,
    // backgroundColor:'red',
    marginTop: 80,
  },
  Input: {
    borderWidth: 0.4,
    backgroundColor: 'white',
    margin: 20,
    paddingLeft: 20,
    borderRadius: 10,
  },
  btn: {
    height: 40,
    // backgroundColor: 'teal',
    backgroundColor:'red',
    width: '30%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },

  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 5,
  },
  emailText:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    alignSelf:'center',
    marginTop:20  
   
  }
});

