// this file should contain the JWT validation for accesing protected routes.
// usando jwt.verify()

import jwt from 'jsonwebtoken'

export default function validateToken(req, res, next) {
  // extrae el token de la cabecera donde la clave es authorization y el valor el token con la palabra Bearer antes
  const authCookie = req.cookies['token']

  // valida que el token exista, de lo contrario deniega
  if (!authCookie) {
    res.status(401).json({ error: 'Access denied' })
    return
  }

  // decodifica el token usando la palabra secreta
  jwt.verify(authCookie, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // si el token no coincide con la palabra secreta entonces lo deniega
      res.status(403).json({ error: 'Invalid session token' })
      return
    } else {
      // si todo es correcto, tatua en la peticion:

      // 1. Id del usuario
      req.userId = user.id

      // 2. nombre de usuario
      req.username = user.username

      // 3. email
      req.userEmail = user.email

      // 4. role
      req.userRole = user.role

      next()
    }
  })
}
