# Usar la versión solicitada por el usuario
FROM node:22.15-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del servidor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
