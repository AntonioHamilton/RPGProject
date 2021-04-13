import sendEmail from '@libs/email'
import User from '@user/model'
import emailRecoveryPassword from '@constants/emails/recoveryPassword'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({ name: 1, email: 1, picture: 1, _id: 1 })
    return res.status(200).json(users)
  } catch (err) {
    res.status(500).send("Something's going wrong on getAllUsers")
  }
}

export const getMyProfile = async (req, res) => {
  try {
    const { _id } = req.payload
    const profile = await User.find({ _id }).select({ _id: 0, name: 1, email: 1, picture: 1, role: 1, phone: 1, myRooms: 1, favoriteRooms: 1 })
    return res.status(200).json(profile)
  } catch (err) {
    res.status(500).send("Something's going wrong on getAllUsers")
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
      res.status(400).send('This user already exists')
    }
    res.status(500).send("Something's going wrong on createUser")
  }
}

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.payload
    const body = req.body
    await User.updateOne({ _id }, {
      $set: body
    })
    return res.status(200).send('user updated')
  } catch (err) {
    return res.status(500).send("Something's going wrong on updateUser")
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { _id } = req.payload
    const { password } = req.body
    await User.updateOne({ _id }, {
      password
    })
    return res.status(200).send('password updated')
  } catch (err) {
    return res.status(500).send("Something's going wrong on resetPassword")
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.payload
    await User.deleteOne({ _id })
    return res.status(200).send('user deleted')
  } catch (err) {
    return res.status(500).send("Something's going wrong on deleteUser")
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
    res.status(500).send("Something's going wrong on recoveryPassword")
  }
}
