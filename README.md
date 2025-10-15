# -NestJs-Microservicios-con-NestJs-AWS-Docker

## Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. tener Nest CLI instalado
```
npm i -g @nestjs/cli / nest start --watch
```
4. levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo
```
 __.env.template__ y renombrar la copia a __.env__
 ```
 6. Rellenar las variables de entorno definidas en el
  ```.env```

7. Ejecutar la aplicacion en dev:
```
npm start: dev
```
8. Reconstruir la base de dato con la semilla,
```
http://localhost:3000/api/v2/seed
``````
## Stack usado
## MongoDB
## Nest

# Production Build
1. Crear el archivo ```.env.prod```
2. llenar las variables de entorno de prod
3. Crear la nueva imagen 
``` 
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build 
```

#Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku <master|main>
```
```
Nota de peticion HTTP 
//instalamos el paquete axios para realizar las peticiones HTTP.
```
``
Por lo que a la hora de instalar axios, recomendamos instalen la versión 0.27.2 hasta que liberen una versión superior con el inconveniente solventado.
Pueden usar el comando yarn add axios@0.27.2 o npm install axios@0.27.2.npm install axios@0.27.
``