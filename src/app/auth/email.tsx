import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '@/components/AuthLayout';
import { Field, PrimaryButton } from '@/components/ui';
import { signInWithAccount } from '@/lib/auth';
import { colors } from '@/theme';

const emailPattern = /\S+@\S+\.\S+/;

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [credentialsError, setCredentialsError] = useState('');
  const valid = emailPattern.test(email) && password.length >= 6;
  const emailError = submitted && !emailPattern.test(email) ? 'Please enter a valid email address.' : undefined;
  const passwordError = submitted && password.length < 6 ? 'Password must be at least 6 characters.' : credentialsError || undefined;
  const signIn = async () => {
    setSubmitted(true);
    if (!valid || signingIn) return;
    setSigningIn(true);
    setCredentialsError('');
    try {
      const result = await signInWithAccount(email, password);
      if (result.ok) router.replace('/game/scenarios');
      else setCredentialsError(result.reason === 'not-found' ? 'No account exists for this email. Please sign up.' : 'Incorrect password. Please try again.');
    } catch {
      setCredentialsError('Sign in is unavailable right now. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };
  return <AuthLayout title="Welcome to Fateful Moment" subtitle="Sign in with Email" back={<Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.muted} /></Pressable>}><View style={styles.fields}><Field placeholder="Your email address" keyboardType="email-address" autoCapitalize="none" autoComplete="email" value={email} onChangeText={(value) => { setEmail(value); setCredentialsError(''); }} error={emailError} /><Field placeholder="Your password" secureTextEntry autoComplete="password" value={password} onChangeText={(value) => { setPassword(value); setCredentialsError(''); }} error={passwordError} /><PrimaryButton label={signingIn ? "Signing in..." : "Sign In"} disabled={signingIn} onPress={signIn} /><Pressable accessibilityRole="button" onPress={() => router.push('/auth/reset-password')}><Text style={styles.forgot}>Forgot password?</Text></Pressable></View><Text style={styles.bottom}>No account yet? <Text onPress={() => router.push('/auth/sign-up')} style={styles.link}>Sign up</Text></Text></AuthLayout>;
}
const styles = StyleSheet.create({ back: { position: 'absolute', top: -20, left: 0, height: 42, width: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10192B', borderWidth: 1, borderColor: colors.border }, fields: { gap: 18 }, forgot: { color: colors.cyan, textAlign: 'center', marginTop: 12 }, bottom: { color: colors.muted, textAlign: 'center', marginTop: 60 }, link: { color: colors.cyan, fontWeight: '800', textDecorationLine: 'underline' } });
