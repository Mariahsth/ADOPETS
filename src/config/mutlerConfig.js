//mutlerConfig.js

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';  // Importa fileURLToPath para obter __dirname

// Converte a URL do arquivo atual para o caminho absoluto
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);  // Agora __dirname está definido corretamente

// Caminho absoluto para a pasta de imagens no diretório raiz
const uploadsPath = path.resolve(__dirname, '../uploads');

// Verifica se a pasta de imagens existe e cria se não existir
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true }); // Cria a pasta e subpastas, se necessário
}

// Configuração do filtro de arquivos para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/; // Tipos de imagem permitidos
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Arquivo válido
  } else {
    cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas.'));
  }
};

// Configuração do multer para salvar a imagem no disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Certifica-se de que o diretório está correto
    cb(null, uploadsPath); // Salva as imagens no diretório correto
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; // Define o nome do arquivo com a data
    cb(null, filename);
  },
});

// Configuração do multer
const upload = multer({
  storage,
  fileFilter,  // Passa o fileFilter para validar os arquivos
  limits: { fileSize: 5 * 1024 * 1024 },  // Limite de 5 MB
});

export { upload };
