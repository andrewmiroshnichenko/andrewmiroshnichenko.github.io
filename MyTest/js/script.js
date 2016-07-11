Array.prototype.reduce2 = function reduce(func, init, arr){
	bla = (arr) ? arr : this;
    if ((init !== undefined) && bla.length) {
      	return reduce(func, func(init, bla[0]), bla.slice(1))
      } else if (bla.length) {
      	return reduce(func, func(bla[0], bla[1]), bla.slice(2))
      } 
      return init;
}

function add(a, b) {
	return a + b
}

function mul(a, b) {
	return a * b
}

function foo(a, b) {
	return a.concat(b)
}

var a = [1, 2, 3, 4];

console.log(a.reduce(add), a.reduce2(add)) // 10 10
console.log(a.reduce(add, 10), a.reduce2(add, 10)) // 20 20
console.log(a.reduce(mul), a.reduce2(mul)) // 24 24
console.log(a.reduce(foo, ''), a.reduce2(foo, '')) // 1234 1234