const movements = [122, 34, 21, 45, -54, -100, 23];

// console.log(movements);

const largest = movements.findLastIndex(mov => Math.abs(mov) > 30);

console.log(largest);
