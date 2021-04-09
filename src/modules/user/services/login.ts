import jwt from 'jsonwebtoken'
import User from '@user/model/index'
import { authenticate } from '@libs/encrypter'

export const authorization = async (req, res) => {
  try {
    let email = ''
    req.body.email && req.body.password ? email = req.body.email : res.status(400).send('email or password is invalid')

    const user = await User.findOne({ email })

    if (!user) { return res.status(404).send("this user don't exists!") };

    const auth = await authenticate(user.password, req.body.password)

    if (!auth) { return res.status(401).send('Password is invalid') }

    const { name, role, _id } = user

    const token = jwt.sign({
      name, email, role, _id
    }, 'RPGPR0J3CT', {
      expiresIn: 60 * 60
    })

    return res.status(200).send({ token })
  } catch (err) {
    return res.status(500).send('Erro no servidor ao autenticar')
  }
}

export const isAuthorizated = async (req, res, next) => {
  try {
    const BearerToken = req.headers.authorization
    if (!BearerToken) { return res.status(400).send('Token não enviado') }
    const token = BearerToken.split(' ')[1]
    const payload = jwt.verify(token, 'RPGPR0J3CT')
    req.payload = payload
    next()
  } catch (err) {
    return res.status(400).send(err)
  }
}
