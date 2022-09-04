class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  loadInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  loadProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  addnewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  setLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  }

}



export const api = new Api ({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "98760490-2f6a-4756-8d3f-d350bd1b865c",
    "Content-Type": "application/json",
  },
});
