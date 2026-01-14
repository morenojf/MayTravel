import {app} from "./configs/server.mjs"
import cors from 'cors'



app.use(cors({
  origin: 'http://localhost:3000', // Solo permite tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
