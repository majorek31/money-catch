const express = require('express');
const data = require('../database');
const router = express.Router();

router.post('/login', async (req, res) => {
    if (req?.body?.name === undefined)
        return res.sendStatus(400);
    const name = req.body.name;
    if (data.user.userExists(name))
        return res.sendStatus(401);
    data.user.registerUser(name);
    return res.cookie("name", name).sendStatus(200);
});

router.get('/points', async (req, res) => {
    if (req?.cookies?.name === undefined)
        return res.sendStatus(400);
    const name = req.cookies.name;
    if (!data.user.userExists(name))
        return res.sendStatus(404);
    return res.send(String(data.user.getPointsByName(name)));
});
router.post('/points', async (req, res) => {
    if (req?.cookies?.name === undefined)
        return res.sendStatus(400);
    if (req?.body?.points === undefined)
        return res.sendStatus(400);
    const name = req.cookies.name;
    const points = req.cookies.points;
    if (!data.user.userExists(name))
        return res.sendStatus(404);
    return res.send(data.user.updateScore(name, points) ? "Updated" : "Not Updated");
});
module.exports = router;