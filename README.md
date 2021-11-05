# familie-ba-sak-frontend
====================

Frontend app for barnetrygd sak

# Kom i gang med utvikling

* Installere avhengigheter `yarn`
* Starte dev-server `yarn start:dev`
* Åpne `http://localhost:8000` i nettleseren din

Appen krever en del environment variabler og legges til i .env fila i root på prosjektet.  
```
    CLIENT_ID='<application_id from aad app>'
    CLIENT_SECRET='<KEY from aad app>'
    COOKIE_KEY1='<any string of length 32>'
    COOKIE_KEY2='<any string of length 32>'
    
    SESSION_SECRET='<any string of length 32>'
    BA_SAK_SCOPE=api://<familie-ba-sak client ID>/.default

    ENV=local
    APP_VERSION=0.0.1
```
Disse kan hentes ut fra Secrets i Vault under kv/preprod/fss/familie-ba-sak-frontend/default, med unntak av ENV og APP_VERSION som er gitt over.

For å bygge prodversjon kjør `yarn build`. Prodversjonen vil ikke kjøre lokalt med mindre det gjøres en del endringer i forbindelse med uthenting av environment variabler og URLer for uthenting av informasjon.

---


# Bygg og deploy
Appen bygges hos github actions, og gir beskjed til nais deploy om å deployere appen i fss området. Alle commits til feature brancher går til dev miljøet og master går til produksjon.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til:

* Henning Håkonsen, `henning.hakonsen@nav.no`

## For NAV-ansatte

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

## Cypress med Azure AD login
lag en fil ```cypress.env.json``` på root og fyll inn for verdiene:
```
{
  "ENV": "fyll inn",
  "APP_VERSION": "fyll inn",

  "SESSION_SECRET": "fyll inn",

  "CLIENT_ID": "fyll inn",
  "CLIENT_SECRET": "fyll inn",
  "BA_SAK_SCOPE": "fyll inn",

  "PASSPORTCOOKIE_KEY1": "fyll inn",
  "PASSPORTCOOKIE_KEY2": "fyll inn",
  "PASSPORTCOOKIE_KEY3": "fyll inn",
  "PASSPORTCOOKIE_KEY4": "fyll inn",

  "COOKIE_KEY1": "fyll inn",
  "COOKIE_KEY2": "fyll inn",

  "REDIS_PASSWORD": "fyll inn",

  "SLACK_TOKEN": "fyll inn",

  "USERNAME": "fyll inn",
  "PASSWORD": "fyll inn",
  "TOKEN_NAME": "fyll inn",
  "TENANT_ID": "fyll inn"
}
```