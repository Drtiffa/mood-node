const Avatar = require('./model');

// je recupere tous mes avatars
const getAvatar = async (req, res) => {
    try {
        const avatar = await Avatar.find();
        res.status(200).send(avatar);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching all");
    }
};

// function qui me permet d'avoir des ID random 
function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

// je crée un avatar
const createAvatar = async (req, res) => {

    const { actualImage } = req.body;

    const newAvatar = {
        avatar: actualImage,
        uniqueId: guid()
    };

    Avatar.create(newAvatar, (err) => {
        if (err) {
            res.json({ "resultType": "failure", "resultMessage": "error when creating the avatar" });
        } else {
            res.json({ "resultType": "success", "resultMessage": "Avatar successfully created.", "imgUId": newAvatar.uniqueId });
        }  
    });
}

module.exports = {
    getAvatar,
    createAvatar
}