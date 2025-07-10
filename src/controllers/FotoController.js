import fs from 'fs';
import path from 'path';
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';
import Aluno from '../models/Aluno';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (erro) => {
      if (erro) {
        return res.status(400).json({
          errors: [erro.code],
        });
      }
      try {
        if (!req.file) {
          return res.status(400).json({
            errors: ['Nenhum arquivo enviado.'],
          });
        }
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const aluno = await Aluno.findByPk(aluno_id);
        if (!aluno) {
          const filePath = path.resolve(__dirname, '..', '..', 'uploads', 'images', filename);
          fs.unlink(filePath, (erro) => {
            if (erro) console.error('Erro ao deletar arquivo:', erro);
          });
          return res.status(400).json({ errors: ['Aluno não encontrado.'] });
        }
        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch (erro) {
        return res.status(500).json({
          errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
        });
      }
    });
  }
}

export default new FotoController();
