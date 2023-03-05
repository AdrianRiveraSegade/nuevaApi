Antes de comenzar con las instrucciones de uso :
Al final de las instrucciones te dejamos una notas con comentarios de los autores.

Instrucciones de uso de la API :

Lo primero que vamos a hacer es ir a "example.env" y vamos a copiar todo lo que hay aqui dentro y vamos a crear un nuevo archivo que se llame ".env" (puedes sencillamente cambiarle el nombre y funcionaria perfectamente, pero vamos a hacerlo de la forma mas segura)

Copiamos y rellenamos con nuestros datos, siendo todo lo que ponga "MYSQL cosas relacionadas con nuestro usuario en MySQL workbench. En cuanto al parametro "SECRET" servira con que pongas cualquier conbinacion de letras y/o numeros, parecido a una contraseña.

Para que la página web funcione necesitamos abrir el servidor, para ello seguiremos estos pasos :
1º Abrimos visual studio code con esta carpeta

        2º Le damos al botón que dice "terminal" en la parte de arriba del programa

        3º Nos abrá salido una ventana en la parte inferior del programa en la cual debemos introducir el comando "npm run initDB" para crear la base de datos, si tenemos el programa llamado " MySQL Workbench" podemos inspeccionar la base de datos de forma manual

        4º Ahora que la base de datos esta creada, tenemos que "encenderla", para ello vamos a abrir el servidor local con el comando "npm run dev" y listo, ahora vamos con el frontend, aunque si lo prefieres, puedes comprobar de forma mas manual que todo funciona correctamente con postman, mas abajo te explico como.

Podemos probar el funcionamiento de la API a traves del programa llamado "postman", con el cual podemos probar las funciones de la API de una forma mas directa.

Primero necesitamos hacer una importacion de la coleccion de postman que se incluye aqui mismo con el nombre de "NewBlocNotas.postman_collecion.json" haciendo uso de la opcion de "importar coleccion" dentro del propio postman y seleccionando el susodicho archivo.

Antes de seguir con postman vamos a abrir el servidor de la base de datos (API) tal y como se describe al principio de estas instrucciones.

Ahora en postman se abrira una serie de opciones.
Dispondremos de 2 carpetas, una llamada "user" y otra llamada "note", empecemos por user :
1º Vamos a "newUser" y nos dirigimos a la opcion de "Body" que saldran practicamente en el centro del programa.

    2º Cambiamos los valores de "nickname", "email", "password" a los que prefieras y le damos a la opcion de "SEND" de arriba a la derecha, en la parte de abajo recibiremos informacion diciendonos si lo que acabamos de hacer ha funcionado correctamente o si algo ha salido mal.

Seguimos con "getUserById".
Esta funcion sirve para comprobar si el usuario ha sido creado correctamente, al darnos toda la informacion sobre este usuario, funciona de una forma levemente diferente a la creacion de usuario nuevo
1º Nos dirigimos a la url que dirige las funciones de postman y nos fijamos que pone "http://localhost:4000/user/?" siendo la "?" un numero, en nuestro caso, como abamos de hacer un nuevo usuario, tendra asignado el numero "1" asi que ponemos el numero 1 y le damos a SEND

    2º Nos fijamos en la parte inferior para ver la informacion que devuelve la base de datos, si nos da los datos sobre el usuario que acabamos de crear, todo funciona correctamente.

Vamos a simular un login con el usuario que acabamos de crear :
1º Vamos a la "login" dentro de la carpeta de "user" y como anteriormente, nos dirigimos a "Body", introducimos los datos que nos pide, que en este caso son "email" y "password" y le damos a "SEND"

    2º Si todo va bien, nos habra salido un texto que dice "status : ok" y una serie de letras y numeros muy largo, si algo ha salido mal, nos dira porque ha salido algo mal.
    Vamos a seleccionar esa serie de letras y numeros tan largo y la vamos a copiar

Ya podemos ir a la carpeta "note", concretamente a "newPost"
Aqui, podemos crear una nota, concretamente asi:

    1º Nos dirigimos a "Headers" y podremos ver una casilla marcada que pone "Authorization" y un poco mas a la derecha una serie de letras y numeros muy parecido al que tenemos copiado, vamos a hacer exactamente eso, vamos a borrar esta serie de letras y numeros y vamos a pegar la que nosotros tenemos

    2º Vamos a "body" y podemos ver un menu muy similar al que acabamos de ver, vemos que hay 2 casillas marcadas, la que pone "title" y la que pone "text" cambiamos el "VALUE" de title para ponerle el titulo que queremos que tenga la nota y hacemos lo mismo con text, ademas, si queremos añadir una foto podemos hacerlo marcando la casilla "image" y seleccionando la imagen que queremos añadir a nuestra nota

    3º Le damos a "SEND" y nos saldra la informacion en la parte inferior del programa, apuntamos o recordamos el numero "id" que se le a asignado a nuestra nota, si no sale nada similar, nos dara informacion de porque no ha funcionado.

Comprobemos que la nota que acabamos de crear exista y este todo en orden, ¿como? asi :

    1º Nos dirigimos a "getNotesById" y vasmos al apartado de "headers"

    2º Sustituimos el value de Authotization con el que tenemos, que esta asignado al usuario que hemos registrado

    3º Ponemos el numero id de la nota que creamos en "http://localhost:4000/note/?" sustituyendo la "?" por el numero que queremos y le damos a "SEND"

    4º Comprobamos que la informacion que devuelve es la pertinente, como siempre, si algo ha salido mal, especificara el motivo.

Borremos la nota que acabamos de crear :

    1º Nos dirigimos a "deleteNote" y repetimos el proceso de ir a headers y sustituir nuestro codigo magico en authorization

    2º Ponemos en la url el numero de nuestra nota en vez del numero que sea que tenga puesto y "SEND"

    3º Si todo ha salido bien, pues perfecto, si algo salio mal, (soy muy pesado) como siempre, nos dirá los motivos.

NOTAS :

Para evitar problemas a la hora de instalar las dependencias, hemos decidido que sencillamente no vamos a hacerte pasar por la instalacion de todas las dependencias necesarias para que la base de datos funcione correctamente, si tienes problemas con cualquier comando, borra la carpeta llamada "node_modules" y luego en el terminal escribe "npm install" y deveria de estar todo solucionado.

Intentamos poner la opcion de editar las notas, pero nos hemos visto incapaces, asi que por el momento no esta implementado, pero en un futuro lo implementaremos.

Sientete libre de explorar el codigo de la API como gustes, ademas, si quieres hacer cualquier cambio para usarlo tu mismo, adelante.

ESTE ES UN PROYECTO PARA EL BOOTCAMP DE "https://www.hacaboss.com"

lo de borrar y editar notas es un poco equis de asi que quizas para mas tarde mi gente.
