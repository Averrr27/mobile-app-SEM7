# Sprawozdanie 1 – Budowa aplikacji mobilnych z użyciem technologii frontendowych

**Imię i nazwisko studenta:**  
**Grupa:**  
**Data:**  


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
_Odpowiedź:_  
Wszystkie trzy frameworki pozwalają napisać jedną bazę kodu dla Androida i iOS. Różnią się językiem, sposobem rysowania interfejsu i dostępem do funkcji natywnych:
- React Native (Meta): JavaScript/TypeScript i React. Logika działa w silniku JS, a interfejs składa się z natywnych komponentów systemu.
- Flutter (Google): język Dart. Flutter nie używa natywnych kontrolek, cały interfejs rysuje własnym silnikiem graficznym (Impeller).
- NativeScript (rozwijany przez społeczność, wcześniej przez Progress/Telerik): JavaScript/TypeScript z Angular, Vue, Svelte lub bez frameworka. Tworzy natywne komponenty i udostępnia w JS całe natywne API systemu, bez pisania mostków.

React Native i Flutter to dwa główne frameworki na rynku. NativeScript jest niszowy.

_Wytłumaczenie:_  
Różnicę dobrze widać na zwykłym przycisku. W React Native i NativeScript przycisk na Androidzie jest tym samym obiektem, którego użyłby programista piszący w Kotlinie, a framework tylko nim steruje z poziomu JS. We Flutterze przycisk jest grafiką narysowaną przez Fluttera, która wygląda jak przycisk Androida. Jeśli aktualizacja Androida zmieni wygląd systemowych kontrolek, aplikacja w React Native przejmie go automatycznie, a aplikacja we Flutterze będzie wyglądać tak jak wcześniej.


2. **Jak każdy z tych frameworków renderuje interfejs użytkownika na urządzeniach mobilnych?**  
_Odpowiedź:_  
- React Native: kod React tworzy drzewo komponentów, które renderer Fabric zamienia na natywne widoki (`android.view.View` / `UIView`). JS komunikuje się z kodem natywnym przez JSI (JavaScript Interface), czyli bezpośrednie wywołania przez warstwę C++. Nowa architektura (JSI, Fabric i TurboModules) jest domyślna od wersji 0.76, a w najnowszych wersjach i w Expo nie da się jej już wyłączyć.
- Flutter: drzewo widżetów Dart jest zamieniane na drzewo obiektów do narysowania, a silnik Impeller rysuje każdy piksel przez GPU (Metal na iOS, Vulkan lub OpenGL ES na Androidzie). Na iOS Impeller jest jedynym silnikiem, na Androidzie domyślnym, w miejsce starszego Skia.
- NativeScript: kod JS działa w silniku V8 (Android) albo V8 lub JavaScriptCore (iOS). Runtime NativeScript zamienia znaczniki XML i szablony na natywne kontrolki.

_Wytłumaczenie:_  
Starszy React Native używał mostu (bridge): JS i kod natywny wymieniały się asynchronicznie wiadomościami w formacie JSON, trochę jak dwie osoby piszące do siebie listy. Przy szybkich animacjach i przewijaniu długich list powodowało to przycięcia. JSI działa bardziej jak rozmowa telefoniczna, bo JS wywołuje funkcję natywną od razu i synchronicznie dostaje wynik. Flutter nie miał tego problemu, ponieważ sam rysuje cały ekran i nie musi przekazywać poleceń do natywnych widoków.


3. **Kiedy warto wybrać Fluttera, a kiedy React Native lub NativeScript?**  
_Odpowiedź:_  
- Flutter sprawdzi się, gdy aplikacja ma wyglądać identycznie na wszystkich platformach, ma rozbudowany, autorski interfejs i dużo animacji, a zespół jest gotów nauczyć się Darta. Pozwala też zbudować wersję web i desktop z tego samego kodu.
- React Native wybierzemy, gdy zespół zna JavaScript/TypeScript i React (np. ma już aplikację webową), chce współdzielić logikę z frontendem i korzystać z ekosystemu npm. Expo bardzo upraszcza start projektu.
- NativeScript pasuje do zespołu znającego Angulara lub Vue, który często potrzebuje bezpośredniego dostępu do natywnych API bez pisania kodu w Kotlinie lub Swifcie. Używa się go głównie w projektach specjalistycznych i w firmach, które już tę technologię mają.

