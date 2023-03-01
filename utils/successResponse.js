function success(res, status, dataName, data, message){
    res.status(status || 200).json({
        [dataName]: data,
        message
    });
}

module.exports = success;