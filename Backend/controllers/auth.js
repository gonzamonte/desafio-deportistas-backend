const knex = require("../config/knexfile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken, TOKEN_SECRET } = require("../middlewares/validate-jwt");

exports.register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    email: req.body.email,
    password: password,
  };

  knex("usuarios_deportistas")
    .insert(newUser)
    .then(() => {
      res.status(200).json({ success: true, newUser: newUser });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  knex("usuarios_deportistas")
    .where("email", email)
    .then(async (userDB) => {
      let user = userDB[0];
      console.log(user);

      const validPassword = await bcrypt.compare(password, user.password); //COMPARA LA PASS "PELADA" CON LA ENCRIPTADA
      if (!validPassword) {
        return res.status(400).json({ error: "Contraseña no válida" });
      }
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        TOKEN_SECRET
      );
      res.json({ error: null, data: "Login exitoso", token });
    });
};
