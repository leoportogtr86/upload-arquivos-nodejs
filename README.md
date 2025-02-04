# Uploads de Arquivos com Node.js

![img.png](img.png)

## Introdução

O upload de arquivos é uma funcionalidade comum em aplicações web, permitindo que os usuários enviem arquivos para o
servidor. Node.js é uma plataforma popular para desenvolvimento de aplicações web, e existem várias bibliotecas que
facilitam o upload de arquivos, como o `multer`.

Para criar um aplicativo simples de exemplo que realiza upload de arquivos usando Node.js, você pode seguir os passos
abaixo. Esse exemplo usará o framework Express e a biblioteca `multer` para gerenciar o upload dos arquivos.

### Passo 1: Configurar o Projeto

1. Crie uma nova pasta para o projeto.
2. Dentro dessa pasta, abra um terminal e execute os comandos:

```bash
npm init -y
npm install express multer
```

### Passo 2: Criar o Servidor

1. Crie um arquivo chamado `index.js` na raiz da pasta do projeto.
2. Adicione o seguinte código a esse arquivo:

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.send(`Arquivo ${req.file.originalname} enviado com sucesso!`);
    } catch (error) {
        res.status(400).send('Erro ao fazer upload do arquivo.');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
```

### Passo 3: Criar a Pasta de Uploads

Crie uma pasta chamada `uploads` na raiz do projeto para armazenar os arquivos enviados.

### Passo 4: Criar a Interface do Usuário

1. Crie uma pasta chamada `public` na raiz do projeto.
2. Dentro da pasta `public`, crie um arquivo `index.html` com o seguinte conteúdo:

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

### Passo 5: Rodar o Projeto

1. No terminal, dentro da pasta do projeto, execute o comando:

```bash
node index.js
```

2. Abra seu navegador e acesse `http://localhost:3000`. Você verá a página de upload de arquivos. Selecione um arquivo e
   clique em "Enviar" para fazer o upload.

Esse exemplo simples configura um servidor Node.js usando Express e Multer para gerenciar o upload de arquivos. O
arquivo enviado será armazenado na pasta `uploads` com um nome único gerado a partir do timestamp atual.