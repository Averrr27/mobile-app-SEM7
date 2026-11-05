# Sprawozdanie 1 – Budowa aplikacji mobilnych z użyciem technologii frontendowych

**Imię i nazwisko studenta:**  Tomasz Sawoszczuk
**Grupa:**  41_Inf_FD_ST_7
**Data:**  22.10.2026


## Temat zajęć
**Główne technologie i frameworki frontendowe do budowy aplikacji mobilnych**

Omówienie kluczowych technologii frontendowych wykorzystywanych w tworzeniu aplikacji mobilnych, takich jak **React Native**, **Flutter**, **NativeScript**.  
Porównanie i kontrastowanie tych technologii pod kątem **wydajności**, **łatwości użycia** i **wsparcia społeczności**.  
Omówienie najważniejszych **narzędzi deweloperskich** i **systemów kontroli wersji** (VS Code, Android Studio, Xcode, Git).


## Cele ćwiczenia
1. Zrozumienie różnic między frameworkami React Native, Flutter i NativeScript.  
2. Poznanie podstawowych narzędzi deweloperskich wykorzystywanych w tworzeniu aplikacji mobilnych.  
3. Poznanie zasad pracy zespołowej z wykorzystaniem systemu Git.  
4. Wyciągnięcie wniosków dotyczących doboru technologii do konkretnego typu projektu mobilnego.


## Pytania kontrolne i odpowiedzi

### Technologie i frameworki frontendowe

1. **Jakie są główne różnice między React Native, Flutter i NativeScript?**  
Wszystkie trzy frameworki pozwalają napisać jeden kod zarówno dla Androida jak i do iOS. Różnią się językiem, rysowaniem UI i dostępem do funkcji:
React Native
    JS/TypeScript + React. Logika działa w silniku JS, a interfejs składa się z natywnych komponentów systemu.
Flutter
    język Dart. Flutter nie używa natywnych zasobów, cały interfejs rysuje własnym silnikiem.
NativeScript
    JS/TypeScript + frameworki (angular, vue, etc.). Tworzy natywne komponenty i udostępnia w JS całe natywne API systemu, bez pisania mostków.

2. **Jak każdy z tych frameworków renderuje interfejs użytkownika na urządzeniach mobilnych?**  

React Native
    React tworzy drzewo komponentów, renderer Fabric zamienia je na natywne widoki. JS komunikuje się z kodem natywnym przez JSI (JavaScript Interface).

Flutter
    Drzewo widżetów Dart jest zamieniane na drzewo obiektów do narysowania, a silnik Impeller rysuje widok przez GPU. Na iOS Impeller jest jedynym silnikiem, na Androidzie domyślnym, w miejsce starszego Skia.

NativeScript
    kod JS działa w silniku V8 lub JavaScriptCore. Runtime NativeScript zamienia znaczniki XML i szablony na natywne kontrolki.

3. **Kiedy warto wybrać Fluttera, a kiedy React Native lub NativeScript?**  

React Native będzie naturalnym wyborem, gdy znamy JS/TypeScript i React, oraz gdy chcemt współdzielić logikę z frontendem i korzystać z NPM. Expo bardzo upraszcza start projektu.

Flutter sprawdzi się, gdy aplikacja ma się nie różnić wyglądem na różnych platformach, ma rozbudowany, autorski interfejs z dużą ilością animacji. Dodatkowo, Pozwala też zbudować wersję web i desktop z tego samego kodu.

NativeScript wybierze osoba znającega Angulara lub Vue, który często potrzebuje bezpośredniego dostępu do natywnych API bez pisania kodu w Kotlinie lub Swifcie. NativeScripta użyjemy głównie w projektach specjalistycznych i w firmach, które już tę technologię mają.

4. **Jakie są mocne i słabe strony React Native w porównaniu do Fluttera?**

- JS/TypeScript to najpopularniejsze języki, więc łatwiej o wdrożenie,
- zaawansowanie npm i możliwość współdzielenia kodu z aplikacją webową,
- natywne komponenty sprawiają, że aplikacja automatycznie wygląda jak systemowa,
- Expo i aktualizacje OTA (over-the-air): zmiany w kodzie można wysłać bez ponownej publikacji w sklepie.

Słabe strony React Native:

