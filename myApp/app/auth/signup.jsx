// //qiky osht funksional edhe i sakt qe funksionon te tjerat jane prova
// import React, { useState } from 'react';
// import {
//   Alert,
//   Modal,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import { Stack, router } from 'expo-router';
// import { FontAwesome5 } from '@expo/vector-icons';

// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../../firebaseConfig'; // NDRYSHO PATH NËSE E KE DIKUND TJETËR

// const COLORS = {
//   green: '#355E3B',
//   page: '#F9F6E8',
//   inputBg: '#F1EFDF',
//   border: '#D7D2B8',
// };

// export default function Signup() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName,  setLastName]  = useState('');
//   const [email,     setEmail]     = useState('');
//   const [password,  setPassword]  = useState('');
//   const [gender,    setGender]    = useState('');
//   const [weight,    setWeight]    = useState('');
//   const [height,    setHeight]    = useState('');
//   const [agreed,    setAgreed]    = useState(false);

//   const [loading,   setLoading]   = useState(false);
//   const [error,     setError]     = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

//   const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

//   const validateInputs = () => {
//     setError('');

//     if (!firstName || !lastName || !email || !password) {
//       setError('Ju lutem plotësoni të gjitha fushat kryesore.');
//       return false;
//     }

//     if (!emailRegex.test(email.trim())) {
//       setError('Email nuk është në format të vlefshëm.');
//       return false;
//     }

//     if (password.length < 6) {
//       setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
//       return false;
//     }

//     if (!agreed) {
//       setError('Duhet të pranoni Termat dhe Kushtet.');
//       return false;
//     }

//     return true;
//   };

//   const handleSignup = async () => {
//     if (!validateInputs()) return;

//     setLoading(true);
//     try {
//       const cred = await createUserWithEmailAndPassword(
//         auth,
//         email.trim(),
//         password
//       );

//       // vendos emrin te profili i Firebase user
//       await updateProfile(cred.user, {
//         displayName: `${firstName} ${lastName}`,
//       });

//       // këtu mund me i ruajt gender/weight/height në Firestore nëse do

//       setModalVisible(true); // si te shembulli yt
//       // ose direkt:
//       // router.replace('/dashboard');
//     } catch (err) {
//       console.log('Firebase signup error:', err);

//       if (err.code === 'auth/email-already-in-use') {
//         setError('Ky email është tashmë i regjistruar.');
//       } else if (err.code === 'auth/invalid-email') {
//         setError('Email i pavlefshëm.');
//       } else if (err.code === 'auth/weak-password') {
//         setError('Fjalëkalimi është shumë i dobët.');
//       } else {
//         setError(err.message || 'Diçka shkoi keq gjatë regjistrimit.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ScrollView
//         contentContainerStyle={s.wrap}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Stack.Screen options={{ headerShown: false }} />

//         {/* LOGO + BRAND */}
//         <View style={s.brand}>
//           <View style={s.runCircle}>
//             <FontAwesome5 name="running" size={56} color="#FFFFFF" />
//           </View>
//           <Text style={s.brandTitle}>PERSONAL HEALTH TRACKER</Text>
//         </View>

//         <Text style={s.h1}>REGJISTROHU</Text>

//         {/* FUSHAT */}
//         <TextInput
//           placeholder="Emri"
//           style={s.input}
//           value={firstName}
//           onChangeText={setFirstName}
//         />
//         <TextInput
//           placeholder="Mbiemri"
//           style={s.input}
//           value={lastName}
//           onChangeText={setLastName}
//         />
//         <TextInput
//           placeholder="Email"
//           style={s.input}
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />
//         <TextInput
//           placeholder="Fjalëkalimi"
//           style={s.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TextInput
//           placeholder="Gjinia"
//           style={s.input}
//           value={gender}
//           onChangeText={setGender}
//         />

//         <View style={s.row}>
//           <TextInput
//             placeholder="Pesha (kg)"
//             style={[s.input, s.col, { marginRight: 8 }]}
//             value={weight}
//             onChangeText={setWeight}
//             keyboardType="numeric"
//           />
//           <TextInput
//             placeholder="Gjatësia (cm)"
//             style={[s.input, s.col, { marginLeft: 8 }]}
//             value={height}
//             onChangeText={setHeight}
//             keyboardType="numeric"
//           />
//         </View>

