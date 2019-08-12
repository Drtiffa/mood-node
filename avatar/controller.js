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

// je crée un avatar
const createAvatar = async (req, res) => {

    const { actualImage } = req.body;

    const newAvatar = {
        avatar: actualImage
    };

    Avatar.create(newAvatar, (err, result) => {
        if (err) {
            console.error("Error", err);
            res.json({ "resultType": "failure", "resultMessage": "error when creating the avatar" });
        } else {
            res.json({ "resultType": "success", "resultMessage": "Avatar successfully created.", "imgUId": result._id });
        }  
    });
}

// je récupere un avatar grace a son ID
const getAvatarId = async (req, res) => {
    try {
        const avatar = await Avatar.findOne({ _id: req.params.id });
        res.status(200).send(avatar);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching avatar id");
    }
};

// je récupere un l'image de mon avatar
const getAvatarImage = async (req, res) => {
    try {
        const avatar = await Avatar.findOne({ _id: req.params.id });
        var base64Data = avatar.avatar.replace('data:image/png;base64,', '');

        var img = Buffer.from(base64Data, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching avatar id");
    }
}

module.exports = {
    getAvatar,
    createAvatar,
    getAvatarId,
    getAvatarImage
}