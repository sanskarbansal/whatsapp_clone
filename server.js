const express = require("express");

const path = require("path");
const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const server = app.listen(PORT, () => {
    console.log("Server started on port: ", PORT);
});

// ------------- Socket IO Code -------------

const socketIo = require("socket.io");
const io = socketIo(server);
io.on("connection", (socket) => {
    socket.on("joined", async (uid) => {
        try {
            socket.uid = uid;
            await db.collection("users").doc(uid).update({
                isOnline: true,
            });
        } catch (err) {}
    });
    socket.on("disconnect", async () => {
        try {
            await db.collection("users").doc(socket.uid).update({
                isOnline: false,
            });
        } catch (err) {}
    });
});
