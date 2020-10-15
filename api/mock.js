const bodyParser = require("body-parser")
const app = require("express")()

const links = {}



app.use(bodyParser.json())
app.post("/", (req, res) => {
    const key = req.body.key
    const text = req.body.text
    links[key] = text
    console.log(links);
  res.status(201).send()
})

app.get('/link/:uuid', (req, res)=>{
    res.status(200).json(links[req.params.uuid])
})
module.exports = app