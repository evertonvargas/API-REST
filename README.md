## :computer: Criando API REST 
Esse projeto permitiu entender melhor como funcionam os https verbs e sua associação com o CRUD de um database. Entendi melhor também request e response, assim como, o app.route() do expressjs.

## HTTP request methods
- POST: inserir
- GET: ler
- PATCH: atualizar
- DELETE: deletar

## CRUD
- CREATE
- READ
- UPDATE
- DELETE

## Request e Response
Request é quando eu faço uma requisição(pedido), posso passar valores também.
Exemplo:
Tenho essa rota na minha API
```Javascript
app.route("/animais")
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
```

No Postman faço um método *POST* para a url da requisição *localhost:3000/animais* com o body:
```Json
{
    "animal":"Pinguim-Imperador",
    "lifeMax": 20
}
```
Response é a resposta dada por essa solicitação.

:warning: requisição e solicitação são sinônimos.



