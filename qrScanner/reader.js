import workers from './workers.js'
import 'https://cdn.jsdelivr.net/gh/YuzuJS/setImmediate@1/setImmediate.js'

function getNearestFreeWorker(){
    let i = 0;
    for(; i < workers.length; i++){
        if(!workers[i].inUse){
            workers[i].inUse = true;
            return workers[i]
        }
    }
}

function _getNextWorker(r){
    let w = getNearestFreeWorker();
    if(w) r(w); else setImmediate(_getNextWorker, r)
}

function getNextWorker(){
    return new Promise(_getNextWorker)
}

export default async bitmap => {
    const w = await getNextWorker();
    const res = await w.worker(bitmap);
    w.inUse = false;
    return res
}
