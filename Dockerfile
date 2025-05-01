# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app

# ---- Builder ----
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

# ---- Runner ----
FROM base AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

USER node

CMD ["serve", "-s", "dist", "-l", "3000"]