- Duża zależność od bibliotek zewnętrznych, które często nie są supportowane,
- różnice w wyglądzie i zachowaniu między iOS a androidem, co wymusza na deweloperze testowanie obu platform,
- przy aktualizacjach wersji zdarzają się problemy z kompatybilnością bibliotek.

Flutter dysponuje dobrymi narzędziami deweloperskimi, posiada bogaty zestaw widżetów w samym frameworku, oprócz tego ma spójny wygląd i wysoką wydajność UI. Największą wadą fluttera jest konieczność nauki Darta, większy rozmiar aplikacji i interfejs, który tylko naśladuje natywne kontrolki.

5. **Jak Flutter radzi sobie z wydajnością w porównaniu do innych rozwiązań hybrydowych?**  

W testach animacji i płynności UI zwykle wypada najlepiej wśród frameworków wieloplatformowych i zbliża się do aplikacji natywnych.

6. **Jak NativeScript integruje się z natywnymi API urządzenia?**  

Przy budowaniu NativeScript generuje metadane wszystkich natywnych klas, metod i typów z SDK Androida i iOS. Runtime oparty o silnik V8 korzysta z nich, żeby udostępnić te API bezpośrednio w JavaScripcie. Dowolną klasę Javy/Kotlina lub Objective-C/Swifta można wywołać tak jak obiekt JS, a warstwa C++ runtime'u tłumaczy typy . Nie trzeba pisać pluginów ani mostków w języku natywnym.

7. **Który framework ma obecnie największe wsparcie społeczności i dlaczego?**  

Największe wsparcie mają Flutter i React Native, które od lat mają zbliżoną popularność. Flutter prowadzi w gwiazdkach na GitHubie i w ankietach popularności frameworków cross-platform, ma ponad milion aktywnych programistów i stały harmonogram wydań od Google. React Native korzysta z ekosystemu JavaScript/npm i React, czyli największej społeczności frontendowej, ma wsparcie Meta, Microsoftu oraz firmy Expo.

8. **W jakich przypadkach lepiej wybrać framework natywny zamiast hybrydowego?** 

Technologie natywne warto wybrać, gdy:
- aplikacja intensywnie korzysta z naszego sprzętu: aparatu, przetwarzania audio, Bluetooth, czujników w czasie rzeczywistym,
- musimy zmaksymalizować wydajność aplikacji,
- aplikacja powstaje tylko na jedną platformę,

9. **Jakie języki programowania są używane w poszczególnych frameworkach?**  

React Native 
    Język: JS / TypeScript (+ JSX) 
    Język modułów natywnych: Kotlin/Java (Android), Swift/Objective-C (iOS), C++ (JSI)
Flutter
    Język: Dart  
    Język modułów natywnych: Kotlin/Java, Swift/Objective-C (platform channels)
NativeScript
    Język: JS / TypeScript (z Angular, Vue, Svelte, React lub bez frameworka)
    Język modułów natywnych: zwykle niepotrzebny, natywne API wywołuje się z JS

10. **Jak wygląda proces budowania i publikacji aplikacji w każdym z frameworków?**  

React Native
    Expo eas build (budowanie w chmurze, także iOS bez Maca) i eas submit (wysyłka do sklepów); bez Expo Gradle (./gradlew bundleRelease) i archiwizacja w Xcode.
Flutter 
    flutter build appbundle (Android) i flutter build ipa (iOS), potem upload do sklepów.
NativeScript
    ns build android --release --key-store-path … oraz ns build ios --release, potem ns publish albo ręczny upload. 

### Techniki i narzędzia programistyczne

11. **Jakie funkcje Visual Studio Code są szczególnie przydatne w tworzeniu aplikacji mobilnych?**  

- IntelliSense: podpowiadanie kodu, typów i dokumentacji,
- debugger z breakpointami, podglądem zmiennych i stosem wywołań,
- terminal w edytorze: zarządzanie projektem bez lawirowania po oknach.
- Git: historia zmian, rozwiązywanie konfliktów, kontrola wersji.
- refaktoryzacja: formatowanie przy zapisie i wielokursor,

12. **Czym różni się Android Studio od Xcode?**  

Android Studio
    Producent: Google,
    Platformy docelowe: Android,
    System: Windows, macOS, Linux,
    Języki: Kotlin, Java, C++,
    Budowanie: Gradle,
    Testowanie: Emulator androida (VMka),
    Narzędzia: Layout inspector, Profiler, Logcat, Compose Preview,
    Publikacja Pospisany plik AAB wysłany do Play Console.
    
