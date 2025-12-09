//NGA FAZA 1
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Image,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import {
//   FacebookAuthProvider,
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   OAuthProvider,
//   linkWithPopup,
//   signOut,
//   updateProfile,
// } from 'firebase/auth';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../../firebaseConfig';

// const COLORS = {
//   green: '#355E3B',
//   page: '#F7F4E9',
//   card: '#E6DFC5',
//   textDark: '#2E2E2E',
//   cardSoft: '#EFE8CF',
// };

// export default function Profile() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [form, setForm] = useState({
//     emri: '',
//     mbiemri: '',
//     emaili: '',
//     gjinia: '',
//     pesha: '',
//     gjatesia: '',
//   });

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const user = auth.currentUser;
//         if (!user) {
//           setLoading(false);
//           return;
//         }

//         const ref = doc(db, 'users', user.uid);
//         const snap = await getDoc(ref);

//         if (snap.exists()) {
//           const data = snap.data();
//           setForm({
//             emri: data.firstName || '',
//             mbiemri: data.lastName || '',
//             emaili: data.email || user.email || '',
//             gjinia: data.gender || '',
//             pesha: data.weight != null ? String(data.weight) : '',
//             gjatesia: data.height != null ? String(data.height) : '',
//           });
//         } else {
//           const displayName = user.displayName || '';
//           const [fn, ...rest] = displayName.split(' ');
//           const ln = rest.join(' ');

//           setForm(f => ({
//             ...f,
//             emri: fn,
//             mbiemri: ln,
//             emaili: user.email || '',
//           }));
//         }
//       } catch (e) {
//         console.log('loadProfile error:', e);
//         Alert.alert('Gabim', 'Nuk u lexua profili nga serveri.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, []);

//   const handleChange = (key, value) => {
//     setForm(prev => ({ ...prev, [key]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       setSaving(true);

//       const parsedWeight = form.pesha
//         ? Number(String(form.pesha).replace(',', '.'))
//         : null;
//       const parsedHeight = form.gjatesia
//         ? Number(String(form.gjatesia).replace(',', '.'))
//         : null;

//       await setDoc(
//         doc(db, 'users', user.uid),
//         {
//           firstName: form.emri,
//           lastName: form.mbiemri,
//           email: form.emaili,
//           gender: form.gjinia,
//           weight: parsedWeight,
//           height: parsedHeight,
//           profileCompleted: true,
//         },
//         { merge: true }
//       );

//       await updateProfile(user, {
//         displayName: `${form.emri} ${form.mbiemri}`,
//       });

//       Alert.alert('Sukses', 'Profili u përditësua.');
//     } catch (e) {
//       console.log('save profile error:', e);
//       Alert.alert('Gabim', 'Nuk u ruajtën ndryshimet.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.replace('/(auth)/login');
//   };

//   const linkSocialAccount = async (provider, providerName) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       if (Platform.OS !== 'web') {
//         Alert.alert(
//           'Info',
//           `Lidhja me ${providerName} funksionon vetëm në web.`
//         );
//         return;
//       }

//       await linkWithPopup(user, provider);
//       Alert.alert('Sukses', `Llogaria u lidh me ${providerName}.`);
//     } catch (e) {
//       console.log(`link ${providerName} error:`, e);

//       if (e.code === 'auth/provider-already-linked') {
//         Alert.alert('Info', `${providerName} është veç i lidhur me llogarinë.`);
//       } else if (e.code === 'auth/credential-already-in-use') {
//         Alert.alert(
//           'Gabim',
//           `Kjo llogari ${providerName} është e lidhur me një përdorues tjetër.`
//         );
//       } else if (e.code === 'auth/requires-recent-login') {
//         Alert.alert(
//           'Gabim',
//           'Lidhja kërkon që të kycësh përsëri. Dil dhe hy prapë, pastaj provo përsëri.'
//         );
//       } else {
//         Alert.alert('Gabim', `Nuk u lidh llogaria me ${providerName}.`);
//       }
//     }
//   };

//   const handleLinkGoogle = () =>
//     linkSocialAccount(new GoogleAuthProvider(), 'Google');

//   const handleLinkMicrosoft = () =>
//     linkSocialAccount(new OAuthProvider('microsoft.com'), 'Microsoft');

//   const handleLinkGitHub = () =>
//     linkSocialAccount(new GithubAuthProvider(), 'GitHub');

//   const handleLinkFacebook = () =>
//     linkSocialAccount(new FacebookAuthProvider(), 'Facebook');

//   if (loading) {
//     return (
//       <View style={[styles.loading, { backgroundColor: COLORS.page }]}>
//         <Text style={[styles.loadingText, { color: COLORS.textDark }]}>
//           Duke ngarkuar profilin...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       contentContainerStyle={[styles.container, { backgroundColor: COLORS.page }]}
//     >
//       <Text style={[styles.title, { color: COLORS.green }]}>
//         Profili i përdoruesit
//       </Text>

//       <View style={styles.iconCircle}>
//   <FontAwesome5 name="user-circle" size={48} color={COLORS.green} />
// </View>


//       <View style={[styles.card, { backgroundColor: COLORS.card }]}>
//         {[
//           ['Emri', 'emri'],
//           ['Mbiemri', 'mbiemri'],
//           ['Emaili', 'emaili'],
//           ['Gjinia', 'gjinia'],
//           ['Pesha', 'pesha'],
//           ['Gjatësia', 'gjatesia'],
//         ].map(([label, key]) => (
//           <View key={key} style={styles.row}>
//             <Text style={[styles.label, { color: COLORS.textDark }]}>{label}</Text>
//             <TextInput
//               style={[
//                 styles.input,
//                 { backgroundColor: COLORS.cardSoft, color: COLORS.textDark },
//               ]}
//               value={form[key]}
//               onChangeText={text => handleChange(key, text)}
//             />
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: COLORS.green }]}
//         onPress={handleSave}
//         disabled={saving}
//       >
//         <Text style={[styles.buttonText, { color: COLORS.page }]}>
//           {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
//         </Text>
//       </TouchableOpacity>

