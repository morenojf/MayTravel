import { Client } from 'pg'

// 1. Si estamos en Railway, usamos la URL completa (es lo ideal)
// 2. Si estamos en local, construimos el objeto solo si las variables existen
const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.POSTGRES_DB || 'MayTravel'
    }

const pgdb = new Client(config)

// Es buena práctica usar un bloque try-catch para ver si la conexión falla
try {
  await pgdb.connect()
  console.log('Conectado a la base de datos con éxito')
} catch (err) {
  console.error('Error conectando a la base de datos:', err)
}

export const db = pgdb

// IMPORTANTE, TODAS LAS PETICIONES A LA BASE DE DATOS DEBEN LLEVAR AWAIT INCLUIDA LA CONEXION PRINCIPAL Y LAS LLAMADAS DE FUNCIONES ASYNCRONAS
