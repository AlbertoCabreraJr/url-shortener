const db = require("../db");

exports.createUrl = async ({ url, shortCode }) => {
  const results = await db.query(
    `INSERT INTO urls (url, shortcode, created_at, updated_at, access_count)
    VALUES ($1, $2, NOW(), NOW(), 0)
    RETURNING *`,
    [url, shortCode]
  )

  return results.rows[0];
}

exports.findByShortCode = async ({shortCode}) => {
  const results = await db.query(
    `SELECT * FROM urls
    WHERE shortcode = $1`,
    [shortCode]
  )

  return results.rows[0];
}

exports.incrementAccessCount = async ({shortCode}) => {
  await db.query(`
    UPDATE urls SET access_count = access_count + 1
    WHERE shortcode = $1
    `,
    [shortCode]
  )
}

exports.updateOriginalUrl = async ({ url, shortCode }) => {
  const results = await db.query(
    `UPDATE urls
    SET url = $1, updated_at = NOW()
    WHERE shortcode = $2
    RETURNING *`,
    [url, shortCode]
  )

  return results.rows[0];
}

exports.deleteUrl = async ({shortCode}) => {
  const results = await db.query(
    `DELETE FROM urls
    WHERE shortcode = $1`,
    [shortCode]
  )

  return results.rowCount > 0;
}


