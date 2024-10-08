import express from "express";
const router = express.Router();

import Bill from "../models/bill.js";
import Category from "../models/category.js";

// Need to add Const of the MODELS that will be built later here

//added helper function of catch error to keep code try
const handleError = (res, error) => {
  console.log(error);
  res.redirect("/");
};

//directs to home page dashboard
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find({ owner: req.session.user._id }).populate(
      "category"
    );
    const totalAmount = bills.reduce((acc, bill) => {
      if (bill.status === "overdue" || bill.status === "unpaid") {
        return acc + bill.amount;
      }

      return acc;
    }, 0);
    const totalQuantity = bills.reduce((acc, bill) => {
      if (bill.status === "overdue" || bill.status === "unpaid") {
        return acc + 1;
      }
      return acc;
    }, 0);

    const unpaidBills = bills
      .filter((bill) => bill.status === "unpaid")
      .sort((a, b) => a.duedate - b.duedate)
      .slice(0, 5);

    const overdueBills = bills
      .filter((bill) => bill.status === "overdue")
      .sort((a, b) => a.duedate - b.duedate)
      .slice(0, 5);

    const completedBills = bills
      .filter((bill) => bill.status === "paid")
      .sort((a, b) => a.duedate - b.duedate)
      .slice(0, 5);

    res.render("bills/index.ejs", {
      bills,
      totalAmount,
      totalQuantity,
      unpaidBills,
      overdueBills,
      completedBills,
    });
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
    const bill = new Bill(billData);
    await bill.save();
    res.redirect("/MyBills/New");
  } catch (error) {
    handleError(res, error);
  }
});

// get into a view all bill page
router.get("/view-all", async (req, res) => {
  try {
    const bills = await Bill.find({}).populate("category");
    res.render("bills/view.ejs", { bills });
  } catch (error) {
    handleError(res, error);
  }
});

//goes to a view-all page with completed
router.get("/view-all/completed", async (req, res) => {
  try {
    const bills = await Bill.find({ status: "paid" }).populate("category");
    res.render("bills/view.ejs", { bills });
  } catch (error) {
    handleError(res, error);
  }
});

//goes to view-all page of unpaid
router.get("/view-all/unpaid", async (req, res) => {
  try {
    const bills = await Bill.find({ status: "unpaid" }).populate("category");
    res.render("bills/view.ejs", { bills });
  } catch (error) {
    handleError(res, error);
  }
});

//goes to view-all page of overdue
router.get("/view-all/overdue", async (req, res) => {
  try {
    const bills = await Bill.find({ status: "overdue" }).populate("category");
    res.render("bills/view.ejs", { bills });
  } catch (error) {
    handleError(res, error);
  }
});

// get into specific id bill page
router.get("/:billId", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId).populate("category");
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
    const bill = await Bill.findById(req.params.billId).populate("category");
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
    const bill = await Bill.findById(req.params.billId);
    if (bill.owner.toString() == req.session.user._id) {
      await Bill.findByIdAndUpdate(bill, req.body);
      res.redirect(`/MyBills/${req.params.billId}`);
    }
  } catch (error) {
    handleError(res, error);
  }
});

//to delete in edit page
router.delete("/:billId", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId).populate("category");
    if (bill.owner.toString() === req.session.user._id) {
      await Bill.findByIdAndDelete(bill);
      res.redirect("/MyBills/view-all");
    } else {
      res.redirect("/MyBills");
    }
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
