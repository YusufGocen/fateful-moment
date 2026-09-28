import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AuthLayout } from '@/components/AuthLayout';
import { OutlineButton, PrimaryButton } from '@/components/ui';
import { colors } from '@/theme';

export default function WelcomeScreen() {
  return <AuthLayout title="Welcome to Fateful Moment" subtitle="Sign in to continue your journey"><View style={styles.actions}><PrimaryButton label="Continue with Email" icon="mail-outline" onPress={() => router.push('/auth/email')} /><View style={styles.or}><View style={styles.line} /><Text style={styles.orText}>OR</Text><View style={styles.line} /></View><OutlineButton label="Continue with Apple" icon="logo-apple" onPress={() => router.replace('/game/scenarios')} /><OutlineButton label="Continue with Google" icon="google" onPress={() => router.replace('/game/scenarios')} /></View><Text style={styles.legal}>By continuing you agree to the <Text style={styles.link}>Terms of Use</Text> and{`\n`}<Text style={styles.link}>Privacy Policy.</Text></Text></AuthLayout>;
}
const styles = StyleSheet.create({ actions: { gap: 14 }, or: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 }, line: { flex: 1, height: 1, backgroundColor: colors.border }, orText: { color: colors.muted, fontSize: 12, fontWeight: '800' }, legal: { color: '#70809B', textAlign: 'center', fontSize: 12, lineHeight: 19, marginTop: 62 }, link: { color: colors.cyan } });
