# Car fleet front
## Descripción
Prueba práctica Angular.<br/>
Aplicación web (SPA) en Angular (v12+ o superior) que interactúe con los puntos finales proporcionados por el back-end.
## Alcances y limitaciones
El proyecto cuenta con todos y cada uno de los requerimientos descritos en el documento recibido, sin embargo es importante mencionar algunos ajustes y delimitaciones que se establecieron durante el desarrollo:
- Algunos nombres de menús se cambiaron (por ejemplo Mantener a Gestionar)
- Sí se contemplaron las validaciones y manejo de exepciones en los componentes
- No se desarrollaron tablas paginadas o filtros avanzados en los componentes
- El mecanismo de renovación del token jwt es la renovación cada hora (tiempo configurable) siempre que el usuario tenga abierta la aplicación Web
- Se cuenta con mecanismos de seguridad tanto a nivel de back como a nivel de front, restringiendo el acceso a las rutas
- Se crearon los archivos necesarios para ejecutar el proyecto con docker compose

## Ejecución
Las siguientes son las posibles formas de ejecución, las variables requeridas estan ya con sus valores por defecto en cada archivo, por lo que es probable que no se requiera ninguna configuración adicional, el servicio debería ser desplegado en:
```
http://localhost:4200
```
El archivo [enviroment.ts](src/enviroment.ts) cuenta con todas las variables de entorno y sus valores por defecto, puede ser configurado según se requiera (aquí está la uri del backend y el tiempo de renovación del token jwt).
### Angular CLI
El proyecto puede ser ejecutado directamente con el Angular CLI:
```
ng serve
```
### Docker compose 
Puede ser ejecutado usando `docker-compose up` o en la última versión de docker:
```
docker compose up
```
## Desarrollo y tecnologías
Estas son las tecnologías utilizadas y algunos elementos puntuales:

- Angular (16.1.8)
- Bootstrap (5)
- Angular Interceptor y Angular Guard: Para la seguridad
- Sweetalert2: Alertas de mensajes de carga, éxito y error
- Reactive forms: Todos los formularios fueron consturídos con buenas prácticas aplicando reactive forms

# Soporte
Creador y autor:
| Campo | Valor |
| ------ | ------ |
| Nombre | Jeisson Piñeros|
| Correos | jeisson005@hotmail.com <br> jeissonp005@gmail.com <br> jrpinerosr@udistrital.edu.co|
| Teléfono | <a href="tel:573115339687">+57 3115339687</a> |
