import User from '@user/models'

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
    const { name, email, password, picture } = req.body
    await User.create({
      name,
      email,
      password,
      picture
    })
    res.status(201).send('user created')
  } catch (err) {
    if (err.code === 11000) {
      res.status(404).send('this user already exists')
    }
    res.status(500).send("Something's going wrong")
  }
}
