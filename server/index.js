const express = require('express')

const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
})

const port = 5001

//test
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

// connect to client
io.on('connection', (socket) => {
    console.log('connected with client')
    // socket.on('disconnect', () => {
    //     console.log('disconnected')
    // })
    // get message from client
    socket.on('send_message', (data) => {
        console.log(data)

        io.emit('received_message', data)
    })
})

server.listen(port, () => {
    console.log('listening on ${port}')
})
