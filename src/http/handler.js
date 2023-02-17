export function HttpHandler() {

  const url ="http://127.0.0.1:3001/api/users";
  const contentType = { "Content-Type": "application/json" };

  async function get() {
    const response = await fetch(url, {
      method: "GET",
    });
    return await response.json();
  }

  async function getUserById(id) {
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
    });
    return await response.json();
  }

  async function post(payload) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: contentType,
    });
    return await response.json();
  }

  async function put(id, payload) {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: contentType,
    });
  }

  async function del(id) {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: contentType,
    });

    return response.status === 200 ? true : false;
  }

  return { get, getUserById, post, put, del };
}
// export default HttpHandler;

