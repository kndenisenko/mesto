// Старое api

export class Api {
  constructor(url){
    this._url = url
  }

  // метод для вывода дефолтных карточек и информации о пользователе
  getdefaultStuff() {
    return fetch(this._url, {
      method: 'GET',
      headers: {
        authorization: '98760490-2f6a-4756-8d3f-d350bd1b865c'
      }
    })
    .then(res => { 
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`not ok with code ${res.status}`)
      }
    } )
    .catch((err) => {
      console.error(err);
      return [];
    })
  }

  // метод для изменения имени и профессии юзера
  changeUserInfo(username, profession) {
    return fetch(this._url, {
      method: 'PATCH',
      'Content-Type': 'application/json',
      headers: {
        authorization: '98760490-2f6a-4756-8d3f-d350bd1b865c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        about: profession
      })
    })
    .then(res => { 
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`not ok with code ${res.status}`)
      }
    } )
    .catch((err) => {
      console.error(err);
      return [];
    })
  }

  addUserCard(cardName, cardUrl){
    return fetch(this._url, {
      method: 'POST',
      'Content-Type': 'application/json',
      headers: {
        authorization: '98760490-2f6a-4756-8d3f-d350bd1b865c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardUrl
      })
    })
    .then(res => { 
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`not ok with code ${res.status}`)
      }
    } )
    .catch((err) => {
      console.error(err);
      return [];
    })
  }

  changeUserPhoto(newavatar) {
    return fetch(this._url, {
      method: 'PATCH',
      'Content-Type': 'application/json',
      headers: {
        authorization: '98760490-2f6a-4756-8d3f-d350bd1b865c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newavatar
      })
    })
    .then(res => { 
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`not ok with code ${res.status}`)
      }
    } )
    .catch((err) => {
      console.error(err);
      return [];
    })
  }

  deleteCard(id){
    return fetch(`${this._url}${id}`, {
      method: 'DELETE',
      'Content-Type': 'application/json',
      headers: {
        authorization: '98760490-2f6a-4756-8d3f-d350bd1b865c',
        'Content-Type': 'application/json'
      },
    })
    .then(res => { 
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`not ok with code ${res.status}`)
      }
    } )
    .catch((err) => {
      console.error(err);
      return [];
    })
  }

}