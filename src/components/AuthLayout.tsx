import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme';

const logo = require('../../assets/fateful-symbol.png');

export function AuthLayout({ title, subtitle, children, back }: { title: string; subtitle: string; children: React.ReactNode; back?: React.ReactNode }) {
  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView style={styles.safe} behavior={Platform.select({ ios: 'padding', android: undefined })}><View style={styles.content}>{back}<Image source={logo} style={styles.logo} resizeMode="contain" /><Text style={styles.title}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text>{children}</View></KeyboardAvoidingView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, content: { flex: 1, paddingHorizontal: 28, alignItems: 'stretch', justifyContent: 'center' }, logo: { width: 130, height: 130, alignSelf: 'center', marginBottom: 26 }, title: { color: colors.text, fontWeight: '800', fontSize: 24, textAlign: 'center' }, subtitle: { color: colors.muted, fontSize: 16, textAlign: 'center', marginTop: 8, marginBottom: 30 } });
