console.log('starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 10000);

setTimeout(() => {
  console.log('Hey Fuckers');
}, 0);

console.log('FINISHING UP');
