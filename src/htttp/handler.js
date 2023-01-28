// Desde este Constructor llamamos a la API del back

export class HttpHandler {
    constructor() {
        this.url = "http://127.0.0.1:3245/items" // Sustituir esta url por el endpoint de la API
        this.contentType = { 'Content-Type': 'application/json' }
    }

    async get() {
        const response = await fetch(this.url, {
            method: "GET",
        })
        return await response.json()
    }

    async post(payload) {
        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: this.contentType
        })
        return await response.json()
    }

    async put(id, payload) {
        const response = await fetch(`${this.url}/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: this.contentType
        })
    }

    async delete(id) {
        const response = await fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: this.contentType
        })

        return response.status === 200 ? true : false
    }
}