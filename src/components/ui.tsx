import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useState } from 'react';
import { Platform, Pressable, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, radius } from '@/theme';

export function PrimaryButton({ label, onPress, disabled, style, icon }: { label: string; onPress?: () => void; disabled?: boolean; style?: StyleProp<ViewStyle>; icon?: keyof typeof Ionicons.glyphMap }) {
  return <Pressable disabled={disabled} onPress={onPress} style={style}><LinearGradient colors={disabled ? ['#062334', '#072035'] : ['#004256', '#00A6C4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.button, disabled && styles.disabled]}><View style={styles.buttonContent}>{icon && <Ionicons name={icon} size={22} color={colors.cyan} />}<Text style={styles.buttonText}>{label}</Text></View></LinearGradient></Pressable>;
}

export function OutlineButton({ label, onPress, icon }: { label: string; onPress?: () => void; icon?: keyof typeof Ionicons.glyphMap | 'google' }) {
  return <Pressable onPress={onPress} style={styles.outline}>{icon === 'google' ? <GoogleIcon /> : icon && <Ionicons name={icon} color={colors.text} size={20} />}<Text style={styles.outlineText}>{label}</Text></Pressable>;
}

export function Field({ error, onFocus, onBlur, secureTextEntry, ...props }: TextInputProps & { error?: string }) {
  const [focused, setFocused] = useState(false); const [passwordVisible, setPasswordVisible] = useState(false); const passwordField = Boolean(secureTextEntry);
  return <View><View style={[styles.fieldWrap, focused && styles.fieldFocused, Boolean(error) && styles.fieldError]}><TextInput placeholderTextColor="#71829F" style={[styles.field, passwordField && styles.fieldWithToggle]} secureTextEntry={passwordField && !passwordVisible} onFocus={(event) => { setFocused(true); onFocus?.(event); }} onBlur={(event) => { setFocused(false); onBlur?.(event); }} {...props} />{passwordField && <Pressable accessibilityRole="button" accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'} onPress={() => setPasswordVisible((value) => !value)} style={styles.passwordToggle}><Ionicons name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={22} color="#71829F" /></Pressable>}</View>{error && <Text style={styles.error}>{error}</Text>}</View>;
}

function GoogleIcon() { return <Svg width="20" height="20" viewBox="0 0 24 24"><Path fill="#4285F4" d="M21.35 12.2c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.51h3.15c1.84-1.7 2.9-4.2 2.9-7.28Z" /><Path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.15-2.51c-.87.59-1.99.94-3.3.94-2.54 0-4.7-1.72-5.47-4.03H5.28v2.59A9.75 9.75 0 0 0 12 21.7Z" /><Path fill="#FBBC05" d="M6.53 13.75A5.87 5.87 0 0 1 6.22 12c0-.61.11-1.2.31-1.75V7.66H3.28A9.72 9.72 0 0 0 2.25 12c0 1.56.37 3.04 1.03 4.34l3.25-2.59Z" /><Path fill="#EA4335" d="M12 6.22c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.83 3.3 14.63 2.3 12 2.3a9.75 9.75 0 0 0-8.72 5.36l3.25 2.59c.77-2.31 2.93-4.03 5.47-4.03Z" /></Svg>; }

export function HudLabel({ children }: { children: ReactNode }) { return <Text style={styles.hud}>{children}</Text>; }

const styles = StyleSheet.create({
  button: { minHeight: 56, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#15758A' }, buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  disabled: { opacity: 0.55 }, buttonText: { color: colors.cyan, fontSize: 16, fontWeight: '800', includeFontPadding: false },
  outline: { minHeight: 56, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' },
  outlineText: { color: colors.text, fontSize: 16, fontWeight: '700' },
  fieldWrap: { height: 56, backgroundColor: '#111A2C', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center' }, fieldFocused: { borderColor: colors.cyan }, field: { flex: 1, height: '100%', color: colors.text, paddingHorizontal: 16, fontSize: 16, includeFontPadding: false }, fieldWithToggle: { paddingRight: 4 }, passwordToggle: { height: 54, width: 48, alignItems: 'center', justifyContent: 'center' },
  fieldError: { borderColor: colors.red }, error: { color: colors.red, marginTop: 6, fontSize: 12 },
  hud: { color: colors.cyan, fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }), fontWeight: '700', fontSize: 11, letterSpacing: 0.7, textTransform: 'uppercase', includeFontPadding: false },
});
