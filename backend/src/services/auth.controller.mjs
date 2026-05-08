import jwt from 'jsonwebtoken'

export default function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET)
}
