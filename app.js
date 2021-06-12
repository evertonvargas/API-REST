const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/animaisDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lifeMax: Number,
});
const Animal = mongoose.model("Animal", animalSchema);

app.get("/animais", (req, res) => {
  Animal.find((err, animais) => {
    if (!err) {
      if (animais.length === 0) {
        res.send("Nenhum animal cadastrado ainda");
      } else {
        res.send(animais);
      }
    } else {
      console.log(err);
    }
  });
});

app.post("/animais", (req, res) => {
  console.log(req.body);
  const animalCreate = new Animal({
    name: req.body.animal,
    lifeMax: req.body.lifeMax,
  });
  animalCreate.save()
    .then(() => {
      res.send("Cadastro efetuado com sucesso");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});
