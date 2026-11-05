# Sprawozdanie — Laboratorium 1

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** 149905  
**Projekt biznesowy:** MOB-027 — ChorePlanner  
**Framework:** React Native (Expo SDK 58)  
**Data zajęć:** 2026-10-22  
**Repozytorium:** https://github.com/Averrr27/mobile-app-SEM7  
**Commit / tag odpowiadający oddaniu:** tag `lab-01`

> Wypełnij na podstawie własnych działań. Odpowiedzi powinny zawierać dowody (pliki, commity, PR, wyniki uruchomienia), nie same deklaracje.

## 1. Cel laboratorium

Zapoznanie się ze specyfiką projektu, dostępnymi narzędziami i frameworkami, utworzenie pomysłu i środowiska.

## 2. Analiza technologii

**Dokument:** `docs/technology-comparison.md`  
**Najważniejsze różnice:** React Native i NativeScript renderują natywne kontrolki platformy, a Flutter rysuje cały interfejs własnym silnikiem Impeller, więc wygląda identycznie na Androidzie i iOS. NativeScript daje bezpośredni dostęp do API systemu z poziomu JS, a React Native i Flutter wymagają do tego bibliotek lub własnych modułów natywnych. Pod względem testowania React Native i Flutter pozwalają testować logikę bez urządzenia, a NativeScript uruchamia testy przez Karma na urządzeniu, co utrudnia CI. Ekosystem bibliotek jest największy w React Native i Flutterze, a NativeScript ma małą społeczność.  
**Źródła:** reactnative.dev, docs.expo.dev (SDK 58), docs.flutter.dev, docs.nativescript.org. `docs/technology-comparison.md`. Claude.

## 3. Decyzja technologiczna

**Dokument:** `docs/technology-decision.md`  
**Wymagania karty MOB-027 wpływające na wybór:**

1. Trwały zapis lokalny i relacja obowiązek 1:N wykonanie z blokadą usuwania (FR-11, BR-04): potrzebna lokalna baza z kluczem obcym, a Expo SDK zawiera moduł SQLite.
2. Formularze z walidacją dat i brakiem nakładania się wykonań (FR-08, BR-01): potrzebne pola daty i godziny oraz czytelne komunikaty błędów, dostępne jako gotowe komponenty.
3. Obliczenie terminu kolejnego wykonania z testami (FR-10, BR-02, TEST-02): logikę da się wydzielić do czystych funkcji TypeScript i testować w Jest, także w CI.

**Dlaczego wybrano framework:** znam React i TypeScript z wcześniejszych projektów, Expo dostarcza moduły zgodne z wersją SDK (baza, daty), logikę biznesową można testować bez urządzenia, a Expo Go pozwala uruchomić aplikację na telefonie bez instalacji Android Studio.  
**Rozważona alternatywa:** Flutter, który ma lepszą wydajność UI i komplet narzędzi testowych w SDK. Kompromis: aplikacja CRUD nie potrzebuje zaawansowanej grafiki, a nauka Darta zabrałaby czas potrzebny na wymagania karty.  
**Ryzyka:** (1) niezgodność wersji bibliotek między SDK Expo, która wystąpiła już przy tworzeniu szkieletu (punkt 7); (2) biblioteki natywne spoza Expo SDK nie działają w Expo Go i wymagają development builda.

## 4. Konfiguracja środowiska

| Narzędzie | Wersja | Rola |
|---|---|---|
| System operacyjny | Windows 11 Pro | środowisko pracy |
| Framework / SDK | Expo SDK 58 (React Native 0.88, React 19.3), TypeScript 6.0 | framework aplikacji |
| Runtime / menedżer pakietów | Node.js 24.14.1, npm 10.7.0, Git 2.54 | uruchamianie narzędzi, zależności, kontrola wersji |
| Emulator / urządzenie | Expo Go na telefonie iPhone 15 Pro, iOS 26.2.1 | uruchamianie aplikacji |
| Edytor / IDE | Visual Studio Code 1.145.0 | edycja kodu, Git |

**Polecenia uruchomienia:**

```text
npm install
npx expo start
# zeskanowanie kodu QR w aplikacji Expo Go (telefon i komputer w tej samej sieci Wi-Fi)
```

**Wynik uruchomienia:** aplikacja uruchomiła się w Expo Go i wyświetliła ekran startowy z tekstem. Typy (`npx tsc --noEmit`), lint (`npx expo lint`) i diagnoza `npx expo-doctor` (20/20 testów) przeszły bez błędów. 
**Weryfikacja po zmianie ekranu:** tekst ekranu startowego w `src/app/index.tsx` zmieniono z „Chore app” na „MOB-027 ChorePlanner”.

