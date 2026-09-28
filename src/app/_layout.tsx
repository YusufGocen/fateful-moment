import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return <><StatusBar style="light" /><Stack screenOptions={{ headerShown: false, animation: 'fade' }}><Stack.Screen name="index" options={{ orientation: 'portrait' }} /><Stack.Screen name="auth/email" options={{ orientation: 'portrait' }} /><Stack.Screen name="auth/sign-up" options={{ orientation: 'portrait' }} /><Stack.Screen name="auth/reset-password" options={{ orientation: 'portrait' }} /><Stack.Screen name="game/scenarios" options={{ orientation: 'landscape' }} /><Stack.Screen name="game/briefing" options={{ orientation: 'landscape' }} /><Stack.Screen name="game/cinematic" options={{ orientation: 'landscape' }} /><Stack.Screen name="game/decision" options={{ orientation: 'landscape' }} /><Stack.Screen name="game/dna" options={{ orientation: 'landscape' }} /></Stack></>;
}
