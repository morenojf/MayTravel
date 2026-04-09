// once the user has loged in the signed string is generated
// jwt.sign()

// JWT STRUCT
// xxxxx.yyyyy.zzzzz

// HEADER
// {
//   "alg": "HS256",  algorithm used for encriptation
//   "typ": "JWT" type of token
// }

import jwt from 'jsonwebtoken'

export default function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET)
}