//       <Text style={{ 
//   marginTop: 16,
//   marginBottom: 8,
//   fontSize: 16,
//   fontWeight: '600',
//   color: COLORS.textDark 
// }}>
//   Dëshironi të lidheni llogarin tuaj aktuale me:
// </Text>

// <View style={{
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   gap: 16,
//   marginBottom: 8
// }}>
//   <Pressable style={styles.socialBtn} onPress={handleLinkGoogle}>
//     <Image
//       source={require('../../assets/icons/google.png')}
//       style={{ width: 24, height: 24, resizeMode: 'contain' }}
//     />
//   </Pressable>

//   <Pressable style={styles.socialBtn} onPress={handleLinkMicrosoft}>
//     <FontAwesome5 name="microsoft" size={22} color="#0078D4" />
//   </Pressable>

//   <Pressable style={styles.socialBtn} onPress={handleLinkGitHub}>
//     <FontAwesome5 name="github" size={22} color="#000" />
//   </Pressable>

//   <Pressable style={styles.socialBtn} onPress={handleLinkFacebook}>
//     <FontAwesome5 name="facebook" size={22} color="#1877F2" />
//   </Pressable>
// </View>


//       <TouchableOpacity
//         style={[styles.logoutButton, { borderColor: COLORS.green }]}
//         onPress={handleLogout}
//       >
//         <Text style={[styles.logoutText, { color: COLORS.textDark }]}>
//           Dil nga llogaria
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: { fontSize: 18 },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   iconCircle: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: '#F1EFDF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 18,
//   },
//   card: {
//     width: '100%',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 6,
//     alignItems: 'center',
//   },
//   label: { fontWeight: 'bold', width: '25%' },
//   input: {
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     width: '70%',
//     textAlign: 'right',
//   },
//   button: {
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   socialBtn: {
//   width: 48,
//   height: 48,
//   borderRadius: 24,
//   backgroundColor: COLORS.cardSoft,
//   borderWidth: 1,
//   borderColor: COLORS.border,
//   alignItems: 'center',
//   justifyContent: 'center',
// },

//   buttonText: { fontSize: 16, fontWeight: 'bold' },
//   logoutButton: {
//     marginTop: 12,
//     padding: 10,
//     borderWidth: 2,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   logoutText: { fontWeight: 'bold' },
// });
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  linkWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

import * as ImagePicker from 'expo-image-picker';

const COLORS = {
  green: '#355E3B',
  page: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
  border: '#D6CFB5',
};

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    emri: '',
    mbiemri: '',
    emaili: '',
    gjinia: '',
    pesha: '',
    gjatesia: '',
  });

  // Këtu ruajmë string-un base64 (data URL) nga Firestore
  const [avatarUri, setAvatarUri] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setForm({
            emri: data.firstName || '',
            mbiemri: data.lastName || '',
            emaili: data.email || user.email || '',
            gjinia: data.gender || '',
            pesha: data.weight != null ? String(data.weight) : '',
            gjatesia: data.height != null ? String(data.height) : '',
          });

          // Lexojmë foton nga Firestore nëse ekziston
          if (data.image) {
            setAvatarUri(data.image); // data.image është data URL base64
          }
        } else {
          const displayName = user.displayName || '';
          const [fn, ...rest] = displayName.split(' ');
          const ln = rest.join(' ');

          setForm(f => ({
            ...f,
            emri: fn,
            mbiemri: ln,
            emaili: user.email || '',
          }));
        }
      } catch (e) {
        console.log('loadProfile error:', e);
        Alert.alert('Gabim', 'Nuk u lexua profili nga serveri.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Helper i përbashkët për me procesu rezultatin e ImagePicker
  const handleImagePicked = async (result) => {
    try {
      if (result.canceled) return;

      const asset = result.assets[0];
      if (!asset.base64) return;

      const base64Img = `data:image/jpg;base64,${asset.base64}`;

      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Gabim', 'Nuk ka përdorues të kyçur.');
        return;
      }

      const userRef = doc(db, 'users', user.uid);

      // Ruajmë foton në Firestore në fushën "image"
      await setDoc(
        userRef,
        { image: base64Img },
        { merge: true }
      );

      setAvatarUri(base64Img);
      Alert.alert('Sukses', 'Fotoja u përditësua.');
    } catch (e) {
      console.log('handleImagePicked error:', e);
      Alert.alert('Gabim', 'Nuk u ruajt fotoja. Provo përsëri.');
    }
  };

  const chooseFromLibrary = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Leje e nevojshme', 'Na duhet leja për të qasur galerinë.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,      // E RËNDËSISHME për ruajtje në Firestore
        quality: 0.5,
      });

      await handleImagePicked(result);
    } catch (e) {
      console.log('chooseFromLibrary error:', e);
      Alert.alert('Gabim', 'Nuk u zgjodh dot fotoja.');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Leje e nevojshme', 'Na duhet leja për të përdorur kamerën.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.5,
      });

      await handleImagePicked(result);
    } catch (e) {
      console.log('takePhoto error:', e);
      Alert.alert('Gabim', 'Nuk u bë dot fotoja.');
    }
  };

  const deleteImage = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);

      await setDoc(
        userRef,
        { image: null },
        { merge: true }
      );

      setAvatarUri(null);
      Alert.alert('Sukses', 'Fotoja e profilit u fshi.');
    } catch (e) {
      console.log('deleteImage error:', e);
      Alert.alert('Gabim', 'Nuk u fshi fotoja. Provo përsëri.');
    }
  };

  const openImageOptions = () => {
    // Logjika që kërkove:
    // - NUK KA FOTO → "Add profile picture" → choose/take/cancel
    // - KA FOTO → choose/take/delete/cancel
    if (!avatarUri) {
      Alert.alert(
        'Add profile picture',
        'Zgjidh një opsion',
        [
          { text: 'Choose from library', onPress: chooseFromLibrary },
          { text: 'Take photo', onPress: takePhoto },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else {
      Alert.alert(
        'Edit profile picture',
        'Zgjidh një opsion',
        [
          { text: 'Choose from library', onPress: chooseFromLibrary },
          { text: 'Take photo', onPress: takePhoto },
          { text: 'Delete', onPress: deleteImage, style: 'destructive' },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      setSaving(true);

      const parsedWeight = form.pesha
        ? Number(String(form.pesha).replace(',', '.'))
        : null;
      const parsedHeight = form.gjatesia
        ? Number(String(form.gjatesia).replace(',', '.'))
        : null;

      await setDoc(
        doc(db, 'users', user.uid),
        {
          firstName: form.emri,
          lastName: form.mbiemri,
          email: form.emaili,
          gender: form.gjinia,
          weight: parsedWeight,
          height: parsedHeight,
          profileCompleted: true,
          // image ruhet veç nga chooseFromLibrary/takePhoto
        },
        { merge: true }
      );

      await updateProfile(user, {
        displayName: `${form.emri} ${form.mbiemri}`,
      });

      Alert.alert('Sukses', 'Profili u përditësua.');
    } catch (e) {
      console.log('save profile error:', e);
      Alert.alert('Gabim', 'Nuk u ruajtën ndryshimet.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/(auth)/login');
  };

  const linkSocialAccount = async (provider, providerName) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      if (Platform.OS !== 'web') {
        Alert.alert(
          'Info',
          `Lidhja me ${providerName} funksionon vetëm në web.`
        );
        return;
      }

      await linkWithPopup(user, provider);
      Alert.alert('Sukses', `Llogaria u lidh me ${providerName}.`);
    } catch (e) {
      console.log(`link ${providerName} error:`, e);

      if (e.code === 'auth/provider-already-linked') {
        Alert.alert('Info', `${providerName} është veç i lidhur me llogarinë.`);
      } else if (e.code === 'auth/credential-already-in-use') {
        Alert.alert(
          'Gabim',
          `Kjo llogari ${providerName} është e lidhur me një përdorues tjetër.`
        );
      } else if (e.code === 'auth/requires-recent-login') {
        Alert.alert(
          'Gabim',
          'Lidhja kërkon që të kycësh përsëri. Dil dhe hy prapë, pastaj provo përsëri.'
        );
      } else {
        Alert.alert('Gabim', `Nuk u lidh llogaria me ${providerName}.`);
      }
    }
  };

  const handleLinkGoogle = () =>
    linkSocialAccount(new GoogleAuthProvider(), 'Google');

  const handleLinkMicrosoft = () =>
    linkSocialAccount(new OAuthProvider('microsoft.com'), 'Microsoft');

  const handleLinkGitHub = () =>
    linkSocialAccount(new GithubAuthProvider(), 'GitHub');

  const handleLinkFacebook = () =>
    linkSocialAccount(new FacebookAuthProvider(), 'Facebook');

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: COLORS.page }]}>
        <Text style={[styles.loadingText, { color: COLORS.textDark }]}>
          Duke ngarkuar profilin...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: COLORS.page }]}
    >
      <Text style={[styles.title, { color: COLORS.green }]}>
        Profili i përdoruesit
      </Text>

      <TouchableOpacity style={styles.iconCircle} onPress={openImageOptions}>
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            style={{ width: 96, height: 96, borderRadius: 48 }}
          />
        ) : (
          <FontAwesome5 name="user-circle" size={48} color={COLORS.green} />
        )}
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        {[
          ['Emri', 'emri'],
          ['Mbiemri', 'mbiemri'],
          ['Emaili', 'emaili'],
          ['Gjinia', 'gjinia'],
          ['Pesha', 'pesha'],
          ['Gjatësia', 'gjatesia'],
        ].map(([label, key]) => (
          <View key={key} style={styles.row}>
            <Text style={[styles.label, { color: COLORS.textDark }]}>{label}</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: COLORS.cardSoft, color: COLORS.textDark },
              ]}
              value={form[key]}
              onChangeText={text => handleChange(key, text)}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.green }]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={[styles.buttonText, { color: COLORS.page }]}>
          {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 16,
          marginBottom: 8,
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.textDark,
        }}
      >
        Dëshironi të lidheni llogarin tuaj aktuale me:
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          marginBottom: 8,
        }}
      >
        <Pressable style={styles.socialBtn} onPress={handleLinkGoogle}>
          <Image
            source={require('../../assets/icons/google.png')}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}
          />
        </Pressable>

        <Pressable style={styles.socialBtn} onPress={handleLinkMicrosoft}>
          <FontAwesome5 name="microsoft" size={22} color="#0078D4" />
        </Pressable>

        <Pressable style={styles.socialBtn} onPress={handleLinkGitHub}>
          <FontAwesome5 name="github" size={22} color="#000" />
        </Pressable>

        <Pressable style={styles.socialBtn} onPress={handleLinkFacebook}>
          <FontAwesome5 name="facebook" size={22} color="#1877F2" />
        </Pressable>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: COLORS.green }]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: COLORS.textDark }]}>
          Dil nga llogaria
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { fontSize: 18 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F1EFDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  label: { fontWeight: 'bold', width: '25%' },
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: '70%',
    textAlign: 'right',
  },
  button: {
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 12,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: { fontWeight: 'bold' },
});

