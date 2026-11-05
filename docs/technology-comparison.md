# Porównanie technologii: React Native, Flutter, NativeScript

Kontekst: projekt MOB-027 ChorePlanner, czyli aplikacja CRUD z lokalną bazą, formularzami i obliczeniem terminu. Dostęp do źródeł: 2026-11-05.

Oznaczenia: **[F]** fakt z dokumentacji, **[O]** moja ocena.

## Kryteria

| Kryterium | React Native | Flutter | NativeScript |
|---|---|---|---|
| 1. Język | JavaScript/TypeScript z JSX i Reactem [F] | Dart [F] | JavaScript/TypeScript, opcjonalnie z Angular, Vue, React, Solid lub Svelte [F] |
| 2. Renderowanie UI | Komponenty React mapowane na natywne widoki platformy (renderer Fabric) [F] | Własny silnik Impeller rysuje cały interfejs; natywne kontrolki nie są używane [F] | Natywne widoki platformy tworzone z poziomu JS [F] |
| 3. Dostęp do natywnych API | Przez moduły natywne (TurboModules, JSI) albo gotowe biblioteki, np. Expo SDK [F] | Przez platform channels i pakiety pub.dev [F] | Bezpośrednio z JS: runtime udostępnia całe API Androida i iOS bez pisania mostków [F] |
| 4. Android / iOS | Oba; Expo SDK 58: Android 7+, iOS 16.4+ [F]. Build iOS bez Maca przez EAS Build [F] | Oba; build iOS wymaga macOS lub usługi CI z macOS [F] | Oba (oraz visionOS); build iOS wymaga macOS [F] |
| 5. Narzędzia | Expo CLI, Expo Go, Metro, React Native DevTools, `expo-doctor` [F] | `flutter` CLI, `flutter doctor`, DevTools, hot reload [F] | `ns` CLI, `ns doctor`, hot module replacement [F] |
| 6. Testowanie | Jest, React Native Testing Library; E2E: Detox, Maestro, Appium [F] | `flutter_test` (unit, widget), `integration_test`, patrol [F] | `ns test` z Karma i Jasmine/Mocha/QUnit; testy uruchamiane na urządzeniu [F] |
| 7. Ekosystem | npm i ekosystem React, wsparcie Meta i Expo [F]; najwięcej bibliotek do typowych zadań (SQLite, nawigacja, formularze) [O] | pub.dev, wsparcie Google [F]; bogaty zestaw widżetów w samym SDK [O] | Mniejszy ekosystem, rozwój głównie przez społeczność [F]; mało pluginów do niszowych zadań [O] |
| 8. Wydajność | Nowa architektura (JSI) od 0.76 usuwa asynchroniczny most [F]; dla list i formularzy wystarczająca [O] | Kod AOT i własne renderowanie dają bardzo płynne animacje [F/O] | Natywne widoki; narzut wywołań między JS a kodem natywnym [O] |
| 9. Krzywa nauki (dla mnie) | Najniższa: znam React i TypeScript [O] | Wysoka: nowy język i model widżetów [O] | Średnia: TS znany, ale mało materiałów [O] |
| 10. Ograniczenia | Zależność od bibliotek zewnętrznych; biblioteki natywne spoza Expo wymagają development builda [F] | Większy rozmiar aplikacji; UI tylko naśladuje natywne kontrolki [O] | Mała społeczność; testy UI ograniczone do tego, co tworzy JS [F] |

## Uzasadnienie kluczowych różnic

- **UI:** React Native i NativeScript używają natywnych kontrolek, więc wygląd zmienia się razem z systemem. Flutter rysuje wszystko sam, przez co wygląd jest identyczny na obu platformach.
- **Natywne API:** NativeScript daje najprostszy bezpośredni dostęp do API. W React Native i Flutterze potrzebna jest biblioteka albo własny moduł. Dla MOB-027 wystarczy lokalna baza i picker daty, które istnieją jako gotowe moduły.
- **Testy:** w React Native i Flutterze logikę biznesową (np. BR-01, BR-02) można testować jako czysty kod, bez urządzenia. W NativeScript testy uruchamiają się na urządzeniu lub emulatorze, co utrudnia CI.

## Źródła

- React Native, nowa architektura: https://reactnative.dev/architecture/landing-page
- React Native, testowanie: https://reactnative.dev/docs/testing-overview
- Expo SDK 58: https://docs.expo.dev/versions/v58.0.0/
- Flutter, Impeller: https://docs.flutter.dev/perf/impeller
- Flutter, testowanie: https://docs.flutter.dev/testing/overview
- NativeScript, dokumentacja: https://docs.nativescript.org/
- NativeScript, testowanie: https://docs.nativescript.org/guide/testing
