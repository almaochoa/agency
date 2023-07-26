# agency
API for validate encrypted messages

**Endpoints List**
- **localhost:4000/messages/message1** <br/>
  @params message1 nombre del archivo que debe estar ubicado en el directorio **"encmsgs"** <br/>
  @return dos renglones con la palabra "SI" o la palabra "NO" si el mensaje correspondiente existe en el mensaje encriptado
  <br/>En caso de algun error regresa un json con la siguiente estructura estructura (`'{success:false, error: descripcion del error}'`)
- **localhost:4000/messages** <br/>
  @return lista de los archivos que existen en el directorio **"encmsgs"** <br/>Json de respuesta tiene la siguiente estructura (`{"encrypted_messages": "message1"`})

**Testing**
  - De forma local usar el archivo **"testEncryptedMessage.http"** haciendo click en la instrucción (`Send Request`) se ejecuta la llamada GET a los metodos descritos arriba




