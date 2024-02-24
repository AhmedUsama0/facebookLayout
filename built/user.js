const fetchUsers = () => {
    if (getCachedUsers()) {
        showUsers();
        return;
    }
    fetch("https://api.slingacademy.com/v1/sample-data/users?offset=10&limit=30")
        .then((response) => response.json())
        .then(({ users }) => {
        const preparedUsers = prepareUsers(users);
        cacheUsers(preparedUsers);
        showUsers();
    })
        .catch((error) => console.log(error));
};
const prepareUsers = (users) => {
    return users.map(({ profile_picture, first_name, last_name }) => {
        return `<li>
                <img src=${profile_picture}>
                ${first_name + " " + last_name} 
            </li>`;
    });
};
const cacheUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
const getCachedUsers = () => {
    return JSON.parse(localStorage.getItem("users"));
};
const showUsers = (preparedUsers = getCachedUsers()) => {
    preparedUsers.forEach((user) => {
        document
            .querySelector("#contacts-list")
            .insertAdjacentHTML("beforeend", user);
    });
};
const getSingleUser = (user_id) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.slingacademy.com/v1/sample-data/users/${user_id}`)
            .then((response) => response.json())
            .then(({ user }) => resolve(user))
            .catch((error) => reject(error));
    });
};
export { getSingleUser, fetchUsers };
