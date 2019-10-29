const jwt = require('jsonwebtoken');


// verify token
let verifyToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'invalid token'
                }
            });
        }

        req.user = decoded.user;
        next();

    });



};

// verifyRole
let verifyAdmin_Role = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'User is not an admin'
            }
        });
    }
};



module.exports = {
    verifyToken,
    verifyAdmin_Role
}