const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        let user = await newUser.save();
        res.status(201).json({message: `Utilisateur crée: ${user.email}`})
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Requête invalide"});
    }
};

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(500).json({message: "utilisateur non trouvé"});
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            res.status(401).json({message: "Email ou mot de passe incorrect"});
            return;
        }

        const userData = {
            id: user._id, 
            email: user.email,
            role: user.role
        };
        const token = await jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "10h"});
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Une erreur s'est produite lors du traitement"});
    }
};