const express = require('express');
const data = require('../database');
const router = express.Router();

router.post('/login', async (req, res) => {
    if (req?.body?.name === undefined)
        return res.sendStatus(400);
    const name = req.body.name;
    if (!await data.user.userExists(name))
        await data.user.registerUser(name);
    return res.cookie("name", name).sendStatus(200);
});

router.get('/points', async (req, res) => {
    if (req?.cookies?.name === undefined)
        return res.sendStatus(400);
    const name = req.cookies.name;
    if (!await data.user.userExists(name))
        return res.sendStatus(404);
    return res.send({
        name: name,
        points: await data.user.getPointsByName(name)
    });
});
router.post('/points', async (req, res) => {
    if (req?.cookies?.name === undefined)
        return res.sendStatus(400);
    if (req?.body?.points === undefined)
        return res.sendStatus(400);
    const name = req.cookies.name;
    const points = req.body.points;
    if (points >= 50000)
        return res.send("ić stond");
    if (!await data.user.userExists(name))
        return res.sendStatus(404);
    return res.send((await data.score.updateScore(name, points)) ? "Updated" : "Not Updated");
});

router.get('/scoreboard', async (req, res) => {
    return res.send(await data.score.getScoreBoard());
});
module.exports = router;