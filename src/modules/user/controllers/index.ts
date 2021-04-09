import sendEmail from '@libs/email'
import User from '@user/model'
import emailRecoveryPassword from '@constants/emails/recoveryPassword'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).send("Something's going wrong")
  }
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password, picture, phone } = req.body
    await User.create({
      name,
      email,
      password,
      picture,
      phone
    })
    res.status(201).send('user created')
  } catch (err) {
    if (err.code === 11000) {
      res.status(404).send('This user already exists')
    }
    res.status(500).send("Something's going wrong")
  }
}

export const recoveryPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    const newPassword = Math.random().toString(36).slice(-10)
    if (user) {
      await sendEmail(emailRecoveryPassword(email, user.name, newPassword)).then(async sended => {
        await user.updateOne({
          password: newPassword
        })
        res.status(200).send('We send the email')
      }).catch(() => {
        res.status(500).send("We can't send the email")
      })
    } else {
      res.status(404).send("This user don't exists")
    }
  } catch (err) {
    res.status(500).send("Something's going wrong")
  }
}
