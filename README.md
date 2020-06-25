### Features

-   Ver productos disponibles y generar pedidos
-   Un usuario con roles de administrador podra realizar acciones CRUD sobre los productos y sobre los pedidos;
-   Autenticacion mediante [JWT](http://jwt.io)

# Delilah Resto API

Tercer proyecto de la carrera de Desarrollo web full stak de [Acamica](http://acamica.com).

**Descripcion**

Este proyecto esta pensado para manejar una base de datos de un restaurant, en ella los usuarios podran seleccionar de un listado de productos disponibles los platos de comida para ser enviados a la direccion seleccionada previo registro del cliente.
Los usuarios con roles de administrador podran realizar modificaciones a los productos en la base de datos (editar, eliminar, agregar), asi como a los pedidos que se hayan realizado (actualizar estado del pedido).

**Iniciado la aplicacion**

Para iniciar la aplicacion se debera descargar o clonar el repositorio y deberemos contar con NodeJS y XAMPP/MySQL instalado en la pc.

Una vez descargada la aplicacion en la consola de comando se deberan correr los siguientes comando

```
npm install
```

para instalar las dependecias necesarias para ejecutar la aplicacion

```
npm start
```

para iniciar la coneccion y la creacion de la base de datos e iniciar la aplicacion

**Usando la aplicacion**

La aplicacion esta provista con sus respectivos endpoints para usuarios, productos y ordenes, los cuales algunos son exclusivos para administradores, los cuales requeriran de un token de autenticacion y autorizacion (al final del documento se proveera de ejemplos de token y de como enviarlos).

###Usuarios

**Registrando un nuevo usuario**

Para registrar un usuario se debe realizar una peticion de tipo POST al endpoint.

```
/api/register
```

el endpoint recibe un objeto JSON con el formato.

```
{
    "username": "gandalf",
    "name": "Mithrandir",
    "phone": "123456789",
    "address": "Middle Earth",
    "password": "theGrayWizard",
    "isAdmin": true
}
```

y devuelve un status: 200 junto con un mensaje indicando que se agrego el usuario con username: < username > con el id correspondiente.

**Listado de usuarios**

Realizando una peticion de tipo GET al endpoint:

````
/api/users
```

Un usuario con roles de administrado podra ver un listado de todos los usuarios registrado, el serivor devolvera una respuesta con status: 200 y un JSON con un array de usuarios registrados.

```
{
    "users": [
        {
            "id": 1,
            "username": "oakenshield",
            "name": "Throrin II son of Thrain",
            "phone": "123456789",
            "address": "Middle Earth",
            "password": "erebor4life",
            "isAdmin": true
        },
        {
            "id": 2,
            "username": "samGamgee",
            "name": "samwise gamgee",
            "phone": "123456789",
            "address": "the shire",
            "password": "frodoscompanion",
            "isAdmin": false
        },
        {
            "id": 3,
            "username": "gandalf",
    		"name": "Mithrandir",
    		"phone": "123456789",
    		"address": "Middle Earth",
    		"password": "theGrayWizard",
    		"isAdmin": true
        }
    ]
}
```

**Logeando un usuario**

Para logear un usuario en la aplicacion se debe enviar una peticion de tipo POST al endpoint.

```
/login
```

junto con el usuario y contraseña del usuario en formato JSON.

```
{
	"username": "oakenshield",
	"password": "erebor4life"
}
```

si los datos son correctos devolvera un status: 200 junto con el token que se debera enviar si se requiere.

###Productos

**Listado de productos**

Para obtener un listado de los productos disponibles se debe realizar una peticion de tipo GET al endpoint

```
/api/products
```

Devolvera un objeto listando los productos que estan a disposicion de los clientes.

```
{
    "products": [
        {
            "id": 1,
            "name": "Hamburguesa completa",
            "price": 150,
            "description": "Medallon de carne 100% vacuna con vegetales, queso chedar, aderezos y papas fritas"
        },
        {
            "id": 5,
            "name": "Pizza de muzzarella",
            "price": 300,
            "description": "De masa casera y el mejor queso muzzarella, aceitunas y condimentos"
        }
    ]
}
```

**Agregar un nuevo producto (solo administradores)**

Para agregar un nuevo producto se debera enviar una peticion POST al endpoint.

```
/api/products
```

se debera enviar en la cabecera de la peticion, el token correspondiente a un usuario administrador y un objeto json con los datos del producto a agregar, de la siguiente manera.

```
{
    "name": "Pizza de muzzarella",
     "price": 300,
     "description": "De masa casera y el mejor queso muzzarella, aceitunas y condimentos"
}
```

El cual devolvera un status: 200 y un mensaje de exito.

**Actualizar un producto (solo administradores)**

Se debe enviar una peticion de tipo PATCH junto con el id del producto en los parametros de la url y el token de administrador en la cabecera de la peticion.

```
/api/products/:id
```

a su vez se debera enviar un JSON con la propiedad a cambiar y su valor (en este caso precio).

```
{
    "price": 500
}
```

**Eliminar producto (solo administradores)**

Para eliminar un producto se debera utilizar el mismo endpoint con el id como parametro en la url pero la peticion debera ser de tipo DELETE junto con el token de administrador.

```
/api/products/:id
```

### Ordenes

**Agregar una nueva orden**

Para agregar una nueva orden se debera enviar una peticion POST junto con el token del usuario.

```
api/order
```

**Actualizar el estado de una orden (solo administradores)**

Se debera enviar una peticion PATCH junto con el token de administrado el endpoint, y en la url el id de la orden que se quiere modificar

```
/api/order/:id
```

**Eliminar una orden (solo administradores)**

Para eliminar una orden se debera enviar el token de administrado y el tipo de peticion debe ser del tipo DELETE el endpoint a usar es:

```
/api/order/:id
```


###Token

Los token sirven para autenticar y autorizar a los usuarios.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9ha2Vuc2hpZWxkIiwiaWQiOjEsImFkZHJlc3MiOiJNaWRkbGUgRWFydGgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTMwNzg2NTB9.Dbt5mRF6iB42Z8T9gmKxpeKwtGbJgk7oevGZ7NIfqnY
```

Dentro del mismo se encuentran los datos del usuario necesarios para las acciones mencionadas en los puntos anteriores.

Durante la etapa de desarrollo se utilizo Postman para el testeo de lo endpoints y la forma de enviar el token en el header de la peticion es bajo la key authorization y el valor es:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9ha2Vuc2hpZWxkIiwiaWQiOjEsImFkZHJlc3MiOiJNaWRkbGUgRWFydGgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTMwNzg2NTB9.Dbt5mRF6iB42Z8T9gmKxpeKwtGbJgk7oevGZ7NIfqnY
```

###Mauricio Ortiz
````
