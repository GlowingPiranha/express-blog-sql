// * definisco un middleware per gli errori
const errorsHandler = (err, req, res, next) => {
  res.status(500).json({
    error: "500 Internal Server Error",
    message: err.message
  })
}

module.exports = errorsHandler;