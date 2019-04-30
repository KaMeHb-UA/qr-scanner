let wasm = `import.meta.url`.split('/');
wasm.pop();
wasm = wasm.join('/') + '/reader.wasm';
console.log({ wasm });

export default (async function() {
    const imports = {
        env: {
            memory: new WebAssembly.Memory({initial: 1}),
            STACKTOP: 0,
        }
    };
    const { instance } = await WebAssembly.instantiateStreaming(fetch(wasm), imports);
    return instance.exports._read
})()
