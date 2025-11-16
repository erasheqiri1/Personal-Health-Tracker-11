import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  bg: '#F7F2DF',
  inputBg: '#F1EFDF',
  border: '#D7D2B8',
  textDark: '#1F3D26',
};

const ADMIN_EMAIL = 'test1@gmail.com';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectAfterLogin = (user) => {
    const userEmail = (user?.email || '').toLowerCase();
    const adminEmail = ADMIN_EMAIL.toLowerCase();

    if (userEmail === adminEmail) {
    //kur eshte admin
      router.replace('/(admin)/dashboard');
    } else {
      // kur eshte user normal
      router.replace('/(tabs)/dashboard');
    }
  };

    const handleEmailLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Ju lutem shkruani email-in dhe fjalëkalimin.');
      return;
    }

    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = cred.user;
      redirectAfterLogin(user);
    } catch (e) {
      console.log('Login error:', e.code, e.message);

      if (
        e.code === 'auth/user-not-found' ||
        e.code === 'auth/invalid-credential'
      ) {
        setError('Ky përdorues nuk ekziston.');
      } else if (e.code === 'auth/wrong-password') {
        setError('Email ose fjalëkalim i pasaktë.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Email i pavlefshëm.');
      } else {
        setError('Gabim gjatë kyçjes.');
      }
    } finally {
      setLoading(false);
    }
  };

  
  //profileCompleted
  const socialLoginWithProfileCheck = async (provider, providerName) => {
    setError('');

    if (Platform.OS !== 'web') {
      Alert.alert(
        `${providerName} login`,
        `Login me ${providerName} në pajisje mobile nuk është implementuar.`
      );
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists() || snap.data().profileCompleted !== true) {
        const displayName = user.displayName || '';
        const [firstName, ...rest] = displayName.split(' ');
        const lastName = rest.join(' ');

        router.replace({
          pathname: '/(auth)/signup',
          params: {
            mode: 'social',
            firstName: firstName || '',
            lastName: lastName || '',
            email: user.email || '',
          },
        });
      } else {
        // nese ekziston dhe eshte i plotësuar → direkt në app
        redirectAfterLogin(user);
      }
    } catch (e) {
      console.log(`${providerName} login error:`, e);

      if (e.code === 'auth/account-exists-with-different-credential') {
        setError(
          'Ky email është regjistruar me metodë tjetër (p.sh. email/password).'
        );
      } else {
        setError(`Nuk u arrit login me ${providerName}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () =>
    socialLoginWithProfileCheck(new GoogleAuthProvider(), 'Google');

  const handleGitHubLogin = () =>
    socialLoginWithProfileCheck(new GithubAuthProvider(), 'GitHub');

  const handleMicrosoftLogin = () =>
    socialLoginWithProfileCheck(new OAuthProvider('microsoft.com'), 'Microsoft');

  const handleFacebookLogin = () =>
    socialLoginWithProfileCheck(new FacebookAuthProvider(), 'Facebook');


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.container}>
            <View style={s.logoWrap}>
            <RunIcon />
            <Text style={s.appTitle}>
              PERSONAL{'\n'}HEALTH{'\n'}TRACKER
            </Text>
          </View>

     
          <View style={s.form}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#7C8A7F"
              style={s.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              returnKeyType="next"
            />

            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Fjalëkalimi"
                placeholderTextColor="#7C8A7F"
                style={[s.input, { paddingRight: 48 }]}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setShowPass((v) => !v)}
                style={s.eyeBtn}
                hitSlop={8}
              >
                <FontAwesome
                  name={showPass ? 'eye-slash' : 'eye'}
                  size={18}
                  color={COLORS.green}
                />
              </Pressable>
            </View>

            {error ? <Text style={s.error}>{error}</Text> : null}

            <Pressable
              style={({ pressed }) => [
                s.primaryBtn,
                (pressed || loading) && { opacity: 0.9 },
              ]}
              onPress={handleEmailLogin}
              disabled={loading}
            >
              <Text style={s.primaryTxt}>
                {loading ? 'Duke u kyçur...' : 'HYR'}
              </Text>
            </Pressable>

            <View style={s.dividerRow}>
              <View style={s.divider} />
              <Text style={s.dividerText}>or continue</Text>
              <View style={s.divider} />
            </View>

            <View style={s.socialRow}>
              <Pressable style={s.socialBtn} onPress={handleGoogleLogin}>
                <Image
                  source={require('../../assets/icons/google.png')}
                  style={{ width: 22, height: 22, resizeMode: 'contain' }}
                />
              </Pressable>

              <Pressable style={s.socialBtn} onPress={handleMicrosoftLogin}>
                <FontAwesome5 name="microsoft" size={20} color="#0078D4" />
              </Pressable>

              <Pressable style={s.socialBtn} onPress={handleGitHubLogin}>
                <FontAwesome5 name="github" size={20} color="#000000" />
              </Pressable>

              <Pressable style={s.socialBtn} onPress={handleFacebookLogin}>
                <FontAwesome5 name="facebook" size={20} color="#1877F2" />
              </Pressable>
            </View>
          </View>

          <Text style={s.footer}>
            S’keni një llogari?{' '}
            <Text
              style={s.footerLink}
              onPress={() => router.push('/(auth)/signup')}
            >
              Regjistrohu
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function RunIcon() {
  return (
    <View style={s.runCircle}>
      <FontAwesome5 name="running" size={56} color="#FFFFFF" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appTitle: {
    textAlign: 'center',
    color: '#1F3D26',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: 28,
    marginTop: 10,
  },
  form: {
    width: '100%',
    marginTop: 4,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 12,
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  error: {
    color: '#C0392B',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  primaryBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryTxt: {
    color: 'white',
    fontWeight: '800',
    letterSpacing: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 12,
    color: '#7C8A7F',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 4,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 10,
    color: COLORS.green,
  },
  footerLink: {
    fontWeight: '800',
    textDecorationLine: 'underline',
    color: COLORS.green,
  },
  runCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
