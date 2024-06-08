const {constant} = require("../constant")
const errorHandler = (err, req, res, next) => {
    const statusCode =  res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constant.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack});
            break;
            case constant.VALIDATION_ERROR:
                res.json({ title: "validation not found", message: err.message, stackTrace: err.stack});
                break;
                case constant.UNAUTHORIZED:
                res.json({ title: "unauthorized", message: err.message, stackTrace: err.stack});
                break;
                case constant.FORBIDDEN:
                res.json({ title: "forbidden", message: err.message, stackTrace: err.stack});
                break;

            default:
                console.log("no error!! all good");
                break;
    }


};
module.exports = errorHandler;