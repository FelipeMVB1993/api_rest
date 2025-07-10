import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      },
    });
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      if (!aluno) {
        return res.json({
          'status': false,
          'mensagem': 'Aluno não encontrado.'
        });
      }
      return res.json(aluno);
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json({
        'status': true,
        'mensagem': 'Aluno cadastrado com sucesso.',
        'Dados do aluno': aluno
      });
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.json({
          'status': false,
          'mensagem': 'Aluno não encontrado.'
        });
      }
      const alunoAtualizado = await aluno.update(req.body);
      return res.json({
        'status': true,
        'mensagem': 'Aluno atualizado com sucesso.',
        'Dados do aluno': alunoAtualizado
      });
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) {
        return res.json({
          'status': false,
          'mensagem': 'Aluno não encontrado.'
        });
      }
      await aluno.destroy();
      return res.json({
        'status': true,
        'mensagem': 'Aluno deletado com sucesso.'
      });
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

}

export default new AlunoController();
