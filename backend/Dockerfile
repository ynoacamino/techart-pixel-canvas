FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

RUN bun run prisma:generate

RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/package.json /app/package.json

USER bun
CMD [ "bun", "/app/dist/src/main" ]
