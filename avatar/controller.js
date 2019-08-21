const Avatar = require('./model');

// get all my avatars
const getAvatar = async (req, res) => {
    try {
        const avatar = await Avatar.find();
        res.status(200).send(avatar);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching all");
    }
};

// create avatar
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

// get avatar with ID
const getAvatarId = async (req, res) => {
    try {
        const avatar = await Avatar.findOne({ _id: req.params.id });
        res.status(200).send(avatar);
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Error while fetching avatar id");
    }
};

// get image avatar
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