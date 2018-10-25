/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.dataArray = []
  this.minValue = Number.MAX_VALUE
  this.minArray = []
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.dataArray.push(x)
  if (x === this.minValue) {
    this.minArray[this.minArray.length - 1].count += 1
  } else if (x < this.minValue) {
    this.minValue = x

    let last = this.minArray.pop
    if (last === undefined || last.value === undefined) {
      this.minArray.push({
        value: x,
        count: 1
      })
    } else {
      last.count += 1
      this.minArray.push(last)
    }
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  const val = this.dataArray.pop()
  if (val === this.minValue && this.minArray.length > 0) {
    let last = this.minArray[this.minArray.length - 1]
    if (last.count > 1) {
      last.count -= 1
    } else {
      this.minArray.pop()
      if (this.minArray.length > 0) {
        this.minValue = this.minArray[this.minArray.length - 1].value
      } else {
        this.minValue = Number.MAX_VALUE
      }
    }
  }
}

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (this.dataArray.length === 0) {
    return undefined
  }
  return this.dataArray[this.dataArray.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.minValue
}

module.exports = {
  MinStack: MinStack
}
