

export class PostsApi {

    constructor() {
        this.BASE_API_URL = "/api"
    }

    getAllPosts() {
        return axios.get(`${this.BASE_API_URL}/posts`)
    }

    deletePost(id) {
        return axios.delete(`${this.BASE_API_URL}/posts/${id}`)
    }

    createPost(post) {
        return axios.post(`${this.BASE_API_URL}/posts`, post)
    }

    updatePost(id,post) {
        return axios.patch(`${this.BASE_API_URL}/posts/${id}`, post)
    }
}


