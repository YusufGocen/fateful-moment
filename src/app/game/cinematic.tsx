import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';

const videoPage = require('../../../assets/video-page.png');

export default function CinematicScreen() {
  const { id = 'iraq-war' } = useLocalSearchParams<{ id: string }>();
  const continueToQuestions = () => router.replace({ pathname: '/game/decision', params: { id } });
  useEffect(() => { const timeout = setTimeout(() => router.replace({ pathname: '/game/decision', params: { id } }), 2500); return () => clearTimeout(timeout); }, [id]);
  return <ImageBackground source={videoPage} resizeMode="cover" style={styles.screen}>
    <Pressable accessibilityRole="button" accessibilityLabel="Skip video" onPress={continueToQuestions} style={styles.skip} />
    <Pressable accessibilityRole="button" accessibilityLabel="Back to scenario briefing" onPress={() => router.back()} style={styles.back} />
  </ImageBackground>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#020617' }, skip: { position: 'absolute', right: 0, bottom: 0, width: '18%', height: '22%' }, back: { position: 'absolute', left: 0, top: 0, width: '10%', height: '18%' } });