Xcode
    Producent: Apple,
    Platformy docelowe: iOS, iPadOS, macOS, watchOS,
    System: macOS,
    Języki: Swift, Objective-C, C/C++,
    Budowanie: xcodebuild, SPM,
    Testowanie: Symulator IOS,
    Narzędzia: Instruments, View Debugger, SwiftUI Previews,
    Publikacja: Archive i upload do App Store Connect.

13. **Jakie rozszerzenia VS Code usprawniają pracę z React Native lub Flutterem?**  

Flutter
    Flutter i Dart (oficjalne rozszerzenia Dart Code),
    Awesome Flutter Snippets.

React Native:
    Expo Tools,
    React Native Tools (Microsoft),
    ES7+ React/Redux/React-Native snippets,
    SLint i Prettier.

14. **Jak przebiega proces debugowania aplikacji mobilnej w VS Code lub Android Studio?**  

1. Aplikację uruchamia się w trybie debug na emulatorze albo na telefonie podłączonym przez USB lub Wi-Fi z włączonym debugowaniem.
2. Podłącza się debugger: w VS Code przez konfigurację `launch.json`, w Android Studio przyciskiem Debug albo opcją „Attach Debugger to Android Process”.
3. Ustawia się breakpointy, a po zatrzymaniu programu sprawdza zmienne i stos wywołań, wykonuje kod krok po kroku i obserwuje wyrażenia watch.
4. Analizuje się logi: `console.log`/`print`, Logcat w Android Studio i konsolę Xcode.
5. Interfejs i wydajność sprawdza się w Flutter DevTools, React Native DevTools lub w Layout Inspector w Android Studio.
6. Po poprawce hot reload albo Fast Refresh pozwala sprawdzić zmianę bez restartu aplikacji.

15. **Jakie są zalety używania emulatorów i symulatorów w procesie testowania aplikacji?**  

- nie trzeba kupować wielu urządzeń, żeby sprawdzić różne rozmiary ekranu i wersje systemu,
- łatwo zasymulować konkretne warunki: zmianę lokalizacji GPS, słaby zasięg lub brak internetu, tryb ciemny, obrót ekranu, inny język, poziom baterii,
- stan urządzenia można szybko zresetować albo zapisać jako snapshot,
- emulatory współpracują z debuggerem i testami automatycznymi, także w CI.

16. **Jakie problemy mogą wystąpić przy konfiguracji środowiska deweloperskiego i jak je rozwiązać?**  

- Brak lub zła wersja JDK, Android SDK, Node, CocoaPods - `flutter doctor`, `npx expo-doctor` / `npx react-native doctor`, `ns doctor` wskazują brakujące elementy; wersjami zarządzają nvm, fvm, SDKMAN
- Źle ustawione zmienne środowiskowe (`ANDROID_HOME`, `JAVA_HOME`, `PATH`) - ustawienie zmiennych i ponowne uruchomienie terminala lub IDE 
- Emulator nie startuje albo działa bardzo wolno - włączenie wirtualizacji w BIOS (VT-x/AMD-V), Hyper-V/WHPX na Windows, obraz systemu x86_64 lub ARM zgodny z procesorem
- Telefon niewidoczny przez USB - opcje programisty i debugowanie USB, sterowniki, `adb devices`, akceptacja klucza RSA na telefonie
- Błędy Gradle, konflikty wersji bibliotek - czyszczenie cache (`./gradlew clean`, `flutter clean`), sprawdzenie zgodności wersji, `--refresh-dependencies`
- Projekt działa tylko u jednej osoby w zespole - wersje narzędzi spisane w README, pliki lock (`package-lock.json`, `pubspec.lock`), Dev Containers

17. **Jak działa system kontroli wersji Git i dlaczego jest istotny w projektach zespołowych?**  

Git jest rozproszonym systemem kontroli wersji: każdy programista ma pełną kopię repozytorium z całą historią. Zmiany przechodzą przez trzy obszary. W katalogu roboczym edytujemy pliki, poleceniem `git add` przenosimy wybrane zmiany do staging area, a `git commit` zapisuje je w repozytorium jako migawkę z opisem. Ze zdalnym repozytorium zmiany wymienia się przez `git push` i `git pull`/`fetch`. Gałęzie (branche) pozwalają rozwijać funkcje równolegle, a `merge` lub `rebase` łączy je z gałęzią główną.

