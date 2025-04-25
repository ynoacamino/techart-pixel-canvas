FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json ./

RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

RUN bun install
RUN bun pm trust --all

COPY . .

RUN bun run prisma:generate

RUN bun run build

CMD bun run prisma:migrate && bun /app/dist/src/main
