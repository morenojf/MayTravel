// ejecuta proyecto con: 
// node --watch --env-file=.env src/app.mjs

// importación de configuración del servidor
import {app, port} from "./configs/server.mjs"

// traduccion de req.body a json
import express from 'express'

// importación de rutas desde el archivo routing. mjs
import { routing } from "./configs/routing.mjs"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json());
app.use('/', routing)