//         {/* TERMS & CONDITIONS */}
//         <Pressable
//           style={s.checkboxRow}
//           onPress={() => setAgreed(!agreed)}
//         >
//           <View style={[s.checkbox, agreed && s.checkboxOn]}>
//             {agreed ? <Text style={s.checkmark}>✓</Text> : null}
//           </View>
//           <Text style={s.checkboxTxt}>
//             I agree with Terms and Conditions
//           </Text>
//         </Pressable>

//         {/* MESAZH ERRORI */}
//         {error ? <Text style={s.error}>{error}</Text> : null}

//         {/* BUTON RUAJ */}
//         <Pressable
//           style={[s.primary, loading && { opacity: 0.7 }]}
//           onPress={handleSignup}
//           disabled={loading}
//         >
//           <Text style={s.primaryTxt}>
//             {loading ? 'Duke u regjistruar...' : 'RUAJ'}
//           </Text>
//         </Pressable>

//         {/* LINK HYR */}
//         <View style={s.loginRow}>
//           <Text style={s.loginTxt}>Tashmë keni një llogari? </Text>
//           <Pressable onPress={() => router.push('/auth/login')}>
//             <Text style={s.loginLink}>Hyr</Text>
//           </Pressable>
//         </View>
//       </ScrollView>

//       {/* MODAL SUKSESI */}
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={s.modalOverlay}>
//           <View style={s.modalBox}>
//             <Text style={s.modalTitle}>Regjistrimi i suksesshëm 🎉</Text>
//             <Text style={s.modalText}>
//               Llogaria u krijua me sukses. Mund të hyni tani.
//             </Text>
//             <Pressable
//               style={s.modalBtn}
//               onPress={() => {
//                 setModalVisible(false);
//                 router.replace('/(tabs)/dashboard'); // ose /dashboard, si don
//               }}
//             >
//               <Text style={s.modalBtnText}>Vazhdo</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const s = StyleSheet.create({
//   wrap: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 24,
//     backgroundColor: COLORS.page,
//   },

//   brand: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   runCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: COLORS.green,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 6,
//   },
//   brandTitle: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '800',
//     color: COLORS.green,
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//   },

//   h1: {
//     fontSize: 22,
//     color: COLORS.green,
//     fontWeight: '800',
//     marginBottom: 16,
//   },

//   input: {
//     backgroundColor: COLORS.inputBg,
//     borderRadius: 10,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   row: {
//     flexDirection: 'row',
//   },
//   col: {
//     flex: 1,
//   },

//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 12,
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: 6,
//     borderWidth: 1.5,
//     borderColor: COLORS.green,
//     backgroundColor: COLORS.inputBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   checkboxOn: {
//     backgroundColor: COLORS.green,
//   },
//   checkmark: {
//     color: 'white',
//     fontWeight: '900',
//     lineHeight: 18,
//   },
//   checkboxTxt: {
//     color: COLORS.green,
//     fontWeight: '600',
//   },

//   error: {
//     color: '#C0392B',
//     marginBottom: 10,
//     fontSize: 13,
//     fontWeight: '600',
//   },

//   primary: {
//     backgroundColor: COLORS.green,
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   primaryTxt: {
//     color: 'white',
//     fontWeight: '700',
//     letterSpacing: 1,
//   },

//   loginRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   loginTxt: {
//     color: '#5a5a5a',
//   },
//   loginLink: {
//     color: COLORS.green,
//     fontWeight: '800',
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.35)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     width: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '800',
//     marginBottom: 8,
//     color: COLORS.green,
//   },
//   modalText: {
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   modalBtn: {
//     backgroundColor: COLORS.green,
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 24,
//   },
//   modalBtnText: {
//     color: '#FFF',
//     fontWeight: '700',
//   },
// });


//logjik e re
import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  page: '#F9F6E8',
  inputBg: '#F1EFDF',
  border: '#D7D2B8',
};

