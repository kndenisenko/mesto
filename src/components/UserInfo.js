export class UserInfo {
  constructor({userNameSelector, occupationSelector, avatarSelector}) {
    this._nameElement = document.querySelector(userNameSelector)
    this._professionElement = document.querySelector(occupationSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

 // вставляем в попап то, что написал пользователь или стандартные значения
  getUserInfo() {
    return{
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent
    }
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = about;
  }

 // метод заменён на API
 // перезапись стандартных значений имени пользователя и профессии
//  setUserInfo (title, profession) {
//    const testApi = new Api('https://mesto.nomoreparties.co/v1/cohort-46/users/me');
//    testApi.changeUser(title, profession)
//    .then(data => {
//    profileName.textContent = data.name
//    profileAbout.textContent = data.about
//    profileAvatar.src = data.avatar
// })
//   // this._nameElement.textContent = title;
//   // this._professionElement.textContent = profession;
//  }
}