## 5. Praca z Git

- **Issue:** (https://github.com/Averrr27/mobile-app-SEM7/issues/1)
- **Gałąź:** `feature/initial-screen`
- **Pull Request:** (https://github.com/Averrr27/mobile-app-SEM7/pull/2)
- **Commit(y):** `4ecf464` chore: expo, eslint setup; `afb6ce2` feat: add basic landing page; Commit: 463f392b72ca136ccfca5850f43a379117a6cab4
- **Samoocena PR:** przejrzałem diff (1 zmieniona linia w `src/app/index.tsx`, bez zbędnego kodu), sprawdziłem zgodność z wymaganiem zadania 3 (nazwa projektu MOB-027 na ekranie startowym), uruchomiłem `npx tsc --noEmit` i `npx expo lint` bez błędów oraz sprawdziłem ekran w Expo Go na iPhonie. Kompromis: brak testów automatycznych, bo framework testów nie jest jeszcze wybrany.
- **Stan `main` po scaleniu:** aplikacja uruchamia się z `main` i pokazuje „MOB-027 ChorePlanner”

## 6. Dyskusja

**Wybór technologii dla scenariusza zespołu:** React Native z Expo  
**Dwa argumenty:** Znam TypeScript i React, więc w sześć miesięcy dostarczy więcej funkcji, niż ucząc się Darta. 
Aparat, geolokalizację i zapis lokalny pokrywają moduły Expo SDK, utrzymywane razem z wersją SDK, co według mnie jest bardzo dobrym rozwiązaniem.
**Największe ryzyko:** tryb offline z synchronizacją nie jet gotowy w żadnym frameworku. Trzeba samemu zaprojektować kolejkę zmian i rozwiązywanie konfliktów, a przy kolejnych aktualizacjach SDK utrzymanie zgodności bibliotek wymaga stałej pracy.  
**Co mogłoby zmienić decyzję:** wymaganie zaawansowanego przetwarzania obrazu z aparatu w czasie rzeczywistym albo bardzo rozbudowanych animacji. Wtedy rozważyłbym Fluttera albo moduły natywne.

## 7. Problemy i rozwiązania

| Problem / objaw | Hipoteza przyczyny | Działanie | Wynik |
|---|---|---|---|
| `npx expo lint` nie mógł zainstalować ESLint (błąd npm ERESOLVE) | Expo Router pośrednio dociągał `react-dom@19.3.1`, niezgodny z `react@19.3.0` z SDK 58 | `npx expo install react-dom`, które przypięło wersję zgodną z SDK (19.3.0) | ESLint zainstalowany, lint i `expo-doctor` bez błędów |
| Nowe pliki nie były widoczne w zakładce Source Control w VS Code, nie dało się dodać ich do commita | Nieodświeżony widok Git w edytorze; `git status` w terminalu pokazywał pliki poprawnie| Restart VS Code | Pliki widoczne w Source Control, commity wykonane |

## 8. Wnioski

1. Expo upraszcza start projektu React Native: szkielet z TypeScriptem i nawigacją powstał bez konfiguracji Androida, a Expo Go pozwolił uruchomić aplikację na telefonie bez Android Studio. Wersje bibliotek trzeba jednak pilnować, dlatego biblioteki instaluję przez `npx expo install` i sprawdzam `npx expo-doctor`.

## 9. Użycie narzędzi AI (jeżeli dotyczy)

**Narzędzie i zakres wsparcia:** Claude: przegląd repozytorium względem `requirements.md` i `contributing.md`, utworzenie szkieletu Expo.
**Jak zweryfikowano wynik:** uruchomienie aplikacji w Expo Go, `npx tsc --noEmit`, `npx expo lint`, `npx expo-doctor`; fakty o frameworkach sprawdzone w oficjalnej dokumentacji (reactnative.dev, docs.expo.dev, docs.flutter.dev, docs.nativescript.org).  
**Elementy wykonane samodzielnie:** Wybór frameworka i uzasadnienie oparte na własnym doświadczeniu z Reactem, ustalenie interpretacji reguł biznesowych karty,  konfiguracja środowiska i uruchomienie na telefonie, kodowanie pierwszych komponentów, praca z Git.

## 10. Checklista oddania

- [x] Porównanie trzech frameworków.
- [x] ADR wyboru technologii.
- [ ] Uruchomiona aplikacja i instrukcja w README.
- [x] Issue, gałąź i scalony PR.
- [ ] Linki do dowodów i historia pracy.
- [x] Problemy, wnioski i deklaracja AI (jeżeli dotyczy).
