import workers from './workers.js'

console.log({workers});

export default class {
    static async read(bitmap){
        return (await qrReadF)(bitmap)
    }
}
