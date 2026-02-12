// Simple income tests
function assert(cond, msg){
  if(!cond){
    console.error('FAIL:', msg);
    process.exit(1);
  }
}

const totalIncome = (txs) => txs.filter(t => t.amount > 0).reduce((a,b)=>a+b.amount,0);

// tests
assert(totalIncome([]) === 0, 'empty -> 0');
assert(totalIncome([{amount: 5}, {amount: -2}]) === 5, 'should total 5');

console.log('Income tests passed');
