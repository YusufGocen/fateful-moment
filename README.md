# Fateful Moment

<img width="9030" height="2688" alt="Group 1" src="https://github.com/user-attachments/assets/04a07448-4658-4bee-a6ba-c55788a0a630" />


Fateful Moment, kullanıcıların tarihî karar senaryolarını deneyimlemesini ve seçimlerinin sonucunu **Karar DNA’sı** profiliyle incelemesini sağlayan React Native / Expo mobil uygulamasıdır.

## Özellikler

- Dikey kullanım için karşılama, üye olma, giriş yapma, form doğrulama ve şifre sıfırlama arayüzleri
- Expo SecureStore ile cihaz içinde güvenli hesap kaydı ve giriş
- Yatay kullanım için senaryo listesi, briefing, simülasyon ve üç karar sorusundan oluşan akış
- Her senaryo için farklı İngilizce soru ve cevap içerikleri
- Profil, avatar, radar grafik, güçlü yönler ve kör noktadan oluşan Karar DNA’sı ekranı
- Oynat, duraklat, önceki ve sonraki parça kontrollerine sahip uygulama içi müzik oynatıcı
- Dikey kimlik doğrulama ekranları ve yatay oyun ekranları için uyumlu arayüz

## Kullanılan Teknolojiler

- Expo SDK 57
- React Native ve TypeScript
- Expo Router
- Expo SecureStore
- Expo Audio
- Expo Screen Orientation
- Expo Linear Gradient
- React Native SVG

## Kurulum

### Gereksinimler

- Node.js
- npm
- Expo Go, Android emülatörü veya iOS Simulator

### Yerelde çalıştırma

```bash
npm install
npx expo start
```

Android’de çalıştırmak için:

```bash
npx expo start --android
```

iOS’ta çalıştırmak için:

```bash
npx expo start --ios
```

Metro önbelleği nedeniyle eski sürüm görünürse:

```bash
npx expo start -c
```

## Android APK Oluşturma

APK, EAS Build kullanılarak oluşturulabilir:

```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
```

`eas.json` içindeki `preview` profilinde `android.buildType: "apk"` ayarı bulunmalıdır.

## Kullanılan AI Araçları ve Yaklaşım

Geliştirme sürecinde OpenAI Codex şu amaçlarla kullanılmıştır:

- Paylaşılan Figma export’larının ve görsel referansların incelenmesi
- Sayfa hiyerarşisi ve navigasyon akışının planlanması
- Expo / React Native arayüz bileşenlerinin ve etkileşimlerinin geliştirilmesi
- Responsive yerleşim, tipografi, durumlar ve buton tasarımlarının iyileştirilmesi
- Senaryo içeriklerinin ve Karar DNA’sı verilerinin yapılandırılması
- Lint, TypeScript ve Android bundle doğrulamalarının yapılması

Yaklaşım olarak görsel referanslar yeniden kullanılabilir React Native bileşenlerine dönüştürüldü. İstenen dikey/yatay ekran davranışı korundu ve gereksiz bir backend bağımlılığı eklenmeden tüm temel etkileşimler cihaz içinde çalışacak şekilde geliştirildi.

## Notlar

- Hesap bilgileri Expo SecureStore kullanılarak yalnızca mevcut cihazda güvenli şekilde saklanır. Cihazlar arası ortak hesaplar ve gerçek şifre sıfırlama e-postaları için backend gerekir.
- Arka plan müzikleri uygulama paketine dahil edilmiştir; çalmak için internet bağlantısı gerekmez.
- Paylaşılan tasarım referanslarında dağıtılabilir bir Figma font dosyası bulunmadığı için sistem fontları kullanılmıştır.

## Doğrulama

```bash
npx expo lint
npx tsc --noEmit
npx expo export --platform android
```
