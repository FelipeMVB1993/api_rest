import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors.map(e => e.message)
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email']});
      if (users.length < 1) {
        return res.json({
          'status': false,
          'mensagem': 'Não existem usuários cadastrados.',
        });
      }
      return res.json(users);
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors.map(e => e.message)
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.json({
          'status': false,
          'mensagem': 'Usuário não encontrado.',
        });
      }
      const { id, nome, email} = user;
      return res.json({ id, nome, email});
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.json({
          'status': false,
          'mensagem': 'Usuário não encontrado.',
        });
      }
      const usuarioAtualizado = await user.update(req.body);
      const { id, nome, email } = usuarioAtualizado;
      return res.json({ id, nome, email });
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.json({
          'status': false,
          'mensagem': 'Usuário não encontrado.',
        });
      }
      const usuarioDeletado = await user.destroy(req.body);
      const { id, nome, email} = usuarioDeletado;
      return res.json({
        'status': true,
        'Dados do usuário deletado': { id, nome, email },
      });
    } catch (erro) {
      return res.status(400).json({
        errors: erro.errors ? erro.errors.map(e => e.message) : ['Erro interno no servidor.'],
      });
    }
  }

}

export default new UserController();
