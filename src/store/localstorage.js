import Basestore from './basestore.js'

export default class Localstorage extends Basestore{
    constructor(key, expire= '1D') {
        super(localStorage, key, expire)
    }
}
