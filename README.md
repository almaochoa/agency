# agency
API for validate encrypted messages

**Endpoints List**
- **localhost:4000/messages/message1** <br/>
  @params message1 nombre del archivo que debe estar ubicado en el directorio **"encmsgs"** <br/>
  @return dos renglones con la palabra "SI" o la palabra "NO" si el mensaje correspondiente existe en el mensaje encriptado
  <br/>En caso de algun error regresa un json con la siguiente estructura estructura (`{success:false, error: descripcion del error}`)
- **localhost:4000/messages** <br/>
  @return lista de los archivos que existen en el directorio **"encmsgs"** <br/>Json de respuesta tiene la siguiente estructura (`{"encrypted_messages": "message1"}`)

**Build proyect**
- Abrir consola en el directorio del proyecto
- Ejectutar
-   npm install
-   npm build
-   npm run dev 

**Testing**
  - Desde el navegador acceder a localhost:4000/messages/message1 donde message1 es el nombre del archivo a procesar
  - Desde el proyecto usar el archivo **"testEncryptedMessage.http"** haciendo click en la instrucción (`Send Request`) se ejecutan la llamada GET a los metodos descritos arriba




