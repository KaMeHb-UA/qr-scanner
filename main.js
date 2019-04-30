import QrScanner from 'https://cdn.jsdelivr.net/npm/qr-scanner@1/qr-scanner.min.js'
QrScanner.WORKER_PATH = 'https://cdn.jsdelivr.net/npm/qr-scanner@1/qr-scanner-worker.min.js'

(async () => {
    const hasCamera = await QrScanner.hasCamera();
    if(hasCamera){
        const videoElem = document.querySelector('video'),
            qrScanner = new QrScanner(videoElem, onDecode);

        qrScanner.setInversionMode('both');

        function onDecode(result){
            alert('decoded qr code:', result)
        }
    } else document.body.classList.add('no-camera')
})()
