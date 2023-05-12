export default function (user = {}, action) {
  let newUser=user
  if (action.type === 'addUser') {
    console.log('reducer user: ',action)
    newUser=action.user
    return newUser
  } else if (action.type === 'logout') {
    console.log('logout')
    return {}
  } else {
    return newUser
  }
}
