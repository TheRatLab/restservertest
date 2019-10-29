require('./config/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/users', (req, res) => {
    res.json('get user')
})

app.post('/users', (req, res) => {
    let body = req.body;
    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'Name is rquired'
        })
    } else {
        res.json({ someone: body })
    }

})

app.put('/users/:id', (req, res) => {
    let id = req.params.id
    res.json({ id })
})

app.delete('/users', (req, res) => {
    res.json('delete user')
})

app.listen(process.env.PORT, () => {
    console.log("listening to port: ", process.env.PORT);
})