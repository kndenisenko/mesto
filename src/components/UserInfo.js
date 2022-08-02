export class UserInfo {
  constructor({userNameSelector, occupationSelector }) {
    this._nameElement = document.querySelector(userNameSelector)
    this._professionElement = document.querySelector(occupationSelector)
  
  }

  // вставляем в попап то, что написал пользователь или стандартные значения
  getUserInfo() {
    return{
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent
    }
  }

  // перезапись стандартных значений имени пользователя и профессии
  setUserInfo (title, profession) {
    this._nameElement.textContent = title;
    this._professionElement.textContent = profession;
  }
}