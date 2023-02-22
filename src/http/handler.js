export function HttpHandler() {
    const urlUser = process.env.BACKEND_URL + "/api/users";
    const urlProduct = process.env.BACKEND_URL + "/api/products";
    const urlLogin = process.env.BACKEND_URL + "/login";
    const urlRegister = process.env.BACKEND_URL + "/register";
    //   const urlLoginRegister = 'https://3001-jgonzalez89-subastaecom-gezkrcrw27i.ws-eu87.gitpod.io/login';

    const contentType = {
        "Content-Type": "application/json",
    };

    async function getUser() {
        const response = await fetch(urlUser, {
            method: "GET",
        });
        return await response.json();
    }

    async function getUserById(id) {
        const response = await fetch(`${urlUser}/${id}`, {
            method: "GET",
        });
        return await response.json();
    }

    async function postUser(payload) {
        const response = await fetch(urlUser, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: contentType,
        });
        return await response.json();
    }

    async function putUserById(id, payload) {
        const response = await fetch(`${urlUser}/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: contentType,
        });
    }

    async function deleteUserById(id) {
        const response = await fetch(`${urlUser}/${id}`, {
            method: "DELETE",
            headers: contentType,
        });

        return response.status === 200 ? true : false;
    }

    async function getProduct() {
        const response = await fetch(urlProduct, {
            method: "GET",
        });
        return await response.json();
    }

    async function getProductById(id) {
        const response = await fetch(`${urlProduct}/${id}`, {
            method: "GET",
        });
        return await response.json();
    }

    async function postProduct(payload) {
        const response = await fetch(urlProduct, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jsonResponse = await response.json();
        if (response.ok) {
            return jsonResponse;
        } else {
            console.error(
                `Request failed with status ${response.status}: ${jsonResponse.message}`
            );
            // Handle the error here by displaying an error message to the user or logging it to the console.
        }
    }

    async function putProductById(id, payload) {
        const response = await fetch(`${urlProduct}/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: contentType,
        });
    }

    async function deleteProductById(id) {
        const response = await fetch(`${urlProduct}/${id}`, {
            method: "DELETE",
            headers: contentType,
        });

        return response.status === 200 ? true : false;
    }

    async function register(email, password) {
        const response = await fetch(urlRegister, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: contentType,
        });

        return response.json();
    }

    async function login(email, password) {
        try {
            console.log("Enviando datos al backend:", email, password);
            const response = await fetch(urlLogin, {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: contentType,
            });

            const data = await response.json();
            console.log("Respuesta del backend:", data);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    return {
        getUser,
        getUserById,
        postUser,
        putUserById,
        deleteUserById,
        getProduct,
        getProductById,
        postProduct,
        putProductById,
        deleteProductById,
        login,
        register,
    };
}