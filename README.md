Nicko 💪
En personlig treningsapp bygget som en progressiv webapp (PWA). Hostet på Vercel, med Supabase som backend for autentisering og skylagring, og Claude AI for øvelsesinformasjon.
Live app: nickotrening.vercel.app

Funksjoner
Trening

4-dagers treningsprogram med automatisk dag-progresjon basert på historikk
Separate program utenfor hoved-loopen
Oppvarmingsguide tilpasset styrke / hypertrofi øverst i hver økt
Forrige økts vekter forhåndsutfylt automatisk
Automatisk utfylling av neste sett basert på fullført sett
Hviletimer med visuell nedtelling mellom sett
Notatfelt per økt
Endre dato på økter — logg tidligere treninger

AI

Trykk "AI info" på en øvelse for å få teknikktips, muskler som trenes og vanlige feil — generert av Claude i sanntid

Historikk og analyse

Full treningslogg med søkbar historikk
Rediger vekt og reps på fullførte økter i etterkant
Endre dato på loggede økter
Slett enkeltøkter

PR og progresjon

Personlige rekorder per øvelse med dato
Interaktiv progresjonsgraf — kg over tid per øvelse

Design og brukeropplevelse

Mørk og lys modus (lys er standard)
Konfetti-animasjon når alle sett i en øvelse fullføres
Stor feiring når hele økten er fullført
Kan installeres på hjemskjermen på iPhone og Android som en PWA

Data

Skylagring via Supabase — synkronisert på tvers av alle enheter
Eksport og import av all treningsdata som JSON
Lokal lagring som backup


Teknologi
DelTeknologiFrontendRen HTML, CSS og JavaScriptHostingVercelDatabaseSupabase (PostgreSQL)AutentiseringSupabase AuthAIClaude API (Anthropic) via Vercel serverless functionFonterSyne + DM Mono (Google Fonts)GrafChart.js

Oppsett
1. Klon repoet
bashgit clone https://github.com/nickohal/nickotrening.git
2. Supabase
Opprett et prosjekt på supabase.com og kjør følgende SQL:
sqlcreate table training_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  key text not null,
  value jsonb not null,
  updated_at timestamp default now(),
  unique(user_id, key)
);

alter table training_data enable row level security;

create policy "Users can only access own data"
on training_data for all
using (auth.uid() = user_id);
Hent Project URL og Publishable key fra Project Settings → API og lim dem inn i index.html:
javascriptconst SB_URL = 'https://dittprosjekt.supabase.co';
const SB_KEY = 'din-publishable-key';
3. Anthropic API-nøkkel
Opprett en konto på console.anthropic.com og generer en API-nøkkel.
Legg den til i Vercel under Settings → Environment Variables:
ANTHROPIC_API_KEY = din-api-nøkkel
4. Deploy til Vercel
Koble GitHub-repoet til vercel.com og deploy. Fremtidige oppdateringer deployes automatisk når du pusher til main.

Struktur
nickotrening/
├── index.html          # Hele frontend-appen
├── api/
│   └── exercise-info.js  # Vercel serverless function for AI-info
└── README.md

Oppdatere appen

Gjør endringer i index.html (eller api/exercise-info.js)
Last opp til GitHub
Vercel oppdaterer automatisk innen 30 sekunder


Datastruktur
All treningsdata lagres i Supabase under tre nøkler per bruker:
NøkkelInnholdprogramTreningsdager og øvelserlogsAlle loggede øktersettingsBrukerinnstillinger

Lisens
Privat prosjekt — ikke for redistribusjon.
