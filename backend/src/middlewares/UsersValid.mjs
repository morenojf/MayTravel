export const validateInfo = (req, res, next) => {
  const userInfo = req.body

  if (!userInfo.username || userInfo.username?.length > 50) {
    return res.status(400).send({ mssg: 'Error en el formato de usuario' })
  }

  if (!userInfo.password || userInfo.username?.length > 255) {
    return res.status(400).send({ mssg: 'Error en el formato de contraseña' })
  }

  if (!userInfo.email || userInfo.email?.length > 255) {
    return res.status(400).send({ mssg: 'Error en el formato de email' })
  }

  next();
};
