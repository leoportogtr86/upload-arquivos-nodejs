const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const PORT = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({storage});
app.use(express.static(path.join(__dirname, 'public')));

app.post("/upload", uploads.single("file"), (req, res) => {
    try {
        res.send(`Arquivo ${req.file.originalname} enviado com sucesso!`);
    } catch (error) {
        res.status(400).send("Erro ao realizar upload");
    }
})

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log("Estamos online!");
})