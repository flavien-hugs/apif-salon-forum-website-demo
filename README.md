# Sites publics APIF CI (monorepo)

Deux sites web publics construits à partir des maquettes de référence (canvas
« APIF CI – Salon Fintech & Espace collaboratif ») :

| Application                                | Site                                  | Hostname (maquette)      |
| ------------------------------------------ | ------------------------------------- | ------------------------ |
| [`apps/salon-fintech`](apps/salon-fintech) | Salon Fintech Côte d'Ivoire           | `salon-fintech.bedet.ci` |
| [`apps/forum-fintech`](apps/forum-fintech) | Espace collaboratif et d'échange APIF | `apif.bedet.ci`          |

Périmètre : uniquement les pages publiques. Les dashboards, espaces membres,
participants et administration ne sont pas développés ; les liens de navigation
vers ces espaces (prévus par les maquettes) renvoient vers la connexion commune
(`/auth/connexion?next=…`).

- **Frontend** : SvelteKit 3 (Svelte 5, runes), sites pré-rendus en statique (`adapter-static`).
- **Styles** : Tailwind CSS 4, design system commun dans le package `@apif/ui`.
- **Icônes** : Lucide (`@lucide/svelte`). **Polices** : Manrope + Public Sans embarquées.
- **Monorepo** : npm workspaces (aucun outil supplémentaire), un seul `package-lock.json`.
- **Production** : une image Docker par site (build Node → nginx), publiées sur GHCR par GitHub Actions.

Toutes les données affichées sont des données de démonstration (`src/lib/data/` de chaque app),
marquées comme telles dans l'interface.

## Structure

```
apps/
  salon-fintech/            site public du Salon Fintech
    src/routes/             /  /programme  /inscription  /exposants  /pitch-room
                            /informations-pratiques  /auth/connexion
                            /rencontres, /mon-espace -> redirection connexion
    src/lib/{components,data,utils,routes.ts}
  forum-fintech/            site public de l'espace collaboratif
    src/routes/             /  /annuaire  /annuaire/[slug]  /auth/connexion
                            /communaute, /ressources, /coaching, /mon-espace -> redirection connexion
    src/lib/{components,data,utils,routes.ts}
packages/
  ui/                       @apif/ui — partagé par les deux sites
    src/styles/theme.css    tokens Tailwind (@theme) + composants du design system
    src/components/forms    TextField, PasswordField, Combobox (search-select)
    src/components/ui       Modal, Drawer, CheckItem
    src/components/layout   SiteHeader, SiteFooter, PageHero (paramétrés par chaque site)
    src/components/auth     LoginPage (connexion commune, 4 états)
    src/assets              logo APIF CI original, visuels de la maquette, favicon
    src/utils               validation
docker/nginx.conf           configuration nginx commune aux deux images
Dockerfile                  multi-stage, paramétré par --build-arg APP=<app>
.github/workflows/ci.yml    qualité + build + image + déploiement, par application
```

Le déploiement serveur (compose, variables, script) vit sur la branche `deploy`, seule
branche clonée sur le serveur : voir sa section plus bas.

Ce qui est propre à un site (navigation, données, pages, textes) reste dans son
application ; ce qui est identique dans les deux maquettes (design system, champs,
modales, en-tête et pied de page paramétrés, écran de connexion) vit dans `@apif/ui`.

## Commandes

```bash
npm ci                          # dépendances de tout le monorepo (Node 22+)
npm run dev:salon               # http://localhost:5173
npm run dev:forum
npm run lint                    # prettier + eslint (tout le dépôt)
npm run check                   # svelte-check : package + les deux apps
npx playwright install chromium # une fois, pour les tests de composants
npm test                        # vitest : package + les deux apps
npm run build                   # build des deux sites -> apps/*/build
npm run build:salon             # un seul site (idem build:forum)
npm run preview -w apps/salon-fintech
```

## Images Docker

Un seul `Dockerfile` à la racine, paramétré par l'application :

