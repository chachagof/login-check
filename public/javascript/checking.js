// the function is used to check email and password 
function check(user, emailCheck, passwordCheck) {
  const result = user.find(element => {
    return element.email === emailCheck || element.password === passwordCheck
  })
  return result
}

module.exports = check