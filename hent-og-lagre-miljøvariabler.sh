#!/usr/bin/env bash
set -euo pipefail

SECRET_FILNAVN=".secrets.env"
MAKS_ALDER_SEKUNDER=3600 # En time

SECRET_NAVN="azuread-familie-ba-sak-frontend-lokal"
TEAM="teamfamilie"
MILJO="dev-gcp"
BEGRUNNELSE="Lokal utvikling av familie-ba-sak-frontend"

# Avbryt hvis forrige henting skjedde innen en time
function avbryt_hvis_nylig_hentet() {
  # Sjekk om fil eksisterer
  [[ -f "$SECRET_FILNAVN" ]] || return 0

  # Hent FORRIGE_HENTING fra $SECRET_FILNAVN
  local string_tidspunkt
  string_tidspunkt=$(grep '^FORRIGE_HENTING=' "$SECRET_FILNAVN" 2>/dev/null | cut -d= -f2 | tr -d "'\"" || echo "")
  [[ -n "$string_tidspunkt" ]] || return 0

  # Konverter DD-MM-YY HH:MM:SS format til Unix timestamp for sammenligning
  local parset_tidspunkt
  parset_tidspunkt=$(date -j -f "%d-%m-%y %H:%M:%S" "$string_tidspunkt" +%s 2>/dev/null || echo "0")
  [[ "$parset_tidspunkt" =~ ^[0-9]+$ ]] || return 0

  local alder
  alder=$(( $(date +%s) - parset_tidspunkt ))
  if (( alder < MAKS_ALDER_SEKUNDER )); then
    echo "$SECRET_FILNAVN er nylig oppdatert. Hopper over."
    exit 0
  fi
}
avbryt_hvis_nylig_hentet

if [[ "$(nais device status || true)" != *"Connected"* ]]; then
  echo "Naisdevice er ikke tilkoblet. Start naisdevice og velg connect. Status må være grønn."
  exit 1
fi

# Henter secreten med nais-cli. Uthentingen logges, derfor --reason.
# nais-cli skriver feilmeldinger til stdout, så vi fanger dem og viser dem videre.
if ! LOKAL_SECRETS=$(nais secret get "$SECRET_NAVN" -e "$MILJO" -t "$TEAM" \
  --with-values --reason "$BEGRUNNELSE" -o json 2>&1); then
  echo "Klarte ikke hente secreten $SECRET_NAVN:"
  echo "$LOKAL_SECRETS"
  echo "Er du pålogget naisdevice og logget inn med 'nais login -y'?"
  exit 1
fi

function hent_verdi() {
  printf '%s\n' "$LOKAL_SECRETS" | jq -r --arg k "$1" '.data[] | select(.key == $k) | .value'
}

AZURE_APP_CLIENT_ID=$(hent_verdi AZURE_APP_CLIENT_ID)
AZURE_APP_CLIENT_SECRET=$(hent_verdi AZURE_APP_CLIENT_SECRET)

if [[ -z "$AZURE_APP_CLIENT_ID" || -z "$AZURE_APP_CLIENT_SECRET" ]]; then
  echo "Fant ikke AZURE_APP_CLIENT_ID/AZURE_APP_CLIENT_SECRET i $SECRET_NAVN."
  exit 1
fi

# Generate random 32 character strings for the cookie and session keys
COOKIE_KEY1=$(openssl rand -hex 16)
COOKIE_KEY2=$(openssl rand -hex 16)
SESSION_SECRET=$(openssl rand -hex 16)
FORRIGE_HENTING=$(date +"%d-%m-%y %H:%M:%S")

# Skriv variablene til fil
cat << EOF > $SECRET_FILNAVN
# Denne filen er generert automatisk ved å kjøre \`hent-og-lagre-miljøvariabler.sh\`
FORRIGE_HENTING='$FORRIGE_HENTING'

COOKIE_KEY1='$COOKIE_KEY1'
COOKIE_KEY2='$COOKIE_KEY2'
SESSION_SECRET='$SESSION_SECRET'

AZURE_APP_CLIENT_ID='$AZURE_APP_CLIENT_ID'
AZURE_APP_CLIENT_SECRET='$AZURE_APP_CLIENT_SECRET'
EOF

echo "$SECRET_FILNAVN oppdatert: $FORRIGE_HENTING"
