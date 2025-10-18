import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, Platform, ActionSheetIOS
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // ← përdorim të njëjtën ikonë si te Login
import { router } from 'expo-router';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [username,  setUsername]  = useState('');
  const [password,  setPassword]  = useState('');
  const [gender,    setGender]    = useState('');
  const [weight,    setWeight]    = useState('');
  const [height,    setHeight]    = useState('');
  const [agreed,    setAgreed]    = useState(false);

  // për peshë/gjatësi
  const weights = Array.from({ length: 171 }, (_, i) => String(i + 30));   // 30–200 kg
  const heights = Array.from({ length: 111 }, (_, i) => String(i + 120));  // 120–230 cm

  const showGenderSelect = () => {
    const options = ['Anulo', 'Femër', 'Mashkull'];
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { title: 'Zgjidh gjininë', options, cancelButtonIndex: 0 },
        (i) => {
          if (i === 1) setGender('Femër');
          if (i === 2) setGender('Mashkull');
        }
      );
    } else {
      Alert.alert('Zgjidh gjininë', '', [
        { text: 'Femër', onPress: () => setGender('Femër') },
        { text: 'Mashkull', onPress: () => setGender('Mashkull') },
        { text: 'Anulo', style: 'cancel' },
      ]);
    }
  };

  const showWeightSelect = () => {
    const opts = weights.map(w => ({ text: w, onPress: () => setWeight(w) }));
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { title: 'Zgjidh peshën', options: ['Anulo', ...weights], cancelButtonIndex: 0 },
        (i) => {
          if (i > 0) setWeight(weights[i - 1]);
        }
      );
    } else {
      // Android Alert lejon deri ~3 butona – po japim disa opsione të shpejta
      Alert.alert('Zgjidh peshën (kg)', '', [
        ...opts.slice(0, 5),
        { text: 'Tjetër…', style: 'cancel' },
      ]);
    }
  };

  const showHeightSelect = () => {
    const opts = heights.map(h => ({ text: h, onPress: () => setHeight(h) }));
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { title: 'Zgjidh gjatësinë', options: ['Anulo', ...heights], cancelButtonIndex: 0 },
        (i) => {
          if (i > 0) setHeight(heights[i - 1]);
        }
      );
    } else {
      Alert.alert('Zgjidh gjatësinë (cm)', '', [
        ...opts.slice(0, 5),
        { text: 'Tjetër…', style: 'cancel' },
      ]);
    }
  };

  const onSave = () => {
    if (!agreed) {
      Alert.alert('Kujdes', 'Duhet të pranoni Terms and Conditions.');
      return;
    }
    router.replace('/(tabs)/dashboard');
  };

  return (
    <ScrollView contentContainerStyle={s.wrap} keyboardShouldPersistTaps="handled">
      {/* HEADER me ikonë + titull (IKONA si te Login) */}
      <View style={s.brand}>
        <View style={s.runCircle}>
          <FontAwesome5 name="running" size={56} color="#FFFFFF" />
        </View>
        <Text style={s.brandTitle}>Personal Health Tracker</Text>
      </View>

      <Text style={s.h1}>REGJISTROHU</Text>

      <TextInput placeholder="Emri"      style={s.input} value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="Mbiemri"   style={s.input} value={lastName}  onChangeText={setLastName} />
      <TextInput placeholder="Username"  style={s.input} value={username}  onChangeText={setUsername} autoCapitalize="none" />
      <TextInput placeholder="Fjalëkalimi" style={s.input} value={password} onChangeText={setPassword} secureTextEntry />

      {/* Gjinia */}
      <Text style={s.label}>Gjinia</Text>
      <Pressable style={[s.input, s.selectLike]} onPress={showGenderSelect}>
        <Text style={gender ? s.inputValue : s.placeholder}>
          {gender || 'Zgjidh gjininë'}
        </Text>
      </Pressable>

      {/* Pesha / Gjatësia */}
      <View style={s.row}>
        <View style={[s.col, { marginRight: 8 }]}>
          <Text style={s.label}>Pesha (kg)</Text>
          <Pressable style={[s.input, s.selectLike]} onPress={showWeightSelect}>
            <Text style={weight ? s.inputValue : s.placeholder}>
              {weight || 'Zgjidh peshën'}
            </Text>
          </Pressable>
        </View>

        <View style={[s.col, { marginLeft: 8 }]}>
          <Text style={s.label}>Gjatësia (cm)</Text>
          <Pressable style={[s.input, s.selectLike]} onPress={showHeightSelect}>
            <Text style={height ? s.inputValue : s.placeholder}>
              {height || 'Zgjidh gjatësinë'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Checkbox */}
      <Pressable style={s.checkboxRow} onPress={() => setAgreed(!agreed)}>
        <View style={[s.checkbox, agreed && s.checkboxOn]}>
          {agreed ? <Text style={s.checkmark}>✓</Text> : null}
        </View>
        <Text style={s.checkboxTxt}>I agree with Terms and Conditions</Text>
      </Pressable>

      {/* Ruaj */}
      <Pressable style={s.primary} onPress={onSave}>
        <Text style={s.primaryTxt}>RUAJ</Text>
      </Pressable>

      {/* Login link */}
      <View style={s.loginRow}>
        <Text style={s.loginTxt}>Tashmë keni një llogari? </Text>
        <Pressable onPress={() => router.push('/auth/login')}>
          <Text style={s.loginLink}>Hyr</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  wrap: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F9F6E8' },

  // Header/brand (shtuam runCircle për ikonën si te Login)
  brand: { alignItems: 'center', marginBottom: 24 },
  runCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#355E3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  brandTitle: {
    marginTop: 8, fontSize: 18, fontWeight: '800', color: '#355E3B',
    letterSpacing: 0.5, textTransform: 'uppercase',
  },

  h1: { fontSize: 22, color: '#355E3B', fontWeight: '800', marginBottom: 16 },
  input: { backgroundColor: '#F1EFDF', borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#D7D2B8' },
  label: { fontWeight: '700', color: '#355E3B', marginBottom: 6, marginTop: 4 },

  // select fields
  selectLike: { justifyContent: 'center' },
  placeholder: { color: '#9aa09a' },
  inputValue: { color: '#355E3B', fontWeight: '600' },

  row: { flexDirection: 'row' },
  col: { flex: 1 },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: '#355E3B', backgroundColor: '#F1EFDF', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checkboxOn: { backgroundColor: '#355E3B' },
  checkmark: { color: 'white', fontWeight: '900', lineHeight: 18 },
  checkboxTxt: { color: '#355E3B', fontWeight: '600' },

  primary: { backgroundColor: '#355E3B', padding: 14, borderRadius: 10, alignItems: 'center' },
  primaryTxt: { color: 'white', fontWeight: '700', letterSpacing: 1 },

  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  loginTxt: { color: '#5a5a5a' },
  loginLink: { color: '#355E3B', fontWeight: '800' },
});
