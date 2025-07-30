# Usar imagem base Node.js
FROM node:20

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar apenas os arquivos de dependência para aproveitar cache
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o código TypeScript
RUN npm run build

# Expor a porta que o NestJS irá rodar
EXPOSE 3009

# Comando para rodar o servidor
CMD ["npm", "run", "start:prod"]
