import Swal from "sweetalert2";

export default class Alert{

    ask(data){
        return Swal.fire({
            title: data.title,
            text: data.message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: data.confirm
        })
    }

    askDelete(){
        return this.ask({
            title: "Are you sure you want to delete this?",
            message: "You won't be able to revert this!",
            confirm: "Yes delete it!",
        })
    }

    askUpdate(){
        return this.ask({
            title: "Are you sure?",
            message: "Update this credentials!",
            confirm: "Yes update it!",
        })
    }

    success(data){
        return Swal.fire(
            data.title ?? "Success!",
            data.message,
            'success'
        )
    }

    error(title,msg){
        return Swal.fire(
            title,
            msg,
            'error'
        )
    }

    warning(title,msg){
        return Swal.fire(
            title,
            msg,
            'warning'
        )
    }

}

