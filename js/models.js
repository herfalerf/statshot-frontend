"use strict";

const BASE_URL = "http://127.0.0.1:5000";

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({ username, favTeamId }) {
    this.username = username;

    // instantiate Story instances for the user's favorites and ownStories
    this.favTeamId = Null;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password) {
    const response = await axios({
      url: `${BASE_URL}/api/users/register`,
      method: "POST",
      data: { username: username, password: password },
    });

    //////////////////////////////////
    //This functionality was broken on the original file, but the instructions said it was supposed to be working from the start
    return new User(response.data.user, response.data.token);
  }
}
