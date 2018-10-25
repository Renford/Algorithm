/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const letBracket = '{[('
  const rightBracket = '}])'
  let arr = []
  for (let i = 0; i < s.length; i++) {
    const char = s.slice(i, i + 1)
    if (letBracket.indexOf(char) !== -1) {
      arr.push(char)
    } else if (rightBracket.indexOf(char) !== -1) {
      const left = arr.pop()
      console.log('right ====', left, char, getRightBracket(left))
      if (getRightBracket(left) !== char) {
        return false
      }
    }
  }

  return arr.length > 0 ? false : true
}

var getRightBracket = function(c) {
  let bracket = ''
  if (c === '{') {
    bracket = '}'
  } else if (c === '[') {
    bracket = ']'
  } else if (c === '(') {
    bracket = ')'
  }

  return bracket
}

module.exports = {
  isValid: isValid
}
