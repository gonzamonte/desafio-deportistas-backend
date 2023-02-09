const express = require("express");

const {
  mostrarDeportistas,
  buscarDeportista,
} = require("../controllers/deportistas");

const router = express.Router();

router.get("/deportistas", mostrarDeportistas);
router.get("/buscar/:id", buscarDeportista);

module.exports = router;
