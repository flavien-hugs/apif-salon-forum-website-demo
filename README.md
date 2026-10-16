# Déploiement des sites publics APIF CI

Branche `deploy` : uniquement ce qu'il faut sur le serveur pour faire tourner les deux
sites publics. Le code applicatif, la CI et les Dockerfile sont sur la branche `main`,
qui publie les images sur GHCR (`ghcr.io/flavien-hugs/apif-salon-forum-website-demo/<app>`).

| Service | Image | Hostname par défaut |
| --- | --- | --- |
| `salon-fintech` | `…/salon-fintech:latest` | `salon-fintech.bedet.ci` |
| `forum-fintech` | `…/forum-fintech:latest` | `apif.bedet.ci` |

## Installation (une fois)

```bash
git clone -b deploy --single-branch https://github.com/flavien-hugs/apif-salon-forum-website-demo.git /opt/apif-salon-forum-website-demo
cd /opt/apif-salon-forum-website-demo
cp .env.example .env     # hostnames et LETSENCRYPT_EMAIL
# si les packages GHCR sont privés : docker login ghcr.io -u <user>  (token scope read:packages)
```

Prérequis : Docker avec le plugin compose, et le companion nginx-proxy + acme-companion déjà
en place sur le serveur (réseau externe `nginx-proxy`, surchargeable par `PROXY_NETWORK_NAME`).

## Mise à jour

```bash
cd /opt/apif-salon-forum-website-demo
git pull --ff-only                 # récupère les changements de cette branche
./deploy.sh salon-fintech          # ne touche pas au forum
./deploy.sh forum-fintech v1.2.0   # une version précise
./deploy.sh                        # les deux sites
```

`deploy.sh` fait un `docker compose pull` puis `up -d --no-deps` du ou des services
demandés, et nettoie les images inutilisées.

## Déploiement automatique (optionnel)

Le workflow CI de `main` peut lancer `./deploy.sh <app>` ici par SSH après chaque
publication d'image, si le dépôt GitHub définit la variable `DEPLOY_ENABLED=true` et
les secrets `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` (variable `DEPLOY_DIR`
optionnelle, défaut `/opt/apif-salon-forum-website-demo`).

## Fichiers

- `docker-compose.yml` : un service par site, branché sur le companion nginx-proxy.
- `.env.example` : variables à renseigner (copier en `.env`).
- `deploy.sh` : pull de l'image puis redémarrage, par site.
