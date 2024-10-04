import express from "express";
const router = express.Router();

import { BillModel } from "../models/bill.js";
import Category from "../models/category.js";

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

//get into the create new bill page
router.get("/new", (req, res) => {
  try {
    res.render("bills/new.ejs");
  } catch (error) {
    handleError(res, error);
  }
});

// post this now to create new  bill
router.post("/", async (req, res) => {
  try {
    const billData = {
      ...req.body,
      owner: req.session.user._id,
    };
    const bill = new BillModel(billData);
    await bill.save();
    res.redirect("/MyBills/New");
  } catch (error) {
    handleError(res, error);
  }
});

// get into a view all bill page
router.get("/view-all", async (req, res) => {
  try {
    const bills = await BillModel.find({}).populate("category");
    res.render("bills/view.ejs", { bills });
  } catch (error) {
    handleError(res, error);
  }
});

// get into specific id bill page
router.get("/:billId", async (req, res) => {
  try {
    const bill = await BillModel.findById(req.params.billId).populate(
      "category"
    );
    if (bill.owner.toString() == req.session.user._id) {
      res.render("bills/show.ejs", { bill });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    handleError(res, error);
  }
});

// get into the edit page.
router.get("/:billId/edit", async (req, res) => {
  try {
    const bill = await BillModel.findById(req.params.billId).populate(
      "category"
    );
    if (bill.owner.toString() == req.session.user._id) {
      res.render("bills/edit.ejs", { bill });
    }
  } catch (error) {
    handleError(res, error);
  }
});

// updated method in the edit page
router.put("/:billId", async (req, res) => {
  try {
    const bill = await BillModel.findById(req.params.billId);
    if (bill.owner.toString() == req.session.user._id) {
      await BillModel.findByIdAndUpdate(bill, req.body);
      res.redirect(`/MyBills/${req.params.billId}`);
    }
  } catch (error) {
    handleError(res, error);
  }
});

//to delete in edit page
router.delete("/:billId", async (req, res) => {
  try {
    const bill = await BillModel.findById(req.params.billId).populate(
      "category"
    );
    if (bill.owner.toString() === req.session.user._id) {
      await BillModel.findByIdAndDelete(bill);
      res.redirect("/MyBills/view-all");
    } else {
      res.redirect("/MyBills");
    }
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
