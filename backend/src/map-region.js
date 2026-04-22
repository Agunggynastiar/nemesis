const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../data/dashboard.sqlite");
const db = new Database(dbPath);

// 🔍 Cari region Bandung Barat
const region = db.prepare(`
  SELECT region_key, display_name 
  FROM regions 
  WHERE display_name LIKE '%Bandung Barat%'
`).get();

if (!region) {
  console.log("❌ Region Bandung Barat tidak ditemukan!");
  process.exit(1);
}

console.log("✅ Region ditemukan:", region);

// 🔍 Ambil semua package yang BELUM di-map
const packages = db.prepare(`
  SELECT p.id
  FROM packages p
  LEFT JOIN package_regions pr 
    ON p.id = pr.package_id 
    AND pr.region_key = ?
  WHERE pr.package_id IS NULL
  AND p.id IS NOT NULL   -- 🔥 INI KUNCI
`).all(region.region_key);

console.log(`📦 Total package belum ke-map: ${packages.length}`);

// 🔥 Mapping ke region
let successCount = 0;

packages.forEach((pkg) => {
  try {
    db.prepare(`
      INSERT INTO package_regions (package_id, region_key)
      VALUES (?, ?)
    `).run(pkg.id, region.region_key);

    successCount++;
  } catch (err) {
    console.log(`⚠️ Gagal mapping package ${pkg.id}:`, err.message);
  }
});

console.log(`🔥 Mapping selesai! Berhasil: ${successCount}`);
db.close();