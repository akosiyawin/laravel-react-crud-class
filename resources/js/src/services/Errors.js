export default class Errors {
    constructor() {
        this.errors = {}
    }

    getErrors(){
        return this.errors
    }

    setErrors(errors){
        this.errors = errors.response.data.errors
    }

    getKey(key){
        //If error does not exist return false instead of an uncatch error
        return (this.errors[key] !== undefined) ? this.errors[key] : false
    }

    reset(){
        this.errors = {}
    }
}
