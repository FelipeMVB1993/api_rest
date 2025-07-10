import app from './app.js';

const porta = 3001;
app.listen(porta, () => {
  console.log(`Servidor escutando em http://localhost:${porta}`);
});

