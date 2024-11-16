const express = require("express");
const multer = require("multer");
const path = require("path");
const Car = require("../models/Car");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).array("images", 10);

// Create Car
router.post("/create", authMiddleware, upload, async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map(file => file.path);

  try {
    const newCar = new Car({
      title,
      description,
      tags,
      images,
      user: req.user.id,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// List Cars
router.get("/list", authMiddleware, async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Car Detail
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Car
router.put("/:id", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags || car.tags;
    if (req.files.length > 0) {
      car.images = req.files.map(file => file.path);
    }

    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Car
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: "Car not found" });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await car.remove();
    res.json({ msg: "Car removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
