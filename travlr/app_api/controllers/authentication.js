const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// REGISTER - Enregistrer un nouvel utilisateur
const register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ "message": "All fields required" });
        }

        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save();  // ← Utiliser await au lieu de callback

        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        res.status(404).json(err);
    }
};

// LOGIN - Connecter un utilisateur
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(404).json(err);
        }
        if (user) {
            const token = user.generateJwt();
            return res.status(200).json({ token });
        }
        return res.status(401).json(info);
    })(req, res);
};

module.exports = {
    register,
    login
};
