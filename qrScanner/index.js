import reader from './reader.js'

console.log({reader});

// tests for fibonacci generator
document.body.innerHTML = '<pre style="width:100%;height:100%;overflow:auto;color:white;margin:5%"></pre>';
const pre = document.body.children[0];
function echo(text){
    pre.innerText += text + '\n'
}

setTimeout(async () => {
    echo('starting tests...');
    echo('sync stage:');
    //echo(await test1());
    echo('threaded stage:');
    //echo(await test2());
}, 2000)

async function test1(){
    const start = new Date;
    const testStack = [];
    for(let i = 0; i < 400; i++) testStack.push(() => reader());
    for(let i = 0; i < testStack.length; i++) await testStack[i]();
    const end = new Date;
    return end - start
}

async function test2(){
    const start = new Date;
    const testStack = [];
    for(let i = 0; i < 400; i++) testStack.push(reader());
    await Promise.all(testStack);
    const end = new Date;
    return end - start
}

export default null
