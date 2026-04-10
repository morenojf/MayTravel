// importación de configuración del servidor
import { app, port } from './configs/server.mjs'
import validateToken from './middlewares/auth.mjs'

// traduccion de req.body a json
import express from 'express'

// traduccion de cookies
import cookieParser from 'cookie-parser'

// middlewares
import './middlewares/cors.mjs'

// importación de rutas (publics, protected)
import { publicRouting } from './configs/public-routing.mjs'
import { routing } from './configs/routing.mjs'

// aplicamos middlewares y rutas antes de arrancar el servidor
app.use(express.json())
app.use(cookieParser())

app.use('/auth', publicRouting)
app.use('/api', validateToken, routing)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
