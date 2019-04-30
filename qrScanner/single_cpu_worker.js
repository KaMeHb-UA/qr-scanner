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

onmessage = async msg => {
    console.log('Called worker', __workerN);
    const readQR = await qrReadF;
    const res = readQR(msg.data);
    console.log('Worker', __workerN, 'done its stuff with result', res);
    postMessage(res)
}
