const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())


const users = []

const myFirstMiddleware = (request, response, next) => {
    console.log("Fui chamado")
    next()
}

app.use(myFirstMiddleware)

app.get('/users', (request, response) => {
    return response.json(users)
});

app.post('/users', (request, response) => {
    const {name, age} = request.body;

    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)

});

app.put('/users/:id', (request, response) => {
    const {id} = request.params
    const {name, age} = request.body

    const updateUser = {id, name, age}

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).send({message: "User not found"})
    }

    users[index] = updateUser

    console.log(index)

    return response.json(updateUser)
})

app.delete('/users:id', (request, response) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0 ){
        return response.status(404).json({message: "User deleted"})
    }

    users.splice(index,1)
    return response.status(204).json(users)
})


app.listen (port, () => {
    console.log(`O projeto está rodando na porta ${port}`);
});
