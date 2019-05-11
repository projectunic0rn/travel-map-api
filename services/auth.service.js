var jwt = require('jsonwebtoken');
const { tokenSecret } = require('../secrets/secret');


let returnUserToken = (user) => {
    token = jwt.sign({ user_id: user.id }, tokenSecret);
    return {"token": token}
}


module.exports = {
    returnUserToken
}