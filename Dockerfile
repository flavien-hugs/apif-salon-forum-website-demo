# Sites publics APIF CI (monorepo) : build SvelteKit statique d'UNE application
# puis service des fichiers par nginx. Image finale sans Node, sans sources, sans secrets.
#
#   docker build --build-arg APP=salon-fintech -t salon-fintech .
#   docker build --build-arg APP=forum-fintech -t forum-fintech .

# ---- Étape 1 : dépendances du monorepo et build de production ---------------
FROM node:22-alpine AS build
ARG APP
RUN test -n "$APP" || (echo "ARG APP requis (salon-fintech | forum-fintech)" && exit 1)
WORKDIR /repo
ENV CI=true
# Manifestes seuls d'abord : la couche `npm ci` est mise en cache tant qu'ils ne changent pas.
COPY package.json package-lock.json ./
COPY packages/ui/package.json packages/ui/
COPY apps/salon-fintech/package.json apps/salon-fintech/
COPY apps/forum-fintech/package.json apps/forum-fintech/
RUN npm ci --no-audit --no-fund
COPY packages ./packages
COPY apps/${APP} ./apps/${APP}
RUN npm run build -w apps/${APP}

# ---- Étape 2 : image d'exécution --------------------------------------------
FROM nginx:1.29-alpine AS runtime
ARG APP
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/${APP}/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
