import { verifyJWT } from "./verifyJWT.js";

export const verifyAdmin = (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        message: "User is not an admin",
        data: null,
        success: false,
        error: {},
      });
    }
  });
};
