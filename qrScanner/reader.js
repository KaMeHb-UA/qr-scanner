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

function _getNextWorker(r){
    let resolved = false;
    workers.forEach(w => {
        if(!w.inUse){
            resolved = true;
            w.inUse = true;
            r(w)
        }
    });
    if(!resolved) setImmediate(_getNextWorker.bind(null, r));
}

function getNextWorker(){
    return new Promise(_getNextWorker)
}

function asyncWorker(worker){
    return val => new Promise(r => {
        worker.onmessage = e => {
            worker.onmessage = null;
            r(e.data)
        };
        worker.postMessage(val)
    })
}

export default async bitmap => {
    const w = await getNextWorker();
    const res = await asyncWorker(w.worker)(bitmap);
    w.inUse = false;
    return res
}
