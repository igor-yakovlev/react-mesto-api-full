class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      credentials: "include",
    })
    .then(this._checkResponse)
  }

  setCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: "include",
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: "include",
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this.baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this.headers,
        credentials: "include",
      })
      .then(this._checkResponse)
    }
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      credentials: "include",
    })
    .then(this._checkResponse)
  }

  setUser(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }

  setAvatar({avatar}) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-type': 'application/json'
  },
});

export default api;