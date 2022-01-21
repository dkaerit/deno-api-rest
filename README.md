<center><img src="https://i.imgur.com/GtgLBvg.png"></center>

<p align="center">
<img src="https://img.shields.io/github/commit-activity/y/dkaerit/deno-api-rest?color=17a8c8">
<img src="https://img.shields.io/github/downloads/dkaerit/deno-api-rest/total?color=17a8c8">
<img src="https://img.shields.io/badge/license-MIT-17a8c8" alt="License">
</p>

## About

Deno api rest baseplate es una estructura de partida cuya finalidad sea darle uso para ahorrar tiempo en la implementación de un backend con dicho framewrok, en una intención de ahorrar tiempo o bien para proyectos de uso didácticos o personales. 

Este proyecto forma parte de la colección api rest baseplate como micro servicios.

## Generalidades
  * Sin gestor de paquetes: [Modulos de terceros](https://deno.land/x)

## Ejecutar

```bash
$ git clone git@github.com:dkaerit/deno-api-rest.git backend
$ cd backend
$ git update-index --assume-unchanged .env
$ ./exe.image.ps1
```


## JWT (Json Web Token)
<img align="right" src="https://user-images.githubusercontent.com/24440929/150584119-a836a85b-0330-4686-b3ed-5871cc3378e9.png"> Los tokens web JSON son un método para representar notificaciones de forma segura entre dos partes. Permite decodificar, verificar y generar JWT. 
De esta manera podemos generar token en el backend para asociarlos a cada sesión de los usuarios en el frontend, y dotar de la seguridad necesaria a la aplicación web, así como restringir el acceso de cierta vistas del frontend para cuentas que han iniciado sesión, e incluso a ciertas peticiones http solicitadas al backend.

El funcionamiento es el siguiente: Dado un header de la forma `{username, password}`, primero se verifica que dicho usuario para dicha contraseña existe en la base de datos. Este arrojará verdadero o falso si encontró tal coincidencia. Siendo falso el fin del proceso y la denegación del token, y sinedo verdadero el que permita continuar con el proceso. 

JWT server genera el json a raíz de lo que en este proyecto denominamos los `essentials` (para simplificar), compuesto de un header `{ alg: "HS512", typ: "JWT" }`, el payload `{ user, expiry }` y un secreto `TOKEN_SECRET` (éste último normalmente almacenado en las variables de entorno pues no debe ser conocido). 

```typescript
function makeEssentials(user:string) {
  const header = { alg: "HS512", typ: "JWT" } as Header;
  const payload = { user, getNumericDate(60*60*24) } as Payload;
  const secret = Deno.env.get("TOKEN_SECRET") as string 
  return {header,payload,secret}
}
```

El servicio `JWT` se encuentra implementado en el fichero `services/jwt.ts`, y el handler `login()` que retorna el token junto con sus funciones auxiliares como `makeEssentials()` se encuentran en `models/auth.ts`.

## Modelos
### Usuarios
```typescript
export interface UserSchema {
  _id: {$oid: string};
  user: string;
  email: string;
  passwd: string;
}

```

## Rutas
```typescript
const UserRouter = new Router({prefix: '/users'});
export default UserRouter                              // Rutas referidas al modelo "Usuario"
    .post("/create", User.addUser())                   // "/create"            → addUser()
    .get("/all", guard, User.getAllUsers())            // "/all"       ~guard~ → getAllUsers()
    .get("/user:user", guard, User.getUser())          // "/user:id"   ~guard~ → getUser()
    .put('/update:user', guard, User.updateUser())     // "/update:id" ~guard~ → updateUser()
    .delete('/delete:user', guard, User.deleteUser())  // "/delete:id" ~guard~ → deleteUser()
```



## Base de datos
