# ADR-001: Wybór frameworka

**Status:** przyjęta  
**Data:** 2026-11-05

## Kontekst i wymagania

Projekt MOB-027 ChorePlanner: aplikacja mobilna dla jednej osoby do ewidencji obowiązków domowych i ich wykonań. Wymagania karty i `docs/requirements.md`, które wpływają na wybór:

1. **Trwały zapis lokalny i relacja 1:N (FR-11, BR-04).** Potrzebna lokalna baza z kluczem obcym i blokadą usuwania obowiązku z wykonaniami.
2. **Formularze z walidacją i datami (FR-08, BR-01, BR-03).** Pola daty i godziny, komunikaty błędów, sprawdzanie nakładania się wykonań.
3. **Obliczenia i testy logiki (FR-10, BR-02, TEST-01..02).** Termin kolejnego wykonania liczony w kodzie i pokryty testami automatycznymi uruchamianymi w CI.
4. **Uruchomienie na Androidzie lub iOS (TECH-02)** bez obowiązku publikacji w sklepie.

Aplikacja nie korzysta intensywnie ze sprzętu (aparat, GPS, Bluetooth) i nie ma złożonych animacji.

## Rozważone alternatywy

- **Flutter:** bardzo dobra wydajność UI i komplet narzędzi testowych w SDK. Wymaga nauki Darta i modelu widżetów.
- **NativeScript:** bezpośredni dostęp do natywnych API z TypeScriptu. Mała społeczność, mniej bibliotek, a testy uruchamiane na urządzeniu komplikują CI.
- **React Native z Expo:** TypeScript i React, gotowe moduły do bazy SQLite i dat, testy logiki w Jest.

Szczegóły: `docs/technology-comparison.md`.

## Decyzja

React Native z Expo (SDK 58, React Native 0.88), TypeScript w trybie strict, nawigacja Expo Router.

## Uzasadnienie

1. **Znajomość technologii:** pracowałem wcześniej z Reactem i TypeScriptem, więc mogę skupić się na wymaganiach karty zamiast na nauce języka.
2. **Gotowe moduły pod wymagania:** Expo SDK zawiera bazę SQLite i inne moduły zgodne wersjami z SDK, co pokrywa zapis lokalny i relacje bez pisania kodu natywnego.
3. **Testowalność:** reguły BR-01 i BR-02 można wydzielić do czystych funkcji TS i testować w Jest bez urządzenia, także w GitHub Actions.
4. **Szybki start i uruchamianie:** Expo Go na telefonie pozwala uruchomić aplikację bez instalacji Android Studio.

## Konsekwencje i ryzyka

1. **Zgodność wersji bibliotek:** zmiany API między SDK Expo i konflikty zależności, np. przy tworzeniu szkieletu `react-dom@19.3.1` nie pasował do `react@19.3.0`. Środek zaradczy: instalacja przez `npx expo install` i `npx expo-doctor`.
2. **Ograniczenia Expo Go:** biblioteka z kodem natywnym spoza Expo SDK wymaga development builda, który na iPhonie bez Maca można zbudować tylko przez EAS Build (konto Apple Developer).
3. **Różnice między platformami:** natywne kontrolki (np. picker daty) wyglądają i działają inaczej na Androidzie i iOS. Testy ręczne prowadzę na iPhonie (iOS), więc zachowanie na Androidzie trzeba sprawdzić osobno przed oddaniem.

## Warunki ponownego rozpatrzenia decyzji

- Pojawienie się wymagania z intensywną grafiką lub animacjami, gdzie przewaga Fluttera byłaby istotna.
- Konieczność użycia natywnego API, dla którego nie ma utrzymywanej biblioteki React Native.
- Brak wsparcia Expo dla potrzebnej wersji systemu (Android, iOS) albo zablokowanie projektu przez niezgodność wersji.
