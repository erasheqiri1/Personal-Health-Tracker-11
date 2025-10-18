import React, { useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router, useNavigation } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false, title: '' });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F2DF' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.container}>
          {/* LOGO */}
          <View style={s.logoWrap}>
            <RunIcon />
            <Text style={s.appTitle}>PERSONAL{'\n'}HEALTH{'\n'}TRACKER</Text>
          </View>

          {/* INPUTS */}
          <View style={s.form}>
            <TextInput
              placeholder="Përdoruesi"
              placeholderTextColor="#7C8A7F"
              style={s.input}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Fjalëkalimi"
                placeholderTextColor="#7C8A7F"
                style={[s.input, { paddingRight: 48 }]}
                secureTextEntry={!showPass}
              />
              <Pressable
                onPress={() => setShowPass(v => !v)}
                style={s.eyeBtn}
                hitSlop={8}
              >
                <FontAwesome
                  name={showPass ? 'eye-slash' : 'eye'}
                  size={18}
                  color="#355E3B"
                />
              </Pressable>
            </View>

            {/* REMEMBER ME */}
            <View style={s.rememberWrap}>
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? '#355E3B' : undefined}
              />
              <Text style={s.rememberTxt}>Më mbaj mend</Text>
            </View>

            <Pressable
              style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.9 }]}
              onPress={() => router.push('/auth/signup')}
            >
              <Text style={s.primaryTxt}>HYR</Text>
            </Pressable>
          </View>

          {/* FOOTER LINK */}
          <Text style={s.footer}>
            S’keni një llogari?{' '}
            <Text style={s.footerLink} onPress={() => router.push('/auth/signup')}>
              Regjistrohu
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Ikona “running” në rreth të gjelbër (e zmadhuar)
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
    gap: 12,
  },

  // Ngritje më e madhe e logos
  logoWrap: {
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ translateY: -80 }], // më lart se më parë
  },

  appTitle: {
    textAlign: 'center',
    color: '#1F3D26',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: 30,
    marginTop: 8,
  },

  form: { width: '100%', gap: 12 },

  input: {
    backgroundColor: '#F1EFDF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#D7D2B8',
    fontSize: 15,
    color: '#1F3D26',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  eyeBtn: { position: 'absolute', right: 14, top: 14 },

  // REMEMBER ME
  rememberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  rememberTxt: {
    color: '#355E3B',
    fontSize: 14,
    fontWeight: '500',
  },

  primaryBtn: {
    backgroundColor: '#355E3B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryTxt: { color: 'white', fontWeight: '800', letterSpacing: 1 },

  footer: { marginTop: 10, color: '#355E3B' },
  footerLink: {
    fontWeight: '800',
    textDecorationLine: 'underline',
    color: '#355E3B',
  },

  runCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#355E3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