```bash
docker build --build-arg APP=salon-fintech -t salon-fintech .
docker build --build-arg APP=forum-fintech -t forum-fintech .
docker run --rm -p 8080:80 salon-fintech     # sonde : http://localhost:8080/healthz
```

L'étape de build installe le monorepo (`npm ci`) et construit l'application demandée ;
l'image finale (`nginx:alpine`, ~25 Mo) ne contient que les fichiers statiques du site et
`docker/nginx.conf` : pas de Node, pas de sources, pas de secrets. Routage :
`/programme` → `programme.html`, `/annuaire/x` → `annuaire/x.html`, assets `/_app/immutable/`
en cache immuable un an, pages HTML jamais mises en cache, `404.html` pour les URL inconnues.

## Intégration continue (GitHub Actions)

`.github/workflows/ci.yml`, sur chaque push, tag `v*` et pull request :

1. **changes** : détermine les applications concernées (`dorny/paths-filter`).
   Un changement dans `apps/<app>/` ne concerne que cette app ; un changement dans
   `packages/`, à la racine, dans le `Dockerfile`, `docker/` ou le workflow concerne les deux ;
   un tag `v*` reconstruit tout.
2. **quality** : `npm ci`, lint, svelte-check et tests sur tout le monorepo (toujours exécuté).
3. **build** (matrice par app) : build de production, artefact.
4. **image** (matrice par app) : build Docker avec cache GHA par app, vérification du conteneur
   (sonde, accueil, connexion, 404), puis publication sur
   `ghcr.io/<owner>/<repo>/<app>`, uniquement sur push vers `main` (`latest`), `dev` (`dev`)
   ou tag `v*` (tags semver), jamais sur PR. Un tag `sha-<commit>` est toujours ajouté.
5. **deploy** (optionnel, matrice par app) : sur `main`, si la variable de dépôt
   `DEPLOY_ENABLED=true` et les secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`
   existent, lance `./deploy.sh <app>` sur le serveur, dans le clone de la branche
   `deploy` (variable `DEPLOY_DIR`, défaut `/opt/apif-salon-forum-website-demo`).

Authentification GHCR par le jeton éphémère du run (`GITHUB_TOKEN`, permission `packages: write`).

## Déploiement sur le serveur (branche `deploy`)

Le serveur ne clone que la branche `deploy`, qui contient uniquement `docker-compose.yml`
(un service par site, branché sur le companion nginx-proxy + acme-companion), `.env.example`
et `deploy.sh`. Aucun build n'est fait sur place : le serveur récupère les images publiées,
site par site.

```bash
# 1. Sur le serveur (une fois)
git clone -b deploy --single-branch https://github.com/flavien-hugs/apif-salon-forum-website-demo.git /opt/apif-salon-forum-website-demo
cd /opt/apif-salon-forum-website-demo
cp .env.example .env   # hostnames et LETSENCRYPT_EMAIL

# 2. À chaque nouvelle version
./deploy.sh salon-fintech          # ne touche pas au forum
./deploy.sh forum-fintech v1.2.0   # une version précise
./deploy.sh                        # les deux sites
```

Le détail (prérequis, variables, déploiement automatique) est dans le README de la
branche `deploy`.

## Écarts assumés par rapport aux maquettes

- Les liens entre les deux sites (annuaire depuis le salon, salon depuis l'espace, inscription
  depuis la connexion de l'espace) pointent vers le hostname de l'autre site
  (`ESPACE_URL` / `SALON_URL` dans `src/lib/routes.ts` de chaque app).
- Sur la fiche d'organisation, « Demander un contact » renvoie vers la connexion, comme la
  maquette le prévoit pour un visiteur non connecté (la modale est réservée aux membres).
- Sur l'accueil du salon (ordinateur), le bouton du bandeau « Rencontres B2B » est en style
  secondaire : la maquette y utilise un bouton « sur fond sombre » sur un fond clair, illisible.
- Les visuels et le logo sont ceux des maquettes (illustratifs) ; la charte officielle prévaut.
