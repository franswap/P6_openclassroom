const jwt = require('jsonwebtoken'); // pour verifier les tokens

module.exports = (req, res, next) => {
  try { //plusieurs éléments
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //on decode notre token
    const userId = decodedToken.userId; //on extrait l'id du token
    if (req.body.userId && req.body.userId !== userId) { //on compare l'id utilisateur à celui du token
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};