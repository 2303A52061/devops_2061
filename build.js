const fs = require('fs');

const modules = ['dashboard','expenses','income'];
for(const m of modules){
  if(!fs.existsSync(`./${m}`)){
    console.error('Missing module', m);
    process.exit(1);
  }
}

console.log('Building application from modules:', modules.join(', '));
// simulate build
setTimeout(()=> console.log('Build complete'), 300);
