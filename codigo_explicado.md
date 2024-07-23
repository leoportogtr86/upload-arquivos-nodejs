### Passo 1: Configuração do Projeto

1. **Inicializar o Projeto**:
    - `npm init -y`: Cria um `package.json` com as configurações padrão.
    - `npm install express multer`: Instala as dependências `express` (framework web) e `multer` (middleware para upload
      de arquivos).

### Passo 2: Criar o Servidor

1. **Importar Dependências**:
    ```javascript
    const express = require('express');
    const multer = require('multer');
    const path = require('path');
    ```
    - Importa o `express` para criar o servidor, o `multer` para gerenciar uploads e o `path` para trabalhar com
      caminhos de diretórios.

2. **Inicializar o Express**:
    ```javascript
    const app = express();
    const port = 3000;
    ```
    - Cria uma aplicação Express e define a porta do servidor.

3. **Configurar o Multer**:
    ```javascript
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    const upload = multer({ storage });
    ```
    - Define a configuração de armazenamento do Multer:
        - `destination`: Define a pasta `uploads/` como o local onde os arquivos serão armazenados.
        - `filename`: Define um nome único para cada arquivo usando o timestamp atual (`Date.now()`) e o nome original
          do arquivo (`file.originalname`).

4. **Servir Arquivos Estáticos**:
    ```javascript
    app.use(express.static(path.join(__dirname, 'public')));
    ```
    - Configura o Express para servir arquivos estáticos da pasta `public`.

5. **Definir a Rota de Upload**:
    ```javascript
    app.post('/upload', upload.single('file'), (req, res) => {
      try {
        res.send(`Arquivo ${req.file.originalname} enviado com sucesso!`);
      } catch (error) {
        res.status(400).send('Erro ao fazer upload do arquivo.');
      }
    });
    ```
    - Cria uma rota POST `/upload` para lidar com o upload de arquivos:
        - `upload.single('file')`: Middleware do Multer que processa um único arquivo enviado com o campo `name="file"`.
        - Se o upload for bem-sucedido, responde com uma mensagem de sucesso.
        - Se houver algum erro, responde com uma mensagem de erro.

6. **Iniciar o Servidor**:
    ```javascript
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
    ```
    - Inicia o servidor na porta definida e imprime uma mensagem no console informando o endereço do servidor.

### Passo 3: Criar a Pasta de Uploads

1. **Criar a Pasta `uploads`**:
    - Na raiz do projeto, crie uma pasta chamada `uploads` para armazenar os arquivos enviados.

### Passo 4: Criar a Interface do Usuário

1. **Criar a Pasta `public`**:
    - Na raiz do projeto, crie uma pasta chamada `public`.

2. **Criar o Arquivo `index.html`**:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Upload de Arquivos</title>
    </head>
    <body>
      <h1>Upload de Arquivos</h1>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
    </html>
    ```
    - Cria um formulário HTML simples que permite ao usuário selecionar um arquivo e enviá-lo para o servidor.
    - O formulário usa `enctype="multipart/form-data"` para permitir o upload de arquivos.

### Passo 5: Rodar o Projeto

1. **Executar o Servidor**:
    - No terminal, execute `node index.js` para iniciar o servidor.
    - Abra o navegador e acesse `http://localhost:3000` para ver a página de upload de arquivos.
    - Selecione um arquivo e clique em "Enviar" para fazer o upload.

Com esses passos, você terá um aplicativo Node.js simples que permite fazer upload de arquivos e armazená-los no
servidor.