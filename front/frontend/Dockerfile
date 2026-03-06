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

# Exponer el puerto de Vite
EXPOSE 5173

# Comando para ejecutar en desarrollo con --host para Docker
CMD ["npm", "run", "dev", "--", "--host"]
