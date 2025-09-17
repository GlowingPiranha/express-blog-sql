// *definisco il middleware di autenticazione

const middlewareAuth = (req, res, next) => {
  if (req.headers.authorization === 'secret-key') {
    req.hasKey = true;
    next();
  }
  else {
    req.hasKey = false;
    res.status(401).json({ error: "401 - Unauthorized", message: "Non puoi eseguire questa operazione" })
  }
}

module.exports = middlewareAuth;