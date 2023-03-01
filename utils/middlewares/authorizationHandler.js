const boom = require('@hapi/boom');

function checkRoles(...roles){
    return (req, res, next) => {
        if(roles.includes(req.user.rol)) next();
        else next(boom.unauthorized());
    }
}

module.exports = checkRoles;