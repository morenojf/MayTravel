// Este archivo importa, inicializa y exporta el model de la base de datos mysql
import { Client } from 'pg'

const pgdb = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'MayTravel'
})

await pgdb.connect()
export const db = pgdb





// IMPORTANTE, TODAS LAS PETICIONES A LA BASE DE DATOS DEBEN LLEVAR AWAIT INCLUIDA LA CONEXION PRINCIPAL Y LAS LLAMADAS DE FUNCIONES ASYNCRONAS
