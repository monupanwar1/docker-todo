# ---------- Build Stage ----------
  FROM oven/bun:latest AS builder

  # RUN apt-get update -y && apt-get install -y openssl
  
  WORKDIR /app
  
  COPY package.json ./
  RUN bun install
  
  COPY prisma ./prisma
  RUN bun generate  
  
  COPY . .
  
  # ---------- Runtime Stage ----------
  FROM oven/bun:slim AS runtime  

  RUN apt-get update -y && apt-get install -y openssl
  
  WORKDIR /app
  
  # Copy built app + deps
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/prisma ./prisma
  COPY --from=builder /app/package.json ./
  COPY --from=builder /app/. ./
  
  EXPOSE 3000
  
  # Start the app
  CMD ["bun", "start"]
  