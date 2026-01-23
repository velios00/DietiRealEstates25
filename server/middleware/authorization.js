import { AuthenticationController } from "../controllers/AuthenticationController.js";

export function enforceAuthentication(req, res, next) {
  //Estrae l'header di auth della richiesta e ne estrae il token
  const authHeader = req.headers["authorization"];
  const tokenString = authHeader?.split(" ")[1];
  if (!tokenString) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  AuthenticationController.isTokenValid(tokenString, (err, decoded) => {
    if (err || !decoded || !decoded.user) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.userId = decoded.user.idUser;
      req.username = decoded.user.username;
      req.role = decoded.user.role;
      next();
    }
  });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
