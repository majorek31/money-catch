const users = []
function registerUser(name) {
    users.push({name: name, points: 0});
}
function removeUser(name) {
    users = users.filter((entry) => {
        return entry.name != name;
    });
}
function getUserByName(name) {
    for (const user of users) {
        if (user.name == name)
            return user;
    }
    return null;
}
function userExists(name) {
    const user = getUserByName(name);
    return user ? true : false;
}
function getPointsByName(name) {
    return getUserByName(name)?.points;
}

function updateScore(name, points) {
    for (const user of users) {
        if (user.name == name) {
            if (user.points < points) {
                user.points = points;
                return 1;
            }
            else {
                return 0;
            }
        }
    }
}

module.exports = {
    user: {
        getPointsByName,
        registerUser,
        removeUser,
        userExists,
        updateScore
    },
}