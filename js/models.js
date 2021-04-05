"use strict";

const BASE_URL = "http://127.0.0.1:5000";

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({ username, userId, favTeamId }) {
    this.username = username;
    this.userId = userId;

    // instantiate Story instances for the user's favorites and ownStories
    // this.favTeamId = Null;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password) {
    const response = await axios.post(`${BASE_URL}/api/users/register`, {
      username,
      password,
    });
    console.log(`this is the signup ${response}`);
    //////////////////////////////////
    //This functionality was broken on the original file, but the instructions said it was supposed to be working from the start
    let new_user = new User(response.data.user);
    console.log(`this is a new user from signup`, new_user);
    return new_user;
  }

  static async checkSession() {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/api/users/session`,
      withCredentials: true,
    });

    let sess_user = new User(response.data.user);
    console.log(`this is a session user`, sess_user);
    return sess_user;
  }
}
