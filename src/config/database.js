require('dotenv').config();

module.exports = {
  dialect: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), // <- transformado em número
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    connectTimeout: 10000, // <- adicionado para aumentar o tempo de espera
    timezone: 'America/Sao_Paulo',
  },
  timezone: '-03:00',
};
