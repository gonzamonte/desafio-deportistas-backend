const knex = require("../config/knexfile");

exports.mostrarDeportistas = (req, res) => {
  knex("deportistas")
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.buscarDeportista = (req, res) => {
  const id = Number(req.params.id);
  knex("deportistas as de")
    .where("de.id", "=", id)
    .join("deportistas_estadisticas as es", "de.id", "es.id")
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
