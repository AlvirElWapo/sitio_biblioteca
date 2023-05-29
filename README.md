# sitio_biblioteca
Este fue el proyecto que se realizó para la clase Bases de datos avanzadas con el profesor Benjamín

#requisitos# 
Nodejs (LTS o Latest) 
npm 
  -express
  -express-session
  -dotenv
  -mysql
  

#instrucciones#

1 descargar los archivos en el repositorio, te permitirá descargarlo utilizando git clone o descargando el archivo .zip
  1.1 Si descargaste el archivo.zip, descomprimirlo
2 abrir una terminal o cli (también incluye cmd pa windowzzzz) 
3 ir a la carpeta donde descargaste los archivos.
4 escribir "npm init" y llenar los campos requeridos, si no quieres ingresar o conoces alguno solo presiona enter.
5 utilizando npm, instalar las dependencias de librerías mencionadas en #requisitos#. 
  5.1 comando: "npm install express express-session dotenv mysql"
6 revisar el archivo llamado .env dentro de tu carpeta, en él deberás ingresar las credenciales de tu base de datos.
7 para crear tu base de datos, el archivo sql estará en la carpeta database/, desde una línea de comandos podrás ingresar
  el comando sql "source **dirección de tu archivo** para ejecutar los contenidos del archivo automáticamente.
8 Finalmente, para la ejecución del servidor, colocar en tu línea de comandos "node server.js" y tu servidor estará disponible
  en el puerto que le hayas colocado, por default está en el puerto 3000. (para éste paso debes abrir tu navegador y colocar: 
  localhost:3000).
  
  #Notas Importantes
1 Las distintas páginas a desplegar se encuentran en los archivos contenidos en la carpeta "html".
2 La lógica del programa así como las instrucciones de ejecución de la aplicación se encuentran en "server.js".
