import workers from './workers.js'

const setImmediate = (() => {
    var head = {},
        tail = head;
    var ID = Math.random();

    window.addEventListener('message', e => {
        if (e.data != ID) return;
        head = head.next;
        var func = head.func;
        delete head.func;
        func()
    });

    return func => {
        tail = tail.next = {
            func: func
        };
        window.postMessage(ID, "*")
    }
})();

function getNearestFreeWorker(){
    let i = 0;
    for(; i < workers.length; i++){
        if(!w.inUse){
            resolved = true;
            w.inUse = true;
            return w
        }
    }
}

function _getNextWorker(selfBound, r){
    let w = getNearestFreeWorker();
    if(w) r(w); else setImmediate(selfBound)
}

function getNextWorker(){
    return new Promise(r => {
        var f = _getNextWorker.bind(null, f, r);
        f()
    })
}

export default async bitmap => {
    const w = await getNextWorker();
    const res = await w.worker(bitmap);
    w.inUse = false;
    return res
}
