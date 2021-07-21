export function validateEmail(email) {
  var patt = /^\S+@\S+\.\S+$/;
  if(email.match(patt)) return true;
  return false;
}

// username must be unique
export function validateUsername(name, usernames) {
  if(usernames.some(d => d.toLowerCase() === name.toLowerCase())) {
    return false;
  }
  return true;
}