const User = require('./model');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 10;

// je recupere tous mes utilisateurs
const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching all");
    }
};

// je créer un utilisateur
const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw 'all fields are required'
        }   
            
        const hash = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

        // je créer un objet qui va me permettre de récuperer ce que l'utilisateur entre suivant le model
        const newUser = {
            email: email,
            password: hash
        };

        // ici j'envoie notre objet en BBD via une methode mongoose
        User.create(newUser, (err, res_create) => {
            if (err) { 
                res.status(500).send(err); 
            } else {
                res.status(200).send("use register with success");
            }    
        });
    }
    catch (error) {
        res.status(200).send(error);
    }
};

// je me connecte a mon compte utilisateur
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
        res.send(user);
    } catch (error) {
        console.log("Error authenticating user");
        console.log(error);
        res.status(403).send(error);
    } 
}

// je modifie des informations utilisateur
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

// je supprime un utilisateur
const deleteUser = (req, res) => {
    User.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.status(200).send(err);
        } else {
            res.status(200).send(result);
        }
    })
}

// jexporte mes methodes
module.exports = {
    getAll,
    createUser,
    authUser,
    updateUser,
    deleteUser
}