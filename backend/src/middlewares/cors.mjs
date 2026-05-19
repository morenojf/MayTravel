import cors from 'cors'
import { app } from '../configs/server.mjs'

app.use(
  process.env.NODE_ENV !== 'production'
    ? cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    : cors({
        origin: 'https://may-travel-frontend-nextjs.vercel.app',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
)
