import { AuthenticationController } from "../controllers/AuthenticationController.js";

export function enforceAuthentication(req, res, next) {
  //Estrae l'header di auth della richiesta e ne estrae il token
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  AuthenticationController.isTokenValid(token, (err, token) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.userId = token.user.idUser;
      req.username = token.user.username;
      req.role = token.user.role;
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
