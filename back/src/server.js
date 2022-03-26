import app from "./app.js";
import {createServer} from "http";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
})

const PORT = 3000;

server.listen(PORT, () => {
	console.log(`App listening on port http://localhost:${PORT}`);
});
