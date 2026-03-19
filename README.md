# familie-ba-sak-frontend
====================

Frontend app for barnetrygd sak.

# Kom i gang med utvikling

* Logg deg på naisdevice og gcloud, installer jq enten [via installeren](https://formulae.brew.sh/formula/jq) eller [via homebrew](https://formulae.brew.sh/formula/jq) og kjør [hent-og-lagre-miljøvariabler.sh](hent-og-lagre-milj%C3%B8variabler.sh) for å hente miljøvariabler. 
* Installer [NVM] (https://github.com/nvm-sh/nvm).
* Kjør `nvm use`
* Installere avhengigheter `yarn`
* Starte dev-server `yarn start:dev`
* Åpne `http://localhost:8000` i nettleseren din

Hente avhengigheter krever at du har et Personal Access Token i GitHub med SSO til Nav-IT. For å opprette det må du gjøre følgende:
1. Lag/forny access token med read rettigheter på pakker i Github (under developer settings)
2. Logg inn på npm med `npm login --scope=@navikt --registry=https://npm.pkg.github.com` og benytt brukernavn, epost og tokenet du nettopp genererte

For å bygge prodversjon kjør `yarn build`. Prodversjonen vil ikke kjøre lokalt med mindre det gjøres en del endringer i forbindelse med uthenting av environment variabler og URLer for uthenting av informasjon.

## Få token mot ba-sak
For å få token for å gå mot familie-ba-sak kan du kjøre følgende kommando i terminalen med samme verdier for cliend_id, 
client_secret og scope som er definert i forrige avsnitt. 

``` 
curl --location --request GET ‘https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/v2.0/token’ \
--header ‘Content-Type: application/x-www-form-urlencoded’ \
--header ‘Cookie: fpc=AsRNnIJ3MI9FqfN68mC5KW4’ \
--data-urlencode ‘client_id=’ \
--data-urlencode ‘client_secret=’ \
--data-urlencode ‘scope=’ \
--data-urlencode ‘grant_type=client_credentials’
```

---

## Miljøvariabler

Appen bruker .env filer for håndtering av miljøvariabler. Hver fil representerer hvert sitt miljø/mode. De er som
følger:

* `.env` - lastes i alle miljøer
* `.env.lokal` - lokal frontend, med lokal backend
* `.env.hybrid` - lokal frontend, med lokal backend som går mot preprod
* `.env.lokalt-mot-preprod` - lokal frontend, som går mot preprod
* `.env.preprod` - preprod (dev)
* `.env.prod` - produksjon

Verdiene kan hentes via `process.env.X` i backend og `import.meta.env.VITE_X` i frontend.
Merk: `VITE_` prefiks er påkrevd for å kunne eksponere verdiene til frontend.

De lokale profilene kan kjøres med sine tilsvarende yarn-kommandoer.

- `yarn start:lokal`
- `yarn start:hybrid`
- `yarn start:lokalt-mot-preprod` (kan også kjøre `yarn start:dev`)

### Secrets

For lokal kjøring er scriptet: [hent-og-lagre-miljøvariabler.sh](hent-og-lagre-milj%C3%B8variabler.sh) bakt inn.
Dette scriptet henter secrets man trenger for utvikling og lagrer det i `.secrets.env`. Denne skal ikke lagres i git.

Scriptet krever at man er pålogget naisdevice og Google Cloud (`nais login`).

I kjørende miljø (preprod og prod) er secrets definert i Nais Console, under "Secrets" (pluss et lite dryss i
nais-filene).
Andre secrets injectes automatisk av Nais, eksempelvis verdier for Redis, Azure og Kubernetes. Se Nais doc for mer info.

# Bygg og deploy
Appen bygges hos github actions, og gir beskjed til nais deploy om å deployere appen i gcp området. Alle commits til feature brancher går til dev miljøet og main går til produksjon.

# Henvendelser

Ved spørsmål knyttet til koden eller prosjektet opprett en issue.

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-familie.

## For Windows-brukere

Applikasjonen kjører ikke på Windows via GitBash as is. En måte å løse det på er å kjøre den via Linux.
Fra og med Windows 10 følge det med eget Subsystem for Linux i Windows.

* Installer Ubuntu fra Microsoft Store
* Sørg for at alle packages er oppdatert  med `sudo apt update` og `sudo apt full-upgrade`
* Installer [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash)
* Restart Ubuntu
* Hent siste stabile Nodejs versjon med: `nvm install --lts`
* Clon repoet i ønsket mappe i linux-området med `git clone https://github.com/navikt/familie-ba-sak-frontend.git`
* Legg til .env fila (se beskrivelsen over)

Anbefaler også å laste ned Visual Studio Code fra Microsoft store for å kunne åpne og redigere filene i Linux uten å gå via terminalen. Det gjør det også betydelig lettere å legge til .env fila.
