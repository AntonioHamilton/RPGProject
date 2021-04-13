import User from '@user/model/index'

test('it should be ok', () => {
  const user = new User()
  user.name = 'Chat'

  expect(user.name).toEqual('Chat')
})
