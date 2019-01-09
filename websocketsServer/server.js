const WS = require("ws").Server
const port = 5001
const server = new WS({ port })

server.on("connection", ws => {

  ws.on("message", message => {
    console.log(`Received: ` + message)

    for(let client of server.clients) {
      if(client !== ws)
        client.send(message);
    }
  })

  ws.on("close", event => {
    console.log("A client was disconnected...")
  })

  console.log("New client connected...")
})