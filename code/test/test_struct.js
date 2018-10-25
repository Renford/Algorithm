const struct = require('../struct')

var obj = new struct.MinStack()
obj.push(2147483646)
obj.push(2147483646)
obj.push(2147483647)
console.log(obj.top())
obj.pop()
console.log(obj)

console.log(obj.getMin())
obj.pop()
console.log(obj.getMin())
obj.pop()
obj.push(2147483647)

console.log(obj.top())
console.log(obj.getMin())
obj.push(-2147483648)
console.log(obj.top())
obj.pop()
console.log(obj.getMin())

const str = '{[]}{}{'
const result = struct.isValid(str)
console.log('result === ', result)
