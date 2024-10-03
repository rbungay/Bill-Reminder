import express from "express";
const router = express.Router();

// Need to add Const of the MODELS that will be built later here

//added helper function of catch error to keep code try
const handleError = (res, error) => {
  console.log(error);
  res.redirect("/");
};

//directs to home page dashboard
router.get("/", (req, res) => {
  try {
    res.render("bills/index.ejs");
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
