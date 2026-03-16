const { Post } = require("../models");
const { ServerConfig } = require("../config");

async function generateSitemapXML() {
  const posts = await Post.findAll({
    attributes: ["slug", "updatedAt"],
    order: [["updatedAt", "DESC"]],
  });

  const postUrls = posts
    .map((post) => {
      return `
    <url>
      <loc>${ServerConfig.BASE_URL}/post/${post.slug}</loc>
      <lastmod>${post.updatedAt.toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>${ServerConfig.BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  ${postUrls}

</urlset>`;
}

module.exports = {
  generateSitemapXML,
};