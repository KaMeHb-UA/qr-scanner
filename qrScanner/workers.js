const __dirname = (() => {
    let parts = import.meta.url.split('/');
        parts.pop();
    return parts.join('/')
})();

const wasm = __dirname + '/reader.wasm',
    worker = __dirname + '/single_cpu_worker.js';

function jsFromCode(code){
    return 'data:application/javascript;base64,' + btoa(code)
}

//const workerLink = jsFromCode(`const __wasm=${JSON.stringify(wasm)},__workerN=${i};importScripts(${JSON.stringify(worker)})`);

let workerList = [];

function asyncWorker(worker){
    return val => new Promise(r => {
        worker.onmessage = e => {
            worker.onmessage = null;
            r(e.data)
        };
        worker.postMessage(val)
    })
}

for (let i = 0; i < window.navigator.hardwareConcurrency; i++){
    workerList.push({
        worker: asyncWorker(new Worker(jsFromCode(`const __wasm=${JSON.stringify(wasm)},__workerN=${i};importScripts(${JSON.stringify(worker)})`))),
        inUse: false
    })
}

export default workerList
