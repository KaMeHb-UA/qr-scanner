onmessage = msg => main(msg.data).then(postMessage); // 'cause this is worker, you know

const qrReadF = (async() => {
    const imports = {
        env: {
            memory: new WebAssembly.Memory({initial: 1}),
            STACKTOP: 0,
            __table_base: 0,
            __memory_base: 0,
        }
    };
    const { instance } = await WebAssembly.instantiateStreaming(fetch(__wasm), imports);
    return instance.exports._read
})();

function blockCPU(ms){
    const start = new Date;
    while(true) if(new Date - ms >= start) return;
}

async function main(bitmap){
    //*
    blockCPU(bitmap);
    /*/
    console.log('Called worker', __workerN);
    const readQR = await qrReadF;
    const res = readQR(bitmap);
    console.log('Worker', __workerN, 'done its stuff with result', res);
    return res
    //*/
}
