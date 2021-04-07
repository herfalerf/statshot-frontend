"use strict";

const BASE_URL = "http://localhost:5000";

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
    const response = await axios.post(
      `${BASE_URL}/api/users/register`,
      {
        username,
        password,
      },
      { withCredentails: true }
    );
    console.log(`this is the signup ${response}`);
    //////////////////////////////////
    //This functionality was broken on the original file, but the instructions said it was supposed to be working from the start
    let newUser = new User(response.data.user);
    console.log(`this is a new user from signup`, newUser);
    return newUser;
  }

  static async login(username, password) {
    const response = await axios.post(
      `${BASE_URL}/api/users/login`,
      {
        username,
        password,
      },
      { withCredentails: true }
    );
    console.log(response);
    //////////////////////////////////
    //This functionality was broken on the original file, but the instructions said it was supposed to be working from the start
    let returnUser = new User(response.data.user);
    console.log(`this is a new user from signup`, returnUser);
    return returnUser;
  }

  static async checkSession() {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/api/users/session`,
      withCredentials: true,
    });

    console.log(response.data);

    let sessUser = new User(response.data.user);

    return sessUser;
  }

  // static async checkSession() {
  //   const response = await axios.get(
  //     `${BASE_URL}/api/users/session`,
  //     {},
  //     {
  //       withCredentails: true,
  //     }
  //   );

  //   console.log(response.data);

  //   let sessUser = new User(response.data.user);

  //   return sessUser;
  // }

  static async logout() {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/api/users/logout`,
      // withCredentials: true,
    });
    console.log(response.data);
    return response;
  }
}

async function ping() {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/ping`,
    withCredentials: true,
  });

  console.log(response);
  return response;
}
