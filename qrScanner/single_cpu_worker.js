console.log('Worker:', {__wasm});

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
