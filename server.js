const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, { cors: { origin : "*" } });

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index")
})

io.on("connection", socket => {
    socket.on("join-room", (RoomId, UserId) => {    
        socket.join(RoomId);
        console.log("New user", RoomId, UserId)
        socket.to(RoomId).emit("user-connected", UserId);
        socket.on("disconnect", () => {
            socket.to(RoomId).emit("user-disconnected", UserId);
        })
    });
});

server.listen(3000)
