import reader from './reader.js'

console.log({reader});

export default class {
    static async read(bitmap){
        return (await qrReadF)(bitmap)
    }
}
