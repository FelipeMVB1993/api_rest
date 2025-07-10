class HomeController {
  index(req, res) {
    res.json('Bem-vindo');
  }
}
export default new HomeController();
