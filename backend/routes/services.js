const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // const now = new Date().toISOString();
    // const date = now.replace(/:/g, "-");
    // cb(null, date + file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const User = require("../models/User");
const Service = require("../models/Service");

// @route     GET /services
// @desc      Get all services
// @access    Public
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();

    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET /services/:id
// @desc      Get Single Service
// @access    Public
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(400).json({ msg: "Service doesn't exist" });
    }

    console.log("service-------------", service);

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET /services/name/:name
// @desc      Get Single Service
// @access    Public
router.get("/name/:name".split(" ").join(""), async (req, res) => {
  try {
    const name = req.params.name.split("-").join(" ");
    const service = await Service.findOne({ name });

    if (!service) {
      return res.status(400).json({ msg: "Service doesn't exist" });
    }

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET /services/getBysubCategory/:subcategoryID
// @desc      Get Single Service
// @access    Public
router.get("/getBySubCategory/:subcategoryID", async (req, res) => {
  try {
    const subCategoryID = req.params.subcategoryID;
    const filter = { subCategoryID: subCategoryID };
    const services = await Service.find(filter);

    if (!services) {
      return res.status(400).json({ msg: "No Service Found" });
    }

    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST /service
// @desc      Create Service
// @access    Private
router.post(
  "/create",
  auth,
  upload.single("serviceImage"),
  async (req, res) => {
    console.log(req.file);
    const { name, description, rating, price, subCategoryID } = req.body;

    try {
      const newService = new Service({
        name,
        description,
        rating,
        price,
        serviceImage: req.file.path,
        subCategoryID,
        userID: req.user.id,
      });

      const service = await newService.save();

      res.json(service);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PATCH /services
// @desc      Update Service
// @access    Private
router.patch("/:id", auth, async (req, res) => {
  const { name, description, rating, price, serviceImage } = req.body;

  const serviceFields = {
    name,
    description,
    rating,
    price,
    serviceImage,
  };

  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    if (service.userID != req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: serviceFields },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE /service
// @desc      Delete service
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    if (service.user != req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Service.findByIdAndRemove(req.params.id);

    res.json({ msg: "Service Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
