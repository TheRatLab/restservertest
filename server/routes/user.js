const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken, verifyAdmin_Role } = require('../middleware/authentication');

const app = express();


app.get('/users', verifyToken, (req, res) => {


    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({ state: true }, 'name mail role state google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, count) => {

                res.json({
                    ok: true,
                    users,
                    thereAre: count
                });

            });


        });


});


app.post('/users', [verifyToken, verifyAdmin_Role], (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        mail: body.mail,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {
            // userDB.password = null;
            res.json({
                ok: true,
                user: userDB
            })
        }
    });

})

app.put('/user/:id', [verifyToken, verifyAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'mail', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            user: userDB
        });

    })

});

app.delete('/user/:id', [verifyToken, verifyAdmin_Role], (req, res) => {


    let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userErased) => {

    let changeState = {
        state: false
    };

    User.findByIdAndUpdate(id, changeState, { new: true }, (err, userErased) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!userErased) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userErased
        });

    });



});


module.exports = app;