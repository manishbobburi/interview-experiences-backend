const sitemapService = require("../services/sitemap.service");

async function getSitemap(req, res, next) {
  try {
    const sitemapXML = await sitemapService.generateSitemapXML();

    res.header("Content-Type", "application/xml");

    res.setHeader("Cache-Control", "public, max-age=3600");

    return res.status(200).send(sitemapXML);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSitemap,
};