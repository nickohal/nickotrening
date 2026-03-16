💪 NickoTrening
En personlig treningsapp bygget som en progressiv webapp (PWA). Hostet på Vercel, med Supabase som backend for autentisering og skylagring.
Live app: nickotrening.vercel.app

Funksjoner

4-dagers treningsprogram med automatisk dag-progresjon basert på historikk
Logging av vekt og reps per sett
Forrige økts vekter forhåndsutfylt automatisk
Automatisk utfylling av neste sett basert på fullført sett
Personlige rekorder (PR) med oversikt per øvelse
Separate program utenfor hoved-loopen
Hviletimer mellom sett
Notatfelt per økt
Mørk og lys modus
Eksport og import av treningsdata som JSON
Skylagring via Supabase — synkronisert på tvers av enheter
Kan installeres på hjemskjermen på iPhone og Android


Teknologi
DelTeknologiFrontendRen HTML, CSS og JavaScriptHostingVercelDatabaseSupabase (PostgreSQL)AutentiseringSupabase AuthFonterSyne + DM Mono (Google Fonts)

Oppsett
1. Klon repoet
bashgit clone https://github.com/dittbrukernavn/nickotrening.git
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
3. Deploy til Vercel
Koble GitHub-repoet til vercel.com og deploy. Fremtidige oppdateringer deployes automatisk når du pusher til main.

Oppdatere appen

Gjør endringer i index.html
Last opp til GitHub (erstatt eksisterende fil)
Vercel oppdaterer automatisk innen 30 sekunder


Datastruktur
All treningsdata lagres i Supabase under tre nøkler per bruker:
NøkkelInnholdprogramTreningsdager og øvelserlogsAlle loggede øktersettingsBrukerinnstillinger

Lisens
Privat prosjekt — ikke for redistribusjon.
