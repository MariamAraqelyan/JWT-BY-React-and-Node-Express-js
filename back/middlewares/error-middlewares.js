const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: res.message, errors: res.errors})
    }

    return res.status(500).json({message: 'Something when wrong'});
}