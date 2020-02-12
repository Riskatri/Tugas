/*const express = require("express");
const app = express();
app.listen(3000,() => {
  console.log("server is listening on port: 3000");
});*/

const express = require("express");
const morgan = require('morgan');
const PORT = 4000;
const ADDRESS = "localhost";
const app = express();


app.use(morgan('combined'));
app.use(express.json());

const { check, validationResult } = require('express-validator');

app.post('/user', [
  check('nama'),
  check('email').isEmail(),
  check('username'),
  check('password').isLength({ min: 5 }),
  check('konfirmasi_password').custom((value, {req}) => {
  if(value !== req.body.password){
    throw new Error('Password confirmation does notmatch password');
  }
  return true;
})
], (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = {
    nama: req.body.nama,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    konfirmasi_password: req.body.konfirmasi_password
  };
  res.status(200).json(user);
}
);
app.listen((ADDRESS,PORT), () => {
  console.log(`server is listening on port: http://${ADDRESS}: ${PORT}`);
});