---
layout: "post"
title: "Obliczeniowa dynamika Tomb Raidera"
subtitle: "Złożoność PSPACE w ewolucji gier"
date: "2024-07-15 16:46:02 -0500"
categories: "self-care"
tags: "[tech, programming, theory, cs, computer_science]"
comments: "true"
lang: "pl"
original_post: "/2024-07-15 16:46:02 -0500-the-computational-dynamics-of-tomb-raider"
---

> *Ten post został przetłumaczony z języka angielskiego. [Przeczytaj oryginał](/2024-07-15 16:46:02 -0500-the-computational-dynamics-of-tomb-raider)*

Napisałam ten artykuł na studiach z naprawdę dobrym przyjacielem wiosną 2022 roku. Wielkie podziękowania dla tego faceta. Daj mi znać, jeśli chcesz, aby twoje imię się tu pojawiło.

* * *

Tomb Raider, gra wideo z końca lat 90., w której występuje ikoniczna postać Lary Croft, przedstawia graczom przygody atletycznej brytyjskiej archeolożki, która przemierza niebezpieczne środowiska z ograniczonym zdrowiem i oddechem. Gra była trzykrotnie odświeżana i remasterowana, a jej rozgrywka zawsze obejmowała eksplorację, platformowanie, walkę i rozwiązywanie zagadek. Gra, po odarciu z eksploracji i walki, może być opisana jako gadżety, jak określił Jayson Lynch\[1\], co prowadzi do klasyfikacji Tomb Raider jako PSPACE-kompletnej.<!-- more -->

Wprowadzenie
============

Ewolucja serii gier Tomb Raider, obejmująca trzy różne iteracje, odzwierciedla postępy technologiczne i zmiany w przemyśle gier wideo. Każda wersja, ukształtowana przez swoje unikalne ograniczenia i kontekst czasowy, oferuje graczom inne doświadczenie. Pierwsze dwie wersje kładły nacisk na rozwiązywanie zagadek w ramach ograniczeń środowiskowych, podczas gdy reboot z 2013 roku wprowadził mechanikę przetrwania i zwiększył nacisk na strzelanie z perspektywy trzeciej osoby, odchodząc od pierwotnego nacisku na zagadki.

Analizując złożoność obliczeniową Tomb Raider w kontekście teorii planowania ruchu Lyncha, staje się jasne, że tylko pierwsze dwie wersje serii gier oficjalnie kwalifikują się jako PSPACE-kompletne. Różnica ta wynika z braku skomplikowanych mechanik rozwiązywania zagadek w najnowszej iteracji. Teoria Lyncha podkreśla znaczenie zagadek w złożoności planowania ruchu, co jest zgodne z cechami wcześniejszych wersji serii Tomb Raider.

Oryginalna gra Tomb Raider, wydana przez CORE Designs w 1996 roku na PC, PlayStation 1 i Sega Saturn, zapoczątkowała ikoniczne przygody Lary Croft. Crystal Dynamics kontynuowało dziedzictwo z drugim rebootem, Tomb Raider: Legend, w 2006 roku, obejmującym platformy takie jak PlayStation 2, Xbox i PC. Obie wersje gry są oparte na poligonach, ze względu na ich trójwymiarowy charakter i wykorzystanie siatek poligonowych. Ruchy Lary obejmują trzy osie (w ramach ograniczeń silnika fizyki) i pozwalają jej na interakcję z różnymi obiektami w grze, w tym dźwigniami, przyciskami i skrzyniami.

W kolejnych sekcjach zbadamy implementację nieprzecinającego się przełącznika dla Tomb Raider: Legend oraz nieprzecinającego się zamka drutowego dla oryginalnego Tomb Raidera. Celem tej eksploracji jest pokazanie kompletności PSPACE inherentnej w tych zagadkach, oferując wgląd w szerszy świat złożoności obliczeniowej i rozwoju gier. Mimo że obie gry są napędzane przez skomplikowaną grafikę, ich rozgrywka, obejmująca dane poziomów i ruchy Lary, pozostaje oparta na poligonach. To umożliwia kodowanie bieżącego stanu gry w przestrzeni wielomianowej w odniesieniu do rozmiaru wejścia, reprezentującego liczbę poligonów, które mogą być zawarte w środowisku. Pomimo różniących się schematów sterowania, obie gry wymagają podstawowego zestawu ruchów na siatce dla interakcji Lary w środowisku 3D.

