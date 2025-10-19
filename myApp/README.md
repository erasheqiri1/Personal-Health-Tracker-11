Projekti Personal Health Tracker është një aplikacion mobil i zhvilluar për të ndihmuar përdoruesit në menaxhimin e shëndetit të tyre personal, duke përfshirë planifikimin e ushqimeve, ndjekjen e ushtrimeve fizike dhe monitorimin e peshës trupore.
Aplikacioni mundëson autentikim të përdoruesve dhe ofron ndërfaqe të qartë, funksionale dhe lehtësisht të përdorshme për menaxhimin e planeve personale shëndetësore.

Teknologjitë e Përdorura
React Native – për zhvillimin e aplikacionit mobil ndër-platformë
TypeScript (TSX) – për tipizim të fortë dhe strukturë më të qëndrueshme të kodit
Expo – për testim dhe ndërtim të shpejtë të aplikacionit
React Navigation – për menaxhimin e faqeve dhe tab-eve
Hooks & Components Architecture – për modularitet dhe mirëmbajtje të lehtë të kodit

Struktura e Projektit
myApp/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx
│   │   ├── profile.tsx
│   │   ├── ushqime.tsx
│   │   └── ushtrime.tsx
│   ├── auth/
│   │   ├── _layout.tsx
│   │   └── login.tsx
│   ├── plans/
│   │   ├── _layout.tsx
│   │   ├── humb_pesh.tsx
│   │   ├── mbaj_pesh.tsx
│   │   └── shto_pesh.tsx
│   ├── ushtrime/
│   │   ├── homeworkout.tsx
│   │   ├── weightlifting.tsx
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── login.tsx
│   ├── signup.tsx
│   └── index.tsx
├── components/
│   └── ui/
│       ├── external-link.tsx
│       ├── haptic-tab.tsx
│       ├── hello-wave.tsx
│       ├── parallax-scroll-view.tsx
│       ├── themed-text.tsx
│       └── themed-view.tsx
├── assets/
├── constants/
├── hooks/
└── .vscode/

 Udhëzime për Ekzekutim
Klono repository-n:
git clone https://github.com/personal-health-tracker.git

Hyr në dosjen e projektit:
cd myApp

Instalo varësitë:
npm install

Nise aplikacionin:
npx expo start

Skanoni QR kodin me aplikacionin Expo Go për ta testuar në pajisjen tuaj.

Anëtarët e Grupit:
Aurorë Smirqaku
Era Sheqiri
Artin Dulahi
Emir Bislimi
Ulp Bellaqa


Projekti është zhvilluar në kuadër të lëndës së Zhvillimit të Aplikacioneve Mobile, si pjesë e studimeve në Fakultetin e Inxhinierisë Elektike dhe Kompjuterike në Universitetin e Prishtinës.
