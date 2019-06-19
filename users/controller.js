const User = require('./model');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 10;

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching all");
    }
};

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

const authUser = async (req, res) => {
    const { email, password } = req.body;
    let isSamePassword;
    let user;

    try {
        user = await User.findOne({email});

        if (!user) {
            throw 'Cet user n\'existe pas, je suis trop déso'
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