RE-DO de API

Base de datos per-se:

    User:
        id
        email
        password
        created_at
    Nota
        id
        user
        text
        categoria (vamos a poner varias categorias simples *Ver final de apuntes*)
        imagen
        created_at

Endpoints
POST/user : registro de usuario nuevo
GET/user/:id : devolver la informacion de un usuario
POST/login : el login de un usuario que ademas devuelve el token
GET/ Una lista de todas las notas
GET/note/:id Devuelve la informacion de una nota
POST/ Para creaun una nueva nota que necesitara cabecera con token
DELETE/note/:id Borra una nota solo si eres quien lo creo

# nuevaApi
