import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native'

const App = () => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('')
  const [code, setCode] = useState('');


  // async function signInWithPhoneNumber(phoneNumber) {
  //   console.log('pressed')
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
    
  //   console.log(confirm)
  // }
  const  signin = async () => {
    console.log('pressed')
    const confirmation = await auth().signInWithPhoneNumber('+91'+number);
    console.log("confirmation", confirmation)
    if(confirmation){
      alert('otp sent')
        setConfirm(confirmation);
        // props.navigation.navigate('OTP',{'confirm':confirmation})
    }
}
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log('valid')
      alert('otp verified successfully')
    } catch (error) {
      alert('invalid otp')
      console.log('Invalid code.');
    }
  }
//   const  OtpVerify = async () => {
//     try {
//        let data = await confirm.confirm(number);
//        console.log("data", data);
//     } catch (error) {
//     console.log('Invalid code.');
  
//     }
// }
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>Mobile Login</Text>
      <View style={styles.view2}>
    <TextInput
    placeholder='Enter Mobile Number'
    style={styles.Input}
    
    onChangeText={(number)=>setNumber(number)}
    ></TextInput>
    <TouchableOpacity style={styles.btn}
    onPress={signin}
    ><Text style={styles.btnText}>Send OTP</Text></TouchableOpacity>
      </View>
      <TextInput style={{borderWidth:1, backgroundColor:'white'}} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#E5D68A',

  }, 
  heading:{
    alignSelf:'center', 
    marginTop:20,
    fontSize:30,
    fontWeight:'bold',
    color:'black'
  },
  view2:{
    height:180,
    // backgroundColor:'red',
    marginTop:80
  },
  Input:{
    borderWidth:0.4,
    backgroundColor:'white',
    margin:20,
    paddingLeft:20,
    borderRadius:10
  },
  btn:{
    height:40,
    backgroundColor:'teal',
    width:'30%',
    borderRadius:10,
    alignSelf:'center',
    marginTop:10
  },
  btnText:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    alignSelf:'center',
    marginTop:5
  }
})

// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const App = () => {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+916261458739')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} style={{borderWidth:1}} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }
// export default App

// import React, { useState, useEffect } from 'react';
// import { Button, TextInput, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';

// export default function App() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   // Handle create account button press
//   async function createAccount() {
//     try {
//       await auth().createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!');
//       console.log('User account created & signed in!');
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         console.log('That email address is already in use!');
//       }

//       if (error.code === 'auth/invalid-email') {
//         console.log('That email address is invalid!');
//       }
//       console.error(error);
//     }
//   }

//   // Handle the verify phone button press
//   async function verifyPhoneNumber(phoneNumber) {
//     const confirmation = await auth().verifyPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   // Handle confirm code button press
//   async function confirmCode() {
//     try {
//       const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
//       let userData = await auth().currentUser.linkWithCredential(credential);
//       setUser(userData.user);
//     } catch (error) {
//       if (error.code == 'auth/invalid-verification-code') {
//         console.log('Invalid code.');
//       } else {
//         console.log('Account linking error');
//       }
//     }
//   }

//   if (initializing) return null;

//   if (!user) {
//     return <Button title="Login" onPress={() => createAccount()} />;
//   } else if (!user.phoneNumber) {
//     if (!confirm) {
//       return (
//         <Button
//           title="Verify Phone Number"
//           onPress={() => verifyPhoneNumber('+916261458739')}
//         />
//       );
//     }
//     return (
//       <>
//         <TextInput value={code} onChangeText={text => setCode(text)} />
//         <Button title="Confirm Code" onPress={() => confirmCode()} />
//       </>
//     );
//   } else {
//     return (
//       <Text>
//         Welcome! {user.phoneNumber} linked with {user.email}
//       </Text>
//     );
//   }
// }