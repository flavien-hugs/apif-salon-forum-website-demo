#!/usr/bin/env sh
# Récupère la dernière image publiée d'un site et le redémarre, sans toucher à l'autre.
# Usage (sur le serveur, depuis ce dossier) :
#   ./deploy.sh                      # les deux sites, tag par défaut (.env)
#   ./deploy.sh salon-fintech        # un seul site
#   ./deploy.sh forum-fintech v1.2.0 # un site, une version précise
set -eu
cd "$(dirname "$0")"
APP="${1:-}"
TAG="${2:-}"
REGISTRY="ghcr.io/flavien-hugs/apif-salon-forum-website-demo"
case "$APP" in
  "") SERVICES="salon-fintech forum-fintech" ;;
  salon-fintech|forum-fintech) SERVICES="$APP" ;;
  *) echo "Site inconnu : $APP (salon-fintech | forum-fintech)" >&2; exit 1 ;;
esac
if [ -n "$TAG" ]; then
  [ "$APP" = "salon-fintech" ] && export SALON_IMAGE="$REGISTRY/salon-fintech:$TAG"
  [ "$APP" = "forum-fintech" ] && export FORUM_IMAGE="$REGISTRY/forum-fintech:$TAG"
fi
# shellcheck disable=SC2086
docker compose pull $SERVICES
# shellcheck disable=SC2086
docker compose up -d --no-deps $SERVICES
docker image prune -f >/dev/null
docker compose ps
