class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }

  getRoleUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.roles;
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
