import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '@/components/AuthLayout';
import { Field, PrimaryButton } from '@/components/ui';
import { colors } from '@/theme';

const emailPattern = /\S+@\S+\.\S+/;

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const emailValid = emailPattern.test(email);

  if (sent) {
    return <View style={styles.successScreen}>
      <View style={styles.successContent}>
        <View style={styles.successIcon}><Ionicons name="checkmark" size={31} color={colors.cyan} /></View>
        <Text style={styles.successTitle}>Check Your Email</Text>
        <Text style={styles.successCopy}>Password reset instructions were sent to <Text style={styles.email}>{email}</Text></Text>
        <PrimaryButton label="Back to Sign In" onPress={() => router.replace('/auth/email')} style={styles.successButton} />
      </View>
    </View>;
  }

  return <AuthLayout title="Reset your password" subtitle="Enter your email to receive a reset link" back={<Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.muted} /></Pressable>}>
    <View style={styles.form}>
      <Field placeholder="Your email address" keyboardType="email-address" autoCapitalize="none" autoComplete="email" value={email} onChangeText={setEmail} onBlur={() => setTouched(true)} error={touched && !emailValid ? 'Please enter a valid email address.' : undefined} />
      <PrimaryButton label="Send Reset Link" disabled={!emailValid} onPress={() => setSent(true)} />
    </View>
  </AuthLayout>;
}

const styles = StyleSheet.create({
  back: { position: 'absolute', top: -20, left: 0, height: 42, width: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10192B', borderWidth: 1, borderColor: colors.border },
  form: { gap: 26 },
  successScreen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 28, justifyContent: 'center' },
  successContent: { alignItems: 'center', marginTop: -16 },
  successIcon: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#06445A', alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  successTitle: { color: colors.text, fontSize: 26, fontWeight: '800', includeFontPadding: false },
  successCopy: { color: colors.muted, fontSize: 16, textAlign: 'center', lineHeight: 25, marginTop: 12 },
  email: { color: colors.text, fontWeight: '800' },
  successButton: { alignSelf: 'stretch', width: '100%', marginTop: 34 },
});
