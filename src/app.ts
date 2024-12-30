import express, { Response, Request } from "express"
import path from "path"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", {id: socket.id, ...data})
    })
    
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })
})


app.get("/", (req: Request, res: Response) => {
    res.render("index", {
        title: "Welcome to Tracking app"
    })
})

const PORT = 8080
httpServer.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))