export default function Signup() {
  const params = useLocalSearchParams();

  const [fromSocial, setFromSocial] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [gender,    setGender]    = useState('');
  const [weight,    setWeight]    = useState('');
  const [height,    setHeight]    = useState('');
  const [agreed,    setAgreed]    = useState(false);

  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  // mbushi fushat kur vjen nga Google
  useEffect(() => {
    if (params.mode === 'social') {
      setFromSocial(true);
      if (params.firstName) setFirstName(String(params.firstName));
      if (params.lastName)  setLastName(String(params.lastName));
      if (params.email)     setEmail(String(params.email));
    }
  }, [params]);

  const validateInputs = () => {
    setError('');

    if (!firstName || !lastName || !email) {
      setError('Ju lutem plotësoni emrin, mbiemrin dhe email-in.');
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      setError('Email nuk është në format të vlefshëm.');
      return false;
    }

    if (!fromSocial) {
      if (!password) {
        setError('Ju lutem vendosni fjalëkalimin.');
        return false;
      }
      if (password.length < 6) {
        setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
        return false;
      }
    }

    if (!agreed) {
      setError('Duhet të pranoni Termat dhe Kushtet.');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;
    setLoading(true);

    try {
      const parsedWeight = weight
        ? Number(String(weight).replace(',', '.'))
        : null;
      const parsedHeight = height
        ? Number(String(height).replace(',', '.'))
        : null;

      let userAccount = null;

      if (fromSocial) {
        // user është i kyçur me Google / social
        userAccount = auth.currentUser;
        if (!userAccount) {
          setError('Nuk ka përdorues të kyçur.');
          setLoading(false);
          return;
        }

        await updateProfile(userAccount, {
          displayName: `${firstName} ${lastName}`,
        });
      } else {
        // signup klasik me email/password
        const cred = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        userAccount = cred.user;

        await updateProfile(userAccount, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      // ruaj profilin në Firestore
      await setDoc(doc(db, 'users', userAccount.uid), {
        firstName,
        lastName,
        email: email.trim(),
        gender: gender || '',
        weight: parsedWeight,
        height: parsedHeight,
        photo: null,
        profileCompleted: true,
      });

      router.replace('/(tabs)/dashboard');
    } catch (e) {
      console.log('Firebase signup error:', e);

      if (e.code === 'auth/email-already-in-use') {
        setError('Ky email është tashmë i regjistruar.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Email i pavlefshëm.');
      } else if (e.code === 'auth/weak-password') {
        setError('Fjalëkalimi është shumë i dobët.');
      } else {
        setError(e.message || 'Diçka shkoi keq gjatë regjistrimit.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={s.wrap}
        keyboardShouldPersistTaps="handled"
      >
        <Stack.Screen options={{ headerShown: false }} />

        {/* LOGO + BRAND */}
        <View style={s.brand}>
          <View style={s.runCircle}>
            <FontAwesome5 name="running" size={56} color="#FFFFFF" />
          </View>
          <Text style={s.brandTitle}>PERSONAL HEALTH TRACKER</Text>
        </View>

        <Text style={s.h1}>REGJISTROHU</Text>

        <TextInput
          placeholder="Emri"
          style={s.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Mbiemri"
          style={s.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email"
          style={s.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!fromSocial}
        />
        {!fromSocial && (
          <TextInput
            placeholder="Fjalëkalimi"
            style={s.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        )}

        <TextInput
          placeholder="Gjinia"
          style={s.input}
          value={gender}
          onChangeText={setGender}
        />

        <View style={s.row}>
          <TextInput
            placeholder="Pesha (kg)"
            style={[s.input, s.col, { marginRight: 8 }]}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Gjatësia (cm)"
            style={[s.input, s.col, { marginLeft: 8 }]}
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>

        <Pressable
          style={s.checkboxRow}
          onPress={() => setAgreed(!agreed)}
        >
          <View style={[s.checkbox, agreed && s.checkboxOn]}>
            {agreed ? <Text style={s.checkmark}>✓</Text> : null}
          </View>
          <Text style={s.checkboxTxt}>
            I agree with Terms and Conditions
          </Text>
        </Pressable>

        {error ? <Text style={s.error}>{error}</Text> : null}

        <Pressable
          style={[s.primary, loading && { opacity: 0.7 }]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={s.primaryTxt}>
            {loading ? 'Duke u regjistruar...' : 'RUAJ'}
          </Text>
        </Pressable>

        <View style={s.loginRow}>
          <Text style={s.loginTxt}>Tashmë keni një llogari? </Text>
          <Pressable onPress={() => router.push('/auth/login')}>
            <Text style={s.loginLink}>Hyr</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS.page,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 24,
  },
  runCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  brandTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.green,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: 22,
    color: COLORS.green,
    fontWeight: '800',
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.green,
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxOn: {
    backgroundColor: COLORS.green,
  },
  checkmark: {
    color: 'white',
    fontWeight: '900',
    lineHeight: 18,
  },
  checkboxTxt: {
    color: COLORS.green,
    fontWeight: '600',
  },
  error: {
    color: '#C0392B',
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '600',
  },
  primary: {
    backgroundColor: COLORS.green,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryTxt: {
    color: 'white',
    fontWeight: '700',
    letterSpacing: 1,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginTxt: {
    color: '#5a5a5a',
  },
  loginLink: {
    color: COLORS.green,
    fontWeight: '800',
  },
});
