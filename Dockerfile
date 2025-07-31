# Usar imagem base Node.js
FROM node:20

# Instalar o pnpm globalmente
RUN npm install -g pnpm

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Definir o diretório de armazenamento global antes de instalar dependências
RUN pnpm config set store-dir /root/.pnpm-store

# Copiar apenas os arquivos de dependências para aproveitar o cache do Docker
COPY package.json pnpm-lock.yaml ./

# Instalar as dependências do projeto
RUN pnpm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o código TypeScript
RUN pnpm build

# Expor a porta que o NestJS irá rodar
EXPOSE 3000

# Comando para rodar o servidor
CMD ["pnpm", "start:prod"]
