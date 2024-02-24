const fetchUsers = (): void => {
  if (getCachedUsers()) {
    showUsers();
    return;
  }
  fetch("https://api.slingacademy.com/v1/sample-data/users?offset=10&limit=30")
    .then((response: Response) => response.json())
    .then(({ users }) => {
      const preparedUsers: Array<string> = prepareUsers(users);
      cacheUsers(preparedUsers);
      showUsers();
    })
    .catch((error) => console.log(error));
};
const prepareUsers = (
  users: Array<{
    profile_picture: string;
    first_name: string;
    last_name: string;
  }>
): Array<string> => {
  return users.map(({ profile_picture, first_name, last_name }) => {
    return `<li>
                <img src=${profile_picture}>
                ${first_name + " " + last_name} 
            </li>`;
  });
};

const cacheUsers = (users: Array<string>): void => {
  localStorage.setItem("users", JSON.stringify(users));
};
const getCachedUsers = (): Array<string> => {
  return JSON.parse(localStorage.getItem("users"));
};

const showUsers = (preparedUsers: Array<string> = getCachedUsers()): void => {
  preparedUsers.forEach((user: string) => {
    document
      .querySelector("#contacts-list")
      .insertAdjacentHTML("beforeend", user);
  });
};

const getSingleUser = (user_id: number): Promise<object> => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.slingacademy.com/v1/sample-data/users/${user_id}`)
      .then((response) => response.json())
      .then(({ user }) => resolve(user))
      .catch((error) => reject(error));
  });
};

export { getSingleUser, fetchUsers };
 