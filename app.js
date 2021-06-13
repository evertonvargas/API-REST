const express = require("express")
const mongoose = require("mongoose")
const port = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/animaisDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lifeMax: Number,
});
const Animal = mongoose.model("Animal", animalSchema)

app.route("/animais")

.get((req, res) => {
  Animal.find((err, animais) => {
    if (!err) {
      if (animais.length === 0) res.send("Nenhum animal cadastrado ainda")
      else res.send(animais)
    } else {
      console.log(err)
    }
  })
})

.post((req, res) => {
  const animalCreate = new Animal({
    name: req.body.animal,
    lifeMax: req.body.lifeMax,
  });
  animalCreate.save()
    .then(() => {
      res.send("Cadastro efetuado com sucesso")
    }).catch((err) => {
      res.send(err)
    })
})

.delete((req, res) => {
  Animal.deleteMany(function (err) {
    if (!err) res.send("Todos os animais foram deletados com sucesso")
    else res.send(err)
  })
});

app.route("/animais/:animal")
.get((req,res)=>{
  console.log("Get animal")
  console.log(req.params)
  Animal.find({name: req.params.animal},(err, result)=>{
    if(!err){
      if(result) res.send(result)
      else res.send("Nenhum animal encontrado")
    }else{
      res.send(err)
    }
  })
})

.patch((req,res)=>{
  Animal.updateOne(
    {name:req.params.animal},
    {name:req.body.animal, lifeMax: req.body.lifeMax}, 
    function(err){
      if(!err){
        res.send("Animal atualizado com sucesso")
      }else{
        res.send(err)
      }
    });
})

.delete((req,res)=>{
  Animal.deleteOne({name:req.params.animal}, err=>{
    if(!err)res.send("Animal foi deletado com sucesso")
    else res.send(err)
  })
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`)
});
