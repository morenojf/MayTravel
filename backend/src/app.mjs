// importación de configuración del servidor
import { app, port } from './configs/server.mjs'

// traduccion de req.body a json
import express from 'express'

// middlewares
import './middlewares/cors.mjs'

// importación de rutas desde el archivo routing. mjs
import { routing } from './configs/routing.mjs'

// aplicamos middlewares y rutas antes de arrancar el servidor
app.use(express.json())
app.use('/', routing)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
