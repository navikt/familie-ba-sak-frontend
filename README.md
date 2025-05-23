# familie-ba-sak-frontend
====================

Frontend app for barnetrygd sak.

# Kom i gang med utvikling

* Logg deg på naisdevice og gcloud, installer jq enten [via installeren](https://formulae.brew.sh/formula/jq) eller [via homebrew](https://formulae.brew.sh/formula/jq) og kjør [hent-og-lagre-miljøvariabler.sh](hent-og-lagre-milj%C3%B8variabler.sh) for å hente miljøvariabler. Installer [NVM] (https://github.com/nvm-sh/nvm).
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
For å hente miljøvariabler kan du logge på naisdevice og gcloud og kjøre [hent-og-lagre-miljøvariabler.sh](hent-og-lagre-milj%C3%B8variabler.sh).

Appen krever en del environment variabler og legges til i .env fila i root på prosjektet.
Disse kan hentes ved å kjøre `kubectl -n teamfamilie get secret azuread-familie-ba-sak-frontend-lokal -o json | jq '.data | map_values(@base64d)'`
mot dev-gcp clusteret i konsollen.
```
    CLIENT_ID='AZURE_APP_CLIENT_ID' (fra konsollen)
    CLIENT_SECRET='AZURE_APP_CLIENT_SECRET' (fra konsollen)
    COOKIE_KEY1='<any string of length 32>'
    COOKIE_KEY2='<any string of length 32>'
    DREK_URL=<any string eller en url for testing>
    
    SESSION_SECRET='<any string of length 32>'
    
    BA_SAK_SCOPE=api://dev-gcp.teamfamilie.familie-ba-sak-lokal/.default
    ENV=local
    
    APP_VERSION=0.0.1
```

Ønsker du å kjøre mot preprod gjøres det med dette i .env fila.
```
 BA_SAK_SCOPE=api://dev-gcp.teamfamilie.familie-ba-sak/.default
 ENV=lokalt-mot-preprod
```

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
