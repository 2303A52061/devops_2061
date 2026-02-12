// Simple expenses tests
function assert(cond, msg){
  if(!cond){
    console.error('FAIL:', msg);
    process.exit(1);
  }
}

const isExpense = (t) => t.amount < 0;
const filterExpenses = (txs) => txs.filter(isExpense);

// tests
assert(filterExpenses([]).length === 0, 'no txs -> 0');
assert(filterExpenses([{amount: -5}, {amount: 10}]).length === 1, 'should have 1 expense');

console.log('Expenses tests passed');