W zespole Git pozwala wielu osobom pracować jednocześnie nad tym samym kodem, przechowuje historię, umożliwia powrót do działającej wersji, wykrywa konflikty i jest podstawą code review oraz CI/CD.

18. **Jakie korzyści daje korzystanie z GitHub lub GitLab w pracy zespołowej?**  

- centralne repozytorium zdalne z kopią zapasową i kontrolą dostępu,
- pull requesty z code review i komentarzami do konkretnych linii,
- ochrona gałęzi, np. zakaz bezpośredniego pusha do `main` oraz wymóg zatwierdzenia i przejścia testów,
- Issues i tablice Kanban do zarządzania zadaniami i błędami powiązanymi z kodem,
- wbudowane CI/CD: GitHub Actions i GitLab CI,
- wiki, dokumentacja, wydania (releases) i skanowanie zależności pod kątem bezpieczeństwa (Dependabot),
- GitLab można też zainstalować na własnym serwerze.

19. **Na czym polega workflow oparty o branchowanie, pull requesty i code review?**  

1. Gałąź główna (`main`) zawiera zawsze działający kod i nikt nie commituje do niej bezpośrednio.
2. Każde zadanie powstaje na osobnej gałęzi, np. `feature/lista-obowiazkow` albo `fix/crash-logowanie`.
3. Programista robi małe, opisane commity i wypycha gałąź na serwer.
4. Otwiera pull request, czyli prośbę o włączenie zmian do `main`, z opisem, co i dlaczego zmienił.
5. Automatycznie uruchamia się CI.
6. Pozostali członkowie zespołu przeglądają kod, komentują, proponują poprawki i zatwierdzają zmiany.
7. Po akceptacji i przejściu testów PR jest scalany, a gałąź usuwana.

20. **Jak zintegrować Git z procesem CI/CD w projekcie mobilnym?**  

CI/CD konfiguruje się w plikach w repozytorium, a uruchamiają je zdarzenia w Gicie:
- przy każdym pull requeście (CI): instalacja zależności, lint i analiza statyczna (`eslint`, `flutter analyze`), testy jednostkowe i testy widżetów lub komponentów, próbny build na Androida,
- po scaleniu do `main`: build wersji testowej i dystrybucja do testerów (Firebase App Distribution, TestFlight, testy wewnętrzne w Google Play),
- po utworzeniu tagu wersji, np. v1.0.4: build release, podpisanie kluczami zapisanymi jako secrets w CI i wysyłka do sklepów.

Używa się do tego GitHub Actions, GitLab CI, Bitrise, Codemagic, EAS Build/Submit (Expo) i fastlane, który automatyzuje podpisywanie i publikację. Buildy iOS wymagają runnerów z macOS.


## Wnioski końcowe

Podsumuj najważniejsze wnioski z ćwiczenia:  
- Który framework wybrałbyś do własnego projektu i dlaczego?
- Jakie narzędzia najbardziej ułatwiły pracę?  
- Jakie problemy napotkałeś i jak je rozwiązałeś?

Do projektu chore plannera wybrałbym React Native, bo wcześniej pracowałem z Reactem i mogę od razu korzystać ze znanych komponentów, hooków i TypeScriptu. Aplikacja z listą obowiązków, przypomnieniami i synchronizacją nie wymaga wydajności, w której Flutter miałby przewagę, a ekosystem npm dostarcza gotowe biblioteki do nawigacji, powiadomień i backendu.

Najbardziej przydatne będą VS Code z rozszerzeniami Expo Tools i ESLint, emulator z Android Studio oraz Expo Go do testów na własnym telefonie. Pracę z wersjami umożliwi Git i GitHub, a EAS Build pozwoli zbudować wersję iOS bez Maca.

Spodziewam się głównie problemów z konfiguracją środowiska: niezgodnych wersji JDK i Android SDK, wolnego emulatora przy wyłączonej wirtualizacji i konfliktów podczas mergu branchy. Rozwiązaniem jest diagnoza poleceniem npx expo-doctor, spisanie wersji narzędzi w README, włączenie wirtualizacji w BIOS i małe, często scalane pull requesty.