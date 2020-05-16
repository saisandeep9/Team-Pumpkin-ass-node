module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  if (!req.user.userType === "Contributor")
    return res.status(403).send("Access denied.");

  next();
};
