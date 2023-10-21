const express = require("express");
const app = express()
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { path: '/socket', addTrailingSlash: false, cors: '*' });

io.on("connection", (socket) => {
    socket.on("test", (obj) => {
        socket.emit('test', obj)
    })

    socket.on('join', (obj) => {
        socket.join(obj.id)
    })
    socket.on('leave', (obj) => {
        socket.leave(obj.id)
    })

    socket.on("posted", (obj) => {
        socket.to(obj.id).emit('posted', obj)
    })
    socket.on("postliked", (obj) => {
        socket.to(obj.id).emit('postliked', obj)
    })

    socket.on("commented", (obj) => {
        socket.to(obj.post).emit('commented', obj)
    })
    socket.on("commentLiked", (obj) => {
        socket.to(obj.id).emit('commentLiked', obj)
    })

    socket.on('typing', (obj) => {
        socket.to(obj.id).emit('typing', obj)
    })

    // socket.on('disconnect', () => disconnect(socket.id))
});

app.use(express.json())

// routes

app.use('/socket', (req, res) => {
    res.status(200).end()
})


app.use((req, res) => {
    res.status(404).json({ success: false, message: 'page not found' })
});


server.listen(5000, () => console.log('server running'))