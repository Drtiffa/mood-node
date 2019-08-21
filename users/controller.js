const User = require('./model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const BCRYPT_SALT_ROUNDS = 10;

// get all users
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching all");
    }
};

// create user
const createUser = async (req, res) => {
    const { email, password, confirmedPassword } = req.body;
    try {
        if (!email || !password || !confirmedPassword) {
            throw 'all fields are required'
        } 

        if (password != confirmedPassword) {
            throw 'password is different than confirmed password'
        }
            
        const hash = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

        // je crée un objet qui va me permettre de récuperer ce que l'utilisateur entre suivant le model
        const newUser = {
            email: email,
            password: hash
        };

        // ici je crée un utilisateur et je gere les erreurs
        User.create(newUser, (err) => {
            if (err) {
                res.json({ "resultType": "failure", "resultMessage": 'error when creating the user' });
            } else {
                res.json({ "resultType": "success", "resultMessage": "Account successfully created." });
            }  
        });
    }
    catch (error) {
        res.json({ "resultType": "failure", "resultMessage": error });
    }
};

// login
const authUser = async (req, res) => {
    const { email, password } = req.body;
    let isSamePassword;
    let user;

    try {
        user = await User.findOne({email});

        if (!user) {
            throw 'This user not exist'
        }

        isSamePassword = await bcrypt.compareSync(password, user.password)

        if (!isSamePassword) {
            throw 'Bad password'
        }
        var token = jwt.sign({ email }, 'shhhhh'); // si bien connecter alors renvoi token
        res.json({ "resultType": "success", "resultMessage": "You are successfully logged in.", "token": token })
    } catch (error) {
        console.log("Error authenticating user");
        console.log(error);
        res.json({ "resultType": "failure", "resultMessage": "Wrong credentials." });
    } 
}

// modify user information
const updateUser = (req, res) => {
    User.findOneAndUpdate(
        { _id : req.params.id }, {
            $set: req.body // $set est une methode mongodb qui en faisant une boucle va recuperer l'objet (User) et le remplir via l'id
        },
        (err, result) => {
            if (err) {
                res.status(200).send(err);
            } else {
                res.status(200).send(result);
            }
        }
    );
};

// delete user
const deleteUser = (req, res) => {
    User.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.status(200).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}

module.exports = {
    getAll,
    createUser,
    authUser,
    updateUser,
    deleteUser
}