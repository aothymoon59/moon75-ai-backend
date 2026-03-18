const adminAuth = (req, res, next) => {
  const secretCode = req.headers["x-admin-secret"];

  if (!secretCode || secretCode !== process.env.ADMIN_SECRET_CODE) {
    return res.status(401).json({ error: "Unauthorized. Invalid secret code." });
  }

  next();
};

export { adminAuth };
