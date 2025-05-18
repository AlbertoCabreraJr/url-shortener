const urlModel = require("../models/url.model");
const generateShortCode = require("../services/generate-short-code");

exports.createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortCode = generateShortCode();
    const newUrl = await urlModel.createUrl({ url, shortCode });

    res.status(201).send(newUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

exports.redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await urlModel.findByShortCode({ shortCode });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    await urlModel.incrementAccessCount({ shortCode });

    return res.redirect(302, url.url);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

exports.updateOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const updatedUrl = await urlModel.updateOriginalUrl({ url, shortCode });

    if (!updatedUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.status(201).send(updatedUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

exports.deleteShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const deleted = await urlModel.deleteUrl({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

exports.getShortUrlStats = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const stats = await urlModel.findByShortCode({ shortCode });

    if (!stats) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.status(200).send(stats);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}