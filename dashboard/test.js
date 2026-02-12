// Simple dashboard test
function assert(cond, msg){
  if(!cond){
    console.error('FAIL:', msg);
    process.exit(1);
  }
}

const calculateSummary = (transactions) => {
  return transactions.reduce((acc, t) => acc + t.amount, 0);
};

// tests
assert(calculateSummary([]) === 0, 'empty transactions should be 0');
assert(calculateSummary([{amount: 10}, {amount: -5}]) === 5, 'sum should be 5');

console.log('Dashboard tests passed');