Głównym celem tych zagadek jest poprowadzenie Lary do wyjścia. Jednak nawigowanie przez te wyzwania nie jest pozbawione niebezpieczeństw. Gra wprowadza zagrożenia, które stanowią zagrożenie dla zdrowia Lary. Jeśli jej zdrowie zostanie wyczerpane do zera, konsekwencja jest szybka i absolutna – gra kończy się, a Lara odradza się w swojej początkowej pozycji. Aby zabezpieczyć się przed niepożądanymi ruchami, które mogłyby potencjalnie zakłócić skomplikowane gadżety opisane w kolejnych sekcjach, każdy mechanizm zadający obrażenia okazuje się śmiertelny, nagle kończąc grę. Co ważne, nie ma również strzelających wrogów, co eliminuje aspekt walki z równania gry. Dodatkowo, hak Lary nie ma punktów zaczepienia w poziomach. W wyniku tych gwarancji, nie jest ona w stanie wywołać żadnych efektów ubocznych na poziomie, co podkreśla strategiczny nacisk na rozwiązywanie zagadek.

Różnice i podobieństwa w rozwoju gier w połowie lat 90. i połowie lat 2000.
===========================================================================

Początki środowisk 3D
---------------------

Oryginalny Tomb Raider był jedną z pierwszych popularnych gier, które w pełni wykorzystywały model 3D w świecie generowanym w 3D. Ze względu na ograniczenia przetwarzania konsoli Sega Saturn (dla której gra została pierwotnie stworzona), zastosowano bardzo specyficzną funkcję, aby umożliwić tworzenie ogromnych środowisk 3D – wszystkie poziomy zostały stworzone w systemie [siatki](https://www.pcgamer.com/the-history-of-tomb-raider/). Ten wirtualny świat został skonstruowany przy użyciu podstawowych kształtów geometrycznych lub "bloków", które stanowiły podstawowe jednostki budowlane do tworzenia środowisk i struktur w grze, a ruchy Lary były ograniczone do określonych liczby bloków: Lara mogła skakać pionowo i sięgać krawędzi dokładnie jednego bloku powyżej niej, skakać poziomo na dwa bloki, a z rozbiegu mogła skakać na trzy bloki.

Ze względu na ograniczenia sprzętowe i technologii graficznej w połowie lat 90., tworzenie bezszwowych i bardzo szczegółowych środowisk było wyzwaniem, więc często używano powtarzających się wzorów tekstur, aby pokryć duże powierzchnie i stworzyć iluzję szczegółowości bez potrzeby nadmiernych zasobów obliczeniowych. Gdy gracze stawali się bardziej zaznajomieni z grą i jej stylem wizualnym, rozwijali intuicję do rozpoznawania wzorów i zrozumienia ograniczeń technologii graficznej. Rozwijanie poczucia, jak elementy wizualne były skonstruowane i jak gracz mógł z nimi interagować, kształtowało podejmowanie decyzji związanych z grą, demonstrując skomplikowaną interakcję między zrozumieniem przez gracza ograniczeń wizualnych gry a strategicznymi wyborami podejmowanymi podczas rozgrywki.

Ta interakcja, w ramach ograniczeń systemu siatki, prowadziła do przestrzeni decyzyjnej, w której gracze nawigowali po wirtualnym świecie. Jednak do 2006 roku postępy w GPU pozwoliły na wyższej rozdzielczości tekstury, eliminując skupienie na systemie siatki i rozszerzając przestrzeń decyzyjną. Ta zmiana oznaczała znaczący wzrost liczby możliwych wyborów dostępnych dla graczy w środowisku gry, odzwierciedlając rosnącą złożoność przestrzeni decyzyjnych w domenie obliczeniowej PSPACE.

Zwiększona wierność, kontrola i jakość filmowa szóstej generacji
--------------------------------------------------------------------------

W miarę jak maszyny zyskiwały coraz większą moc przetwarzania, ewolucja systemów gier stała się widoczna w reboocie Tomb Raider z 2006 roku. Zwiększona moc przetwarzania pozwoliła na generowanie większej liczby poligonów w danym momencie, co było kluczowe w tworzeniu bardziej dynamicznego i wciągającego doświadczenia gier, ponieważ umożliwiało implementację nowych i skomplikowanych ruchów, różnorodnych pozycji gracza oraz wprowadzenie nowych rodzajów obiektów z właściwościami nigdy wcześniej niewidzianymi w serii.

Dzięki większemu wsparciu sprzętowemu dla dodatkowych obiektów o większej złożoności obecnych w danym środowisku jednocześnie, Crystal Dynamics w większym stopniu wykorzystało interaktywność obiektów, w tym takie rzeczy jak wirujące ostrza, latające strzały i ruchome skrzynie, zwłaszcza w interakcjach między sobą.

Jedną zupełnie nową funkcją było użycie przez Larę haka. Lara mogła teraz używać haka, aby chwytać się obiektów, aby przesunąć się w kierunku obiektu lub obiekt w kierunku siebie. Dla tej nowej mechaniki, algorytmy określające fizykę, wykrywanie kolizji i animację haka, jak te zaangażowane w realistyczne ruchy haka, przyczyniałyby się do złożoności czasowej. To dodanie było możliwe dzięki postępom w możliwościach przetwarzania, co ilustruje rosnący potencjał interaktywnych elementów rozgrywki. Hak wprowadził nowy wymiar do przemierzania i eksploracji, pokazując rosnącą złożoność mechanik rozgrywki osiągalną dzięki ulepszonym zasobom obliczeniowym.

Ponadto, styl kontrolerów również zmienił się między czasem Core i Crystal Dynamics wraz z dodaniem joysticków na kontrolerze PlayStation 2. Oznaczało to wprowadzenie innego schematu sterowania dla ruchu Lary w grze, który wykorzystywał ten nowy rodzaj analogowego wejścia, co pozwalało na bardziej precyzyjną kontrolę nad ruchami postaci i kątami kamery w porównaniu do tradycyjnych padów kierunkowych. Gracze mogli podejmować subtelne decyzje dotyczące ruchu, wpływające na przemierzanie, eksplorację i strategie walki. Wprowadzenie joysticków, wpływające na ruch gracza i kontrolę kamery, potencjalnie zwiększyło liczbę stanów, które musiały być rozważane w przestrzeni obliczeniowej gry, ponownie zwiększając złożoność PSPACE. Ta adaptacja wpłynęła na projektowanie punktów decyzyjnych w grach, zapewniając graczom bardziej zróżnicowane i kontekstowo wrażliwe opcje. Zwiększona wymiarowość wejścia rozszerzyła możliwości działań gracza, przyczyniając się do bardziej zniuansowanego i responsywnego doświadczenia gry.

Należy zauważyć, że zwiększona wierność i wciągające doświadczenie gry uczyniły gry bardziej filmowymi niż wcześniej; zainspirowane tym, wprowadzono Quick Time Events w dążeniu do bardziej wciągającego doświadczenia gry. QTEs (Quick Time Events) to interaktywne sekwencje w grach wideo, w których gracze muszą podążać za wskazówkami na ekranie lub naciskać określone przyciski w ograniczonym czasie, aby wykonać akcje lub odpowiedzieć na wydarzenia. Włączenie QTEs zwiększa jakość filmową gry, sprawiając, że gracze czują się, jakby aktywnie uczestniczyli w rozwijającej się historii. Jednak w kontekście udowadniania PSPACE-kompletności TR, te QTEs nie mają wpływu na podejmowanie decyzji związanych z wymyślaniem rozwiązania zagadek gry i dlatego nie będą używane w kontekście zagadek opisanych w kolejnych sekcjach.

* * *

Tomb Raider: Legend (2006)
==========================

Nieprzecinający się zamek przełączający
----------------------------------------

Ten gadżet implementuje nieprzecinający się zamek przełączający, używając elementów gry z poziomu [Ghana](https://youtu.be/CG-xGB2OY10?t=195) w Tomb Raider: Legend. Poniżej znajduje się widok z góry gadżetu. Najpierw wyjaśnimy szczegóły każdego tunelu, a następnie zademonstrujemy gadżet.

![](https://docs.google.com/drawings/d/s8uc-dMXLc4SaUZsBE7hRXQ/image?parent=1vmBdRT06e1dxrt_70WYto4xSS6jQSJMAOht83ASN-G8&rev=1&drawingRevisionAccessToken=91eDbMTt7Yog5Q&h=398&w=497&ac=1){: .rounded-white-bkg}

### Tunel #1: Przełącznik

Główne cechy tunelu #1 to ruchoma skrzynia, korytarz wypełniony wirującymi ostrzami i kolcami. Jego lokalizacje to A i B. Lara może wejść do każdej z lokalizacji z płaskiego świata przez wąskie wycięcie w ścianie. Otwór jest na tyle wąski, że tylko Lara może się przez niego przecisnąć, tzn. nie można przez niego przenieść żadnych bloków. Te wycięcia znajdują się na podłodze tunelu, więc Lara może swobodnie wchodzić i wychodzić przez nie.![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfb2qBqXsBxFfMsA-uvbCZWrctfej8dSSlf8-kO8BXiN1nFLRKZTdURHHoAckgq3Q_bVaYn9zBpf2dKImB61He9Y3Y5KohFMJmY-Qm61LcPRnxxOGMKvsfvcCLrlex1Xp42HiUiq7LwzXHUZX0W?key=gsd_dwRg7Ob3d3qc7sHmeA){: .rounded-white-bkg}

W środkowym korytarzu znajduje się para dużych wirujących ostrzy, które wychodzą z boków tunelu. Na każdej stronie tunelu znajduje się tor, na którym para ostrzy jest umieszczona w ścianie. Ostrza wirują i poruszają się tam i z powrotem w tunelu. [\[1\]](#ftnt1) To pozwala na ruch ostrzy, co okaże się przydatne później. Ostrza wirują wystarczająco szybko, zajmują szeroki odcinek tunelu i są umieszczone w taki sposób, że Lara nie może przeskoczyć nad ostrzami, przykucnąć pod nimi ani przejść przez nie bez odniesienia obrażeń i śmierci. W naszym poziomie ostrza są śmiertelne, więc każdy kontakt zabije Larę. ![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfb2qBqXsBxFfMsA-uvbCZWrctfej8dSSlf8-kO8BXiN1nFLRKZTdURHHoAckgq3Q_bVaYn9zBpf2dKImB61He9Y3Y5KohFMJmY-Qm61LcPRnxxOGMKvsfvcCLrlex1Xp42HiUiq7LwzXHUZX0W?key=gsd_dwRg7Ob3d3qc7sHmeA){: .rounded-white-bkg}

Kolejną cechą jest ruchomy blok, który można pchać tylko od tyłu. W stanie 1, blok jest umieszczony po stronie lokalizacji A. Jedynym sposobem, w jaki Lara Croft może przejść przez wirujące ostrza, jest pchanie tego bloku przed sobą, gdy przechodzi przez środek tunelu. Umieszczając blok przed sobą, Lara skutecznie używa bloku jako tarczy, ponieważ blokuje on ostrza i uniemożliwia im obrót. Ponieważ każde ostrze jest umieszczone na torze, gdy zostaną zatrzymane na bloku, można je przesuwać do przodu, gdy Lara pcha blok w kierunku lokalizacji B, jak pokazano [tutaj](https://youtube.com/clip/UgkxleRUMdtkTjiPcyetoalO8hjXBYV6ENzX). Ostrza na tym poziomie gry działają dokładnie tak samo jak te na klipie. Jednak na tym poziomie gry pamiętaj, że jest ich wystarczająco dużo, że Lara może przejść przez środkową część tylko pchając blok przez wszystkie ostrza, tzn. nie może wystarczająco dobrze wyczuć czasu, aby prze