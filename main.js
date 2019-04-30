import QrScanner from './qrScanner/index.js';

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
