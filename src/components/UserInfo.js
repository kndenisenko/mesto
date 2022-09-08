export class UserInfo {
  constructor({userNameSelector, occupationSelector, avatarSelector}) {
    this._nameElement = document.querySelector(userNameSelector)
    this._professionElement = document.querySelector(occupationSelector)
    this._avatar = document.querySelector(avatarSelector)
  }


  getUserInfo() {
    return{
      name: this._nameElement.textContent,
      profession: this._professionElement.textContent,
      avatar: this._avatar.style.backgroundImage
    }
  }
  

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._professionElement.textContent = about;

  }


  getAvatar() {
    return {
      
      avatar: this._avatar.style.backgroundImage,
    };
  }

  setAvatar(avatar) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }


}