_Wytłumaczenie:_  
O wyborze frameworka decydują w dużej mierze umiejętności zespołu. Firma, której zespół webowy pisze w React, zrobi aplikację mobilną w React Native szybciej, bo programiści znają już komponenty, hooki i zarządzanie stanem. Startup budujący aplikację o mocno markowym wyglądzie (np. aplikację bankową z animowanymi wykresami) skorzysta z tego, że Flutter daje kontrolę nad każdym pikselem.


4. **Jakie są mocne i słabe strony React Native w porównaniu do Fluttera?**  
_Odpowiedź:_  
Mocne strony React Native:
- JavaScript/TypeScript to najpopularniejsze języki, więc łatwiej o programistów, a webdeveloperzy szybko się wdrażają,
- natywne komponenty sprawiają, że aplikacja automatycznie wygląda jak systemowa,
- duży ekosystem npm i możliwość współdzielenia kodu z aplikacją webową,
- Expo i aktualizacje OTA (over-the-air): poprawki w kodzie JS można wysłać bez ponownej publikacji w sklepie.

Słabe strony React Native:
- więcej zależności od bibliotek zewnętrznych (nawigacja, animacje) o różnej jakości,
- różnice w wyglądzie i zachowaniu między Androidem a iOS, więc trzeba testować na obu systemach,
- przy aktualizacjach wersji zdarzają się problemy z kompatybilnością bibliotek natywnych.

Flutter ma spójny wygląd, wysoką wydajność UI, bogaty zestaw widżetów w samym frameworku i dobre narzędzia (hot reload, DevTools). Jego wady to konieczność nauki Darta, większy rozmiar aplikacji i interfejs, który tylko naśladuje natywne kontrolki.

_Wytłumaczenie:_  
W React Native logika aplikacji jest spakowana w paczkę JS (bundle). Usługa taka jak EAS Update podmienia tę paczkę na telefonach użytkowników bez ponownej recenzji w App Store, więc można szybko poprawić literówkę albo błąd w obliczeniach. Flutter kompiluje Darta do kodu maszynowego i każda zmiana wymaga nowego wydania w sklepie.


5. **Jak Flutter radzi sobie z wydajnością w porównaniu do innych rozwiązań hybrydowych?**  
_Odpowiedź:_  
Bardzo dobrze. W testach animacji i płynności UI zwykle wypada najlepiej wśród frameworków wieloplatformowych i zbliża się do aplikacji natywnych. Wynika to z trzech rzeczy:
- w wersji produkcyjnej kod Dart jest kompilowany AOT (ahead-of-time) do kodu maszynowego ARM, więc w czasie działania nie ma interpretera,
- między logiką a UI nie ma warstwy pośredniej, bo Flutter sam rysuje ekran,
- Impeller prekompiluje shadery przy budowaniu aplikacji, co usunęło szarpnięcia przy pierwszym uruchomieniu animacji, typowe dla starego silnika Skia.

Przewaga nad hybrydami opartymi na WebView (Cordova, Ionic/Capacitor) jest wyraźna. Różnica względem React Native z nową architekturą jest mniejsza i w typowych aplikacjach z listami i formularzami użytkownik często jej nie zauważy.

_Wytłumaczenie:_  
Hybryda WebView to w praktyce strona WWW wyświetlana w ramce przeglądarki (np. Ionic). React Native, Flutter i NativeScript to frameworki cross-platform, które dają natywną aplikację. Kompilacja JIT odbywa się w trakcie działania programu (szybsza praca nad kodem, wolniejszy start), a AOT przed uruchomieniem (szybki start i działanie). Flutter w trybie debug używa JIT, dzięki czemu działa hot reload, a w wersji release AOT. Aplikacja w trybie debug może się przycinać, dlatego wydajność mierzy się na buildzie release lub profile.


6. **Jak NativeScript integruje się z natywnymi API urządzenia?**  
_Odpowiedź:_  
Przy budowaniu NativeScript generuje metadane wszystkich natywnych klas, metod i typów z SDK Androida i iOS. Runtime oparty o silnik V8 korzysta z nich, żeby udostępnić te API bezpośrednio w JavaScripcie. Dowolną klasę Javy/Kotlina lub Objective-C/Swifta można wywołać tak jak obiekt JS, a warstwa C++ runtime'u tłumaczy typy (marshalling). Nie trzeba pisać pluginów ani mostków w języku natywnym.

_Wytłumaczenie:_  
To główna przewaga NativeScripta. Przykład odczytu poziomu baterii na Androidzie w samym JS:
```js
const manager = Utils.android.getApplicationContext()
  .getSystemService(android.content.Context.BATTERY_SERVICE);
const level = manager.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY);
```
W React Native lub Flutterze do tego samego potrzebna jest gotowa biblioteka albo własny moduł natywny (TurboModule lub platform channel) w Kotlinie i Swifcie. Wadą jest to, że przy bezpośrednim korzystaniu z API kod dla Androida i iOS pisze się osobno.


7. **Który framework ma obecnie największe wsparcie społeczności i dlaczego?**  
_Odpowiedź:_  
Największe wsparcie mają Flutter i React Native, które od lat mają zbliżoną popularność. Flutter prowadzi w gwiazdkach na GitHubie i w ankietach popularności frameworków cross-platform, ma ponad milion aktywnych programistów i stały harmonogram wydań od Google. React Native korzysta z ekosystemu JavaScript/npm i React, czyli największej społeczności frontendowej, ma wsparcie Meta, Microsoftu (React Native dla Windows i macOS) oraz firmy Expo, a w wielu krajach więcej jest ofert pracy z tą technologią. NativeScript ma małą, aktywną społeczność. Rozwijają go głównie społeczność i firma nStudio (nowe wersje runtime'u, integracja z Vite), ale bibliotek i materiałów jest wielokrotnie mniej.

_Wytłumaczenie:_  
Wsparcie społeczności można ocenić po liczbie pakietów (pub.dev dla Fluttera, npm dla React Native), aktywności na GitHubie i Stack Overflow, liczbie ofert pracy i kursów oraz po tym, kto stoi za frameworkiem. W praktyce oznacza to, że biblioteka do kalendarza czy powiadomień push w React Native i Flutterze ma kilka dobrze utrzymanych wersji, a w NativeScript często jedną albo żadnej.


8. **W jakich przypadkach lepiej wybrać framework natywny zamiast hybrydowego?**  
_Odpowiedź:_  
Technologie natywne (Kotlin z Jetpack Compose na Androidzie, Swift ze SwiftUI na iOS) warto wybrać, gdy:
- aplikacja intensywnie korzysta ze sprzętu: zaawansowanej kamery, AR, przetwarzania audio i wideo, Bluetooth LE, czujników w czasie rzeczywistym,
- potrzebna jest maksymalna wydajność (gry 3D, edytory grafiki),
- nowe funkcje systemu (np. widżety, Live Activities, integracja z zegarkiem) muszą być dostępne w dniu premiery,
- aplikacja powstaje tylko na jedną platformę,
- firma ma osobne, doświadczone zespoły Android i iOS.

_Wytłumaczenie:_  
Framework cross-platform jest warstwą pośrednią, więc nowe funkcje systemu trafiają do niego z opóźnieniem albo wymagają kodu natywnego. Aplikacja do nawigacji rowerowej z ciągłym GPS w tle, mapami offline i połączeniem z licznikiem przez Bluetooth i tak byłaby w dużej części napisana natywnie, więc framework cross-platform przestaje się w niej opłacać. Do aplikacji z listą zadań, formularzami i kalendarzem w zupełności wystarczy.


9. **Jakie języki programowania są używane w poszczególnych frameworkach?**  
_Odpowiedź:_  
| Framework | Język aplikacji | Język modułów natywnych |
|---|---|---|
| React Native | JavaScript / TypeScript (+ JSX) | Kotlin/Java (Android), Swift/Objective-C (iOS), C++ (JSI) |
| Flutter | Dart | Kotlin/Java, Swift/Objective-C (platform channels) |
| NativeScript | JavaScript / TypeScript (z Angular, Vue, Svelte, React lub bez frameworka) | zwykle niepotrzebny, natywne API wywołuje się z JS |
| Natywnie (dla porównania) | Kotlin (Android), Swift (iOS) | nie dotyczy |

_Wytłumaczenie:_  
Dart to język Google o składni podobnej do Javy, C# i TypeScriptu: ma typowanie statyczne, klasy, `async/await` i null safety, czyli kompilator pilnuje, żeby zmienna bez `?` nie przyjęła wartości `null`. `String? nazwa;` może być null, a `String nazwa = "Jan";` nie może. JSX w React Native to składnia, w której strukturę UI zapisuje się w kodzie JS, np. `<Text>Odkurzanie</Text>`.


10. **Jak wygląda proces budowania i publikacji aplikacji w każdym z frameworków?**  
_Odpowiedź:_  
Schemat jest wspólny: build w trybie release, podpisanie certyfikatem, wysyłka do sklepu i recenzja.
- Android: plik AAB (Android App Bundle) podpisany kluczem z keystore'a trafia do Google Play Console, gdzie przechodzi przez testy wewnętrzne lub zamknięte, a potem do produkcji.
- iOS: plik IPA podpisany certyfikatem i profilem provisioning trafia do App Store Connect, potem do TestFlight i do recenzji Apple. Potrzebne jest konto Apple Developer (99 USD rocznie) oraz macOS z Xcode albo usługa budowania w chmurze.

Narzędzia w poszczególnych frameworkach:
- React Native: z Expo `eas build` (budowanie w chmurze, także iOS bez Maca) i `eas submit` (wysyłka do sklepów); bez Expo Gradle (`./gradlew bundleRelease`) i archiwizacja w Xcode.
- Flutter: `flutter build appbundle` (Android) i `flutter build ipa` (iOS), potem upload do sklepów.
- NativeScript: `ns build android --release --key-store-path <ścieżka>` oraz `ns build ios --release`, potem `ns publish` albo ręczny upload.

_Wytłumaczenie:_  
Podpis potwierdza, że aktualizacja pochodzi od tego samego autora, i sklep odrzuci nową wersję podpisaną innym kluczem. Jeśli na Androidzie nie używamy Play App Signing, utrata keystore'a oznacza, że aplikacji nie da się już zaktualizować. Student bez Maca zbuduje wersję iOS aplikacji React Native przez EAS Build, a we Flutterze potrzebuje Maca albo usługi CI z maszyną macOS (np. Codemagic).


### Techniki i narzędzia programistyczne

11. **Jakie funkcje Visual Studio Code są szczególnie przydatne w tworzeniu aplikacji mobilnych?**  
_Odpowiedź:_  
- IntelliSense, czyli podpowiadanie kodu, typów i dokumentacji (dobrze działa z TypeScriptem i Dartem),
- wbudowany debugger z breakpointami, podglądem zmiennych i stosem wywołań,
- terminal w edytorze, w którym uruchamia się Metro, `flutter run` i emulatory bez przełączania okien,
- integracja z Gitem: podgląd zmian, commity i rozwiązywanie konfliktów,
- rozszerzenia (pytanie 13) oraz Remote/Dev Containers,
- refaktoryzacja (zmiana nazw, wyodrębnianie widżetu lub komponentu), formatowanie przy zapisie i wielokursor,
- niewielkie zużycie zasobów w porównaniu z pełnym IDE. Android Studio i Xcode są potrzebne głównie do SDK, emulatorów i podpisywania.

_Wytłumaczenie:_  
VS Code jest lekkim edytorem, a obsługę konkretnego języka dostarczają mu rozszerzenia przez Language Server Protocol. W typowym układzie kod pisze się w VS Code, a Android Studio służy do zainstalowania SDK i uruchomienia emulatora. We Flutterze rozszerzenie po zapisaniu pliku samo wykonuje hot reload na działającym emulatorze.


12. **Czym różni się Android Studio od Xcode?**  
_Odpowiedź:_  
| | Android Studio | Xcode |
|---|---|---|
| Producent | Google (oparte na IntelliJ IDEA) | Apple |
| Platformy docelowe | Android | iOS, iPadOS, macOS, watchOS, visionOS |
| System | Windows, macOS, Linux | tylko macOS |
| Języki | Kotlin, Java, C++ | Swift, Objective-C, C/C++ |
| Budowanie | Gradle | xcodebuild, Swift Package Manager / CocoaPods |
| Testowanie | Emulator Androida (pełna maszyna wirtualna) | Symulator iOS |
| Narzędzia | Layout Inspector, Profiler, Logcat, Compose Preview | Instruments, View Debugger, SwiftUI Previews, zarządzanie certyfikatami |
| Publikacja | podpisany plik AAB wysyłany do Play Console | Archive i upload do App Store Connect |

_Wytłumaczenie:_  
W praktyce najbardziej odczuwalne jest to, że Xcode działa tylko na macOS, więc bez komputera Apple nie zbudujemy lokalnie aplikacji na iOS. W projektach cross-platform oba IDE dostarczają głównie SDK, emulator lub symulator i narzędzia do podpisywania, nawet jeśli kod powstaje w VS Code.


13. **Jakie rozszerzenia VS Code usprawniają pracę z React Native lub Flutterem?**  
_Odpowiedź:_  
Flutter:
- Flutter i Dart (oficjalne rozszerzenia Dart Code): uruchamianie, debugowanie, hot reload, DevTools, wybór urządzenia i refaktoryzacja widżetów („Wrap with...”),
- Awesome Flutter Snippets: gotowe szablony widżetów.

React Native:
- Expo Tools: podpowiedzi w plikach `app.json` i `eas.json` oraz debugowanie aplikacji Expo,
- React Native Tools (Microsoft): debugowanie i komendy React Native z palety poleceń,
- ES7+ React/Redux/React-Native snippets: skróty generujące komponenty (np. `rnfc`),
- ESLint i Prettier: wykrywanie błędów i automatyczne formatowanie.

Przydatne niezależnie od frameworka są GitLens (historia zmian linia po linii), Error Lens (błędy wyświetlane przy linii kodu) i Android iOS Emulator (uruchamianie emulatorów z VS Code).

_Wytłumaczenie:_  
Część rozszerzeń rozumie kod i dostarcza podpowiedzi oraz debugger, a część tylko przyspiesza pisanie (snippety, formatowanie). Po wpisaniu `rnfc` i naciśnięciu Tab powstaje szkielet komponentu funkcyjnego z importami i eksportem, a ESLint od razu podkreśli np. hook użyty wewnątrz `if`, co w React jest błędem.


14. **Jak przebiega proces debugowania aplikacji mobilnej w VS Code lub Android Studio?**  
_Odpowiedź:_  
1. Aplikację uruchamia się w trybie debug na emulatorze albo na telefonie podłączonym przez USB lub Wi-Fi z włączonym debugowaniem.
2. Podłącza się debugger: w VS Code przez konfigurację `launch.json` (np. „Flutter: Launch”), w Android Studio przyciskiem Debug albo opcją „Attach Debugger to Android Process”.
3. Ustawia się breakpointy, a po zatrzymaniu programu sprawdza zmienne i stos wywołań, wykonuje kod krok po kroku (step over/into) i obserwuje wyrażenia watch.
4. Analizuje się logi: `console.log`/`print`, Logcat w Android Studio i konsolę Xcode.
5. Interfejs i wydajność sprawdza się w Flutter DevTools (Widget Inspector, Performance, Network), React Native DevTools (dla Hermesa: debugger, drzewo komponentów, Profiler) lub w Layout Inspector w Android Studio.
6. Po poprawce hot reload albo Fast Refresh pozwala sprawdzić zmianę bez restartu aplikacji.

_Wytłumaczenie:_  
Hot reload i Fast Refresh wstrzykują zmieniony kod do działającej aplikacji i zachowują jej stan. Jeśli jesteśmy na trzecim ekranie formularza dodawania obowiązku i zmienimy kolor przycisku, zmiana pojawi się po sekundzie i nie trzeba ponownie wypełniać dwóch poprzednich ekranów. Błędy w kodzie natywnym (Kotlin, Swift) debuguje się w Android Studio lub Xcode.


15. **Jakie są zalety używania emulatorów i symulatorów w procesie testowania aplikacji?**  
_Odpowiedź:_  
- nie trzeba kupować wielu urządzeń, żeby sprawdzić różne rozmiary ekranu, gęstości pikseli i wersje systemu,
- łatwo zasymulować konkretne warunki: zmianę lokalizacji GPS, słaby zasięg lub brak internetu, tryb ciemny, obrót ekranu, inny język, poziom baterii,
- stan urządzenia można szybko zresetować albo zapisać jako snapshot,
- emulatory współpracują z debuggerem i testami automatycznymi, także w CI.

Emulatory nie oddają dokładnie wydajności prawdziwego telefonu i nie obsługują części funkcji sprzętowych (Bluetooth, NFC, aparat, biometria, na starszych symulatorach powiadomienia push). Końcowe testy robi się więc na fizycznych urządzeniach.

_Wytłumaczenie:_  
Emulator Androida odtwarza cały sprzęt i uruchamia prawdziwy system na wirtualnym procesorze. Symulator iOS naśladuje środowisko iOS: aplikacja jest kompilowana pod procesor Maca i działa jako jego proces. Z tego powodu symulator bywa szybszy niż prawdziwy iPhone, a pomiary wydajności na nim mogą wprowadzać w błąd. W emulatorze w kilka sekund sprawdzimy, jak aplikacja działa bez internetu, włączając tryb samolotowy.


16. **Jakie problemy mogą wystąpić przy konfiguracji środowiska deweloperskiego i jak je rozwiązać?**  
_Odpowiedź:_  
| Problem | Rozwiązanie |
|---|---|
| Brak lub zła wersja JDK, Android SDK, Node, CocoaPods | `flutter doctor`, `npx expo-doctor` / `npx react-native doctor`, `ns doctor` wskazują brakujące elementy; wersjami zarządzają nvm, fvm, SDKMAN |
| Źle ustawione zmienne środowiskowe (`ANDROID_HOME`, `JAVA_HOME`, `PATH`) | ustawienie zmiennych i ponowne uruchomienie terminala lub IDE |
| Emulator nie startuje albo działa bardzo wolno | włączenie wirtualizacji w BIOS (VT-x/AMD-V), Hyper-V/WHPX na Windows, obraz systemu x86_64 lub ARM zgodny z procesorem |
| Telefon niewidoczny przez USB | opcje programisty i debugowanie USB, sterowniki, `adb devices`, akceptacja klucza RSA na telefonie |
| Błędy Gradle, konflikty wersji bibliotek | czyszczenie cache (`./gradlew clean`, `flutter clean`), sprawdzenie zgodności wersji, `--refresh-dependencies` |
| Błędy CocoaPods na iOS | `pod install --repo-update`, usunięcie `Pods/` i `Podfile.lock` |
| Cache bundlera w React Native | `npx expo start -c` / `npx react-native start --reset-cache` |
| Projekt działa tylko u jednej osoby w zespole | wersje narzędzi spisane w README, pliki lock (`package-lock.json`, `pubspec.lock`), Dev Containers |

_Wytłumaczenie:_  
Większość problemów bierze się z niezgodności wersji, bo framework wymaga konkretnej wersji JDK, Gradle albo Xcode. Polecenia typu `doctor` sprawdzają całe środowisko naraz, więc od nich warto zacząć. Gdy `flutter doctor` zgłosi „Android license status unknown”, wystarczy uruchomić `flutter doctor --android-licenses` i zaakceptować licencje SDK.


17. **Jak działa system kontroli wersji Git i dlaczego jest istotny w projektach zespołowych?**  
_Odpowiedź:_  
Git jest rozproszonym systemem kontroli wersji: każdy programista ma pełną kopię repozytorium z całą historią. Zmiany przechodzą przez trzy obszary. W katalogu roboczym edytujemy pliki, poleceniem `git add` przenosimy wybrane zmiany do staging area, a `git commit` zapisuje je w repozytorium jako migawkę z opisem. Ze zdalnym repozytorium zmiany wymienia się przez `git push` i `git pull`/`fetch`. Gałęzie (branche) pozwalają rozwijać funkcje równolegle, a `merge` lub `rebase` łączy je z gałęzią główną.

W zespole Git pozwala wielu osobom pracować jednocześnie nad tym samym kodem, przechowuje historię (kto, co, kiedy i dlaczego zmienił), umożliwia powrót do działającej wersji, wykrywa konflikty i jest podstawą code review oraz CI/CD.

_Wytłumaczenie:_  
Commit to migawka stanu projektu z unikalnym identyfikatorem (hashem) i wskaźnikiem na poprzedni commit, więc historia tworzy łańcuch. Branch jest ruchomym wskaźnikiem na commit, dlatego utworzenie gałęzi trwa chwilę. Konflikt powstaje, gdy dwie osoby zmienią tę samą linię, a wtedy Git zostawia wybór człowiekowi. Jeśli Ania zmieni na swojej gałęzi tytuł ekranu na „Moje obowiązki”, a Bartek na „Zadania domowe”, przy scalaniu Git oznaczy konflikt i trzeba będzie zdecydować, która wersja zostaje.


18. **Jakie korzyści daje korzystanie z GitHub lub GitLab w pracy zespołowej?**  
_Odpowiedź:_  
- centralne repozytorium zdalne z kopią zapasową i kontrolą dostępu (role, uprawnienia),
- pull requesty (w GitLabie merge requesty) z code review i komentarzami do konkretnych linii,
- ochrona gałęzi, np. zakaz bezpośredniego pusha do `main` oraz wymóg zatwierdzenia i przejścia testów,
- Issues i tablice Kanban do zarządzania zadaniami i błędami powiązanymi z kodem,
- wbudowane CI/CD: GitHub Actions i GitLab CI,
- wiki, dokumentacja, wydania (releases) i skanowanie zależności pod kątem bezpieczeństwa (Dependabot),
- GitLab można też zainstalować na własnym serwerze.

_Wytłumaczenie:_  
Git jest narzędziem, a GitHub i GitLab to platformy, które dodają do niego funkcje współpracy. Błąd zgłoszony w Issues jako „#12 Powiadomienie o obowiązku nie przychodzi” można naprawić na gałęzi `fix/12-notifications`. Jeśli opis PR zawiera „Closes #12”, zgłoszenie zamknie się po scaleniu, a w historii zostanie ślad, który kod naprawił błąd.


19. **Na czym polega workflow oparty o branchowanie, pull requesty i code review?**  
_Odpowiedź:_  
1. Gałąź główna (`main`) zawiera zawsze działający kod i nikt nie commituje do niej bezpośrednio.
2. Każde zadanie powstaje na osobnej gałęzi, np. `feature/lista-obowiazkow` albo `fix/crash-logowanie`.
3. Programista robi małe, opisane commity i wypycha gałąź na serwer.
4. Otwiera pull request, czyli prośbę o włączenie zmian do `main`, z opisem, co i dlaczego zmienił.
5. Automatycznie uruchamia się CI (testy, lint, build).
6. Pozostali członkowie zespołu przeglądają kod, komentują, proponują poprawki i zatwierdzają zmiany.
7. Po akceptacji i przejściu testów PR jest scalany (merge lub squash), a gałąź usuwana.

Najczęściej stosowane odmiany to GitHub Flow (krótkie gałęzie od `main`), Git Flow (dodatkowe gałęzie `develop`, `release/*`, `hotfix/*`) i trunk-based development (bardzo krótkie gałęzie i częste scalanie).

_Wytłumaczenie:_  
Code review wyłapuje błędy i jednocześnie sprawia, że każdy w zespole zna kod, którego sam nie pisał. Squash merge łączy wszystkie commity z PR w jeden, więc historia `main` pozostaje czytelna. W projekcie chore plannera jedna osoba może otworzyć PR „Dodanie ekranu przypisywania obowiązków”, a druga zauważyć w review brak obsługi pustej listy domowników. Poprawka trafia do kodu, zanim błąd zobaczy użytkownik.


20. **Jak zintegrować Git z procesem CI/CD w projekcie mobilnym?**  
_Odpowiedź:_  
CI/CD konfiguruje się w plikach w repozytorium (`.github/workflows/*.yml` w GitHub Actions, `.gitlab-ci.yml` w GitLabie), a uruchamiają je zdarzenia w Gicie:
- przy każdym pull requeście (CI): instalacja zależności, lint i analiza statyczna (`eslint`, `flutter analyze`), testy jednostkowe i testy widżetów lub komponentów, próbny build na Androida,
- po scaleniu do `main`: build wersji testowej i dystrybucja do testerów (Firebase App Distribution, TestFlight, testy wewnętrzne w Google Play),
- po utworzeniu tagu wersji, np. `v1.2.0` (CD): build release, podpisanie kluczami zapisanymi jako secrets w CI i wysyłka do sklepów.

Używa się do tego GitHub Actions, GitLab CI, Bitrise, Codemagic (popularnego we Flutterze), EAS Build/Submit (Expo) i fastlane, który automatyzuje podpisywanie i publikację. Buildy iOS wymagają runnerów z macOS.

_Wytłumaczenie:_  
Continuous Integration oznacza, że każda zmiana jest automatycznie budowana i testowana, więc błąd wychodzi po kilku minutach, a nie tuż przed oddaniem projektu. Continuous Delivery/Deployment to automatyczne dostarczanie gotowej aplikacji testerom lub do sklepu. Secrets to zaszyfrowane zmienne (np. hasło do keystore'a), których nie wolno commitować do repozytorium. Minimalny workflow dla Fluttera:
```yaml
on: pull_request
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter analyze
      - run: flutter test
```


## Wnioski końcowe

Podsumuj najważniejsze wnioski z ćwiczenia:  
- Który framework wybrałbyś do własnego projektu i dlaczego?  
- Jakie narzędzia najbardziej ułatwiły pracę?  
- Jakie problemy napotkałeś i jak je rozwiązałeś?

_Odpowiedź:_  
React Native, Flutter i NativeScript pozwalają utrzymywać jedną bazę kodu dla Androida i iOS, ale działają inaczej. React Native steruje natywnymi komponentami z poziomu JavaScriptu, Flutter rysuje cały interfejs własnym silnikiem, a NativeScript daje dostęp do natywnego API bezpośrednio z JS. Wydajność obu głównych frameworków wystarcza dziś do typowych aplikacji, więc wybór zależy głównie od umiejętności zespołu, dostępnych bibliotek i wymagań projektu.

Do aplikacji typu chore planner (lista obowiązków domowych, przypisywanie ich domownikom, zadania cykliczne, przypomnienia, synchronizacja między urządzeniami) wybrałbym React Native z Expo. Znam React i TypeScript z projektów webowych, więc nauka zajmie mniej czasu. Expo upraszcza konfigurację i powiadomienia, a EAS Build pozwala zbudować wersję iOS bez Maca. W npm są gotowe biblioteki do nawigacji, kalendarza i backendu (np. Firebase, Supabase). Aplikacja nie wymaga zaawansowanej grafiki ani intensywnego korzystania ze sprzętu, więc przewaga wydajnościowa Fluttera nie ma tu znaczenia. Dla zespołu bez doświadczenia w React Flutter byłby równie dobrym wyborem. NativeScript odrzuciłbym z powodu mniejszej społeczności i małej liczby bibliotek.

Najbardziej pomogły mi VS Code z rozszerzeniami frameworka, emulator z Android Studio, polecenia diagnostyczne `doctor` oraz Git z GitHubem. Pull requesty i GitHub Actions pozwalają pracować równolegle i automatycznie sprawdzać kod przed scaleniem.

Przy konfiguracji środowiska typowe problemy to niezgodne wersje JDK i Android SDK, wyłączona wirtualizacja potrzebna emulatorowi i brak Maca do budowania wersji iOS. Pomaga diagnoza poleceniami `doctor`, spisanie wersji narzędzi w README projektu i budowanie wersji iOS w chmurze przez EAS Build.
