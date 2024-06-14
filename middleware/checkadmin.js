const jwt = require('jsonwebtoken');
const adminpass = 'adminfittcitifourthdm_infittcitifourthdm';

const checkadminrole = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, adminpass, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).send({
                    success: false,
                    message: 'Invalid Token',
                    data: []
                })
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send({
            success:false,
            message:'Token not provided',
            data:[]
        })
    }
}

module.exports ={checkadminrole,adminpass};