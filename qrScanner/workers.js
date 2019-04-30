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

const workerLink = jsFromCode(`const __wasm=${JSON.stringify(wasm)};importScripts(${JSON.stringify(worker)})`);

let workerList = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
    let newWorker = {
        worker: new Worker(workerLink),
        inUse: false
    };
    workerList.push(newWorker)
}

export default workerList
