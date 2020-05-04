export default () => {
  const consonants = "bcdfghjklmnpqrstvwxyz".split("");
  const vowels = "aeiou".split("");
  let password = "";
  for (let i = 0; i < 3; i++) {
    password += consonants[Math.floor(Math.random() * consonants.length)];
    password += vowels[Math.floor(Math.random() * vowels.length)];
  }
  password += Math.random().toString().substr(2, 2);
  return password;
}