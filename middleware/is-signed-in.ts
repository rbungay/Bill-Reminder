// is-signed-in.js

// @ts-ignore
export const isSignedIn = (req, res, next) => {
  console.log("is signed in middlweare");
  console.log("req.session", req.session);
  if (req.session.user) return next();
  res.redirect("/auth/sign-in");
};
