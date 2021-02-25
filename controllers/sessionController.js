const {Account} = require('../models/')
const bcrypt = require('bcrypt');
const e = require('express');

class SessionController {
    static register (req, res) {
        let query = req.query.err
        res.render('register', {query})
    }

    static newAccount (req, res) {
        Account.create({
            name : req.body.name,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        })
        .then (data => {
            res.render('registerComplete')
        })
        .catch (err => res.send(err))
    }

    static login (req, res) {
        let query = req.query.err
        res.render('login', {query})
    }

    static checkAccount (req, res) {
        Account.findOne({
            where : {
                username : req.body.username
            }
        })
        .then (data => {
            let pwDB = data.password
            let pw = req.body.password
            const value = bcrypt.compareSync(pw, pwDB)
            if (data && value) {
                let cookie = {
                    id : data.id,
                    username : data.username,
                    name : data.name
                }
                req.session.currentSession = cookie
                res.render('loginComplete')
            } else {
                let fatal = "wrong username/password"
                res.redirect(`/login?err=${fatal}`)
            }
        })
        .catch (err => {
            let fatal = "wrong username/password"
            res.redirect(`/login?err=${fatal}`)
        })
    }

    static logout (req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.render('logoutComplete')
            }
        })
    }
}

module.exports = SessionController