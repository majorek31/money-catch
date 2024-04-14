const PrismaClient = require('@prisma/client');
const prisma = new PrismaClient.PrismaClient();

async function registerUser(name) {
    await prisma.user.create({
        data: {
            name: name,
            points: 0,
        },
    });
}
async function removeUser(name) {
    await prisma.user.delete({
        where: { name: name }
    });
}
async function getUserByName(name) {
    return await prisma.user.findFirst({
        where: { name: name }
    });
}
async function userExists(name) {
    const user = await getUserByName(name);
    return user ? true : false;
}
async function getPointsByName(name) {
    if (!await userExists(name))
        return 0;
    const user = await prisma.user.findFirst({
        where: {
            name: name
        }
    });
    return user.points;
}
async function shouldUpdateScore(name, newScore) {
    const user = await prisma.user.findFirst({
        where: {
            name: name
        }
    });
    if (user.points < newScore)
        return true;
    return false;
}

async function updateScore(name, points) {
    if (!(await shouldUpdateScore(name, points)))
        return false;
    await prisma.user.update({
        where: {
            name: name
        },
        data: {
            points: points
        }
    });
    return true;
}
async function getScoreBoard() {
    const list = await prisma.user.findMany({
        orderBy: {
            points: 'desc'
        }
    });
    return list;
}

module.exports = {
    user: {
        getPointsByName,
        registerUser,
        removeUser,
        userExists,
    },
    score: { 
        updateScore,
        shouldUpdateScore,
        getScoreBoard
    },
}