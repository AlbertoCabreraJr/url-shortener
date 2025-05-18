const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url.controller");


router.post("/shorten", urlController.createShortUrl);
router.get("/:shortCode", urlController.redirectToOriginalUrl);
router.put("/shorten/:shortCode", urlController.updateOriginalUrl);
router.delete("/shorten/:shortCode", urlController.deleteShortUrl);
router.get("/shorten/:shortCode/stats", urlController.getShortUrlStats);

module.exports = router;