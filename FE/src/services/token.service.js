import { findIndexByAttribute } from "~/helper/format";
class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return `Bearer ${user?.token}`;
  }

  getRole(rolename) {
    const user = JSON.parse(localStorage.getItem("user"));
    findIndexByAttribute(user?.roles, "name", rolename)
    return findIndexByAttribute(user?.roles, "name", rolename) >= 0;
  }


  getCredentialUser() {
    return JSON.parse(localStorage.getItem("credentials"));
  }
  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getUserRoleName() {
    // console.log(JSON.parse(localStorage.getItem("user")).roles[0].name)
    return JSON.parse(localStorage.getItem("user"))?.roles[0].name;
  }

  getCredentials() {
    return JSON.parse(localStorage.getItem("credentials"));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  setCredential({ username, password }) {
    localStorage.setItem('credentials', JSON.stringify({ username, password }))
  }
  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
