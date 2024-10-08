// middleware/pass-user-to-view.js

// @ts-ignore
export const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};
