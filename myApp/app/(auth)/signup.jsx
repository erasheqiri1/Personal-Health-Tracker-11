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

// ============================
//  Komponent i thjeshtë Dropdown
// ============================
function Dropdown({ placeholder, value, onChange, options, style }) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || '';

  return (
    <View style={style}>
      <Pressable
        style={[s.input, s.dropInput]}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text
          style={value ? s.dropText : s.dropPlaceholder}
          numberOfLines={1}
        >
          {value ? selectedLabel : placeholder}
        </Text>
        <FontAwesome5
          name={open ? 'chevron-up' : 'chevron-down'}
          size={14}
          color={COLORS.green}
        />
      </Pressable>

      {open && (
        <View style={s.dropList}>
          <ScrollView style={{ maxHeight: 180 }}>
            {options.map((opt) => (
              <Pressable
                key={opt.value}
                style={s.dropItem}
                onPress={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <Text style={s.dropItemText}>{opt.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

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

  // opsionet
  const genderOptions = [
    { label: 'Mashkull', value: 'male' },
    { label: 'Femër', value: 'female' },
  ];

  const weightOptions = Array.from({ length: 171 }, (_, i) => 30 + i).map(
    (w) => ({ label: `${w} kg`, value: String(w) })
  );
  const heightOptions = Array.from({ length: 101 }, (_, i) => 130 + i).map(
    (h) => ({ label: `${h} cm`, value: String(h) })
  );

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

    if (!gender) {
      setError('Ju lutem zgjidhni gjininë.');
      return false;
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

      await setDoc(doc(db, 'users', userAccount.uid), {
        firstName,
        lastName,
        email: email.trim(),
        gender,
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

        {/* Gjinia */}
        <Dropdown
          placeholder="Gjinia"
          value={gender}
          onChange={setGender}
          options={genderOptions}
          style={{ marginBottom: 12 }}
        />

        {/* Pesha & Gjatësia */}
        <View style={s.row}>
          <Dropdown
            placeholder="Pesha (kg)"
            value={weight}
            onChange={setWeight}
            options={weightOptions}
            style={[s.col, { marginRight: 8 }]}
          />

          <Dropdown
            placeholder="Gjatësia (cm)"
            value={height}
            onChange={setHeight}
            options={heightOptions}
            style={[s.col, { marginLeft: 8 }]}
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
          <Pressable onPress={() => router.push('/(auth)/login')}>
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
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  col: {
    flex: 1,
  },

  // dropdown styles
  dropInput: {
    justifyContent: 'space-between',
  },
  dropText: {
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  dropPlaceholder: {
    color: '#8b8b8b',
    flex: 1,
    marginRight: 8,
  },
  dropList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 4,
    overflow: 'hidden',
    elevation: 3,
  },
  dropItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropItemText: {
    fontSize: 14,
    color: '#333',
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
