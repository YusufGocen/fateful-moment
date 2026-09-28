import { Ionicons } from '@expo/vector-icons';
import { setAudioModeAsync, setIsAudioActiveAsync, useAudioPlaylist, useAudioPlaylistStatus } from 'expo-audio';
import { router } from 'expo-router';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '@/theme';

type MenuItem = 'Scenarios' | 'DNA' | 'Settings';

const historicalTracks = [
  { title: 'ARCHIVE AMBIENCE', source: require('../../assets/archive-ambience.mp3') },
  { title: 'CHRONICLE NOCTURNE', source: require('../../assets/chronicle-nocturne.mp3') },
];
const historicalSources = historicalTracks.map((track) => track.source);

export function GameLayout({ children, active = 'Scenarios' }: { children: ReactNode; active?: MenuItem; onBack?: () => void }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const hasInitializedPlaylist = useRef(false);
  const playlist = useAudioPlaylist({ sources: historicalSources, loop: 'all' });
  const playlistStatus = useAudioPlaylistStatus(playlist);
  useEffect(() => {
    if (hasInitializedPlaylist.current) return;
    hasInitializedPlaylist.current = true;
    setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'doNotMix' })
      .then(() => playlist.play())
      .catch(() => undefined);
  }, [playlist]);
  const selectMenuItem = (item: MenuItem) => { setMenuVisible(false); if (item === 'Scenarios') router.replace('/game/scenarios'); if (item === 'DNA') router.replace('/game/dna'); };
  const togglePlayback = async () => {
    if (musicEnabled) {
      playlist.pause();
      await setIsAudioActiveAsync(false);
      setMusicEnabled(false);
      return;
    }
    await setIsAudioActiveAsync(true);
    await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'doNotMix' });
    playlist.play();
    setMusicEnabled(true);
  };
  const changeTrack = async (direction: 'next' | 'previous') => {
    await setIsAudioActiveAsync(true);
    if (direction === 'next') playlist.next(); else playlist.previous();
    playlist.play();
    setMusicEnabled(true);
  };
  const track = historicalTracks[playlistStatus.currentIndex] ?? historicalTracks[0];
  return <SafeAreaView style={styles.safe} edges={['left', 'right']}><View style={styles.main}><View style={styles.top}><Pressable accessibilityRole="button" accessibilityLabel="Open navigation menu" onPress={() => setMenuVisible(true)} hitSlop={12} style={styles.menuButton}><Ionicons name="menu" size={25} color={colors.text} /></Pressable><View style={styles.player}><Pressable accessibilityRole="button" accessibilityLabel="Previous track" onPress={() => { void changeTrack('previous'); }}><Ionicons name="play-back" size={14} color={colors.muted} /></Pressable><Pressable accessibilityRole="button" accessibilityLabel={musicEnabled ? 'Pause music' : 'Play music'} onPress={() => { void togglePlayback(); }} style={styles.play}><Ionicons name={musicEnabled ? 'pause' : 'play'} size={14} color={colors.cyan} /></Pressable><Pressable accessibilityRole="button" accessibilityLabel="Next track" onPress={() => { void changeTrack('next'); }}><Ionicons name="play-forward" size={14} color={colors.muted} /></Pressable><View style={styles.track}><Text style={styles.standby}>{musicEnabled ? 'PLAYING' : 'PAUSED'}</Text><Text style={styles.trackName}>{track.title}</Text></View><Ionicons name="musical-notes-outline" size={19} color={colors.muted} style={styles.musicIcon} /></View></View>{children}{menuVisible && <View style={styles.menuLayer}><Pressable onPress={() => setMenuVisible(false)} style={styles.backdrop} /><View style={styles.menuCard}>{(['Scenarios', 'DNA', 'Settings'] as MenuItem[]).map((item) => <Pressable key={item} accessibilityRole="button" onPress={() => selectMenuItem(item)} style={[styles.menuRow, active === item && styles.menuRowActive]}><Ionicons name={item === 'Scenarios' ? 'albums-outline' : item === 'DNA' ? 'analytics-outline' : 'settings-outline'} size={18} color={active === item ? colors.cyan : colors.muted} /><Text style={[styles.menuText, active === item && styles.menuTextActive]}>{item}</Text></Pressable>)}</View></View>}</View></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, main: { flex: 1 }, top: { height: 55, borderBottomWidth: 1, borderBottomColor: colors.border, paddingLeft: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, menuButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' }, player: { alignSelf: 'stretch', flexShrink: 0, paddingLeft: 28, paddingRight: 12, marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#0D1528', borderWidth: 1, borderRightWidth: 0, borderColor: '#263650', borderTopLeftRadius: 42, borderBottomLeftRadius: 42 }, play: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#007D9B', alignItems: 'center', justifyContent: 'center' }, track: { marginLeft: 8, minWidth: 0 }, standby: { color: '#008BAA', fontSize: 10, fontWeight: '800', letterSpacing: 2 }, trackName: { color: colors.text, fontSize: 12, fontWeight: '800', marginTop: 2 }, musicIcon: { marginLeft: 2 }, menuLayer: { ...StyleSheet.absoluteFill, zIndex: 20 }, backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(2,6,23,0.52)' }, menuCard: { position: 'absolute', top: 56, left: 20, width: 190, padding: 8, borderRadius: radius.md, backgroundColor: '#0B1427', borderWidth: 1, borderColor: '#29415E', shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 16, elevation: 12 }, menuRow: { height: 46, flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 12, borderRadius: 10 }, menuRowActive: { backgroundColor: '#063344' }, menuText: { color: colors.muted, fontSize: 13, fontWeight: '700' }, menuTextActive: { color: colors.cyan } });
