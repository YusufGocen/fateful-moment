import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '@/components/AuthLayout';
import { Field, PrimaryButton } from '@/components/ui';
import { registerAccount } from '@/lib/auth';
import { colors } from '@/theme';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [accountError, setAccountError] = useState('');
  const [saving, setSaving] = useState(false);
  const passwordRules = [
    { label: 'Must be at least 8 characters long', met: password.length >= 8 },
    { label: 'Must contain at least 1 uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Must contain at least 1 lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Must contain at least 1 digit', met: /\d/.test(password) },
  ];
  const passwordValid = passwordRules.every((rule) => rule.met);
  const valid = name.trim().length >= 3 && /\S+@\S+\.\S+/.test(email) && passwordValid;
  const showPasswordRules = passwordFocused || password.length > 0 || submitted;
  const showNameError = (touched.name || submitted) && name.trim().length < 3;
  const showEmailError = (touched.email || submitted) && !/\S+@\S+\.\S+/.test(email);
  const showPasswordError = (touched.password || submitted) && !passwordValid;
  const createAccount = async () => {
    setSubmitted(true);
    if (!valid || saving) return;
    setSaving(true);
    setAccountError('');
    try {
      const result = await registerAccount({ name, email, password });
      if (result.ok) router.replace('/auth/email');
      else setAccountError('This email is already registered. Please sign in.');
    } catch {
      setAccountError('Your account could not be created. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return <AuthLayout title="Create your Fateful Moment Account" subtitle="" back={<Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={21} color={colors.muted} /></Pressable>}><View style={styles.fields}><Field placeholder="Full Name" value={name} onChangeText={setName} onBlur={() => setTouched((value) => ({ ...value, name: true }))} error={showNameError ? 'Enter at least 3 characters.' : undefined} /><Field placeholder="Your email address" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={(value) => { setEmail(value); setAccountError(''); }} onBlur={() => setTouched((value) => ({ ...value, email: true }))} error={showEmailError ? 'Please enter a valid email address.' : accountError || undefined} /><View style={styles.passwordSection}><Field placeholder="Your password" secureTextEntry value={password} onChangeText={setPassword} onFocus={() => setPasswordFocused(true)} onBlur={() => { setPasswordFocused(false); setTouched((value) => ({ ...value, password: true })); }} error={showPasswordError ? 'Password must meet all the requirements below.' : undefined} />{showPasswordRules && <View style={styles.requirements}>{passwordRules.map((rule) => <View key={rule.label} style={styles.requirement}><Ionicons name="checkmark-circle" size={16} color={rule.met ? colors.cyan : '#8FA0BA'} /><Text style={[styles.requirementText, rule.met && styles.requirementTextMet]}>{rule.label}</Text></View>)}</View>}</View><PrimaryButton label={saving ? "Creating account..." : "Sign up"} disabled={!valid || saving} onPress={createAccount} /></View><Text style={styles.bottom}>Already have an account? <Text onPress={() => router.replace('/auth/email')} style={styles.link}>Sign in</Text></Text></AuthLayout>;
}
const styles = StyleSheet.create({ back: { position: 'absolute', top: -20, left: 0, height: 42, width: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#10192B', borderWidth: 1, borderColor: colors.border }, fields: { gap: 16 }, passwordSection: { gap: 7 }, requirements: { gap: 6, marginTop: -2, paddingLeft: 4 }, requirement: { flexDirection: 'row', alignItems: 'center', gap: 8 }, requirementText: { color: '#8FA0BA', fontSize: 12, lineHeight: 16 }, requirementTextMet: { color: colors.text }, bottom: { color: colors.muted, textAlign: 'center', marginTop: 30 }, link: { color: colors.cyan, fontWeight: '800', textDecorationLine: 'underline' } });
