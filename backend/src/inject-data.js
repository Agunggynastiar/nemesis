const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../data/dashboard.sqlite");
const db = new Database(dbPath);

// 🔥 BERSIHKAN DATA
db.prepare(`DELETE FROM package_regions`).run();
db.prepare(`DELETE FROM packages`).run();

// 🔥 DATA (21 DATA TOTAL)
const data = [
  { name: "Belanja Jasa Penyelenggaraan Acara", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 103000000 },
  { name: "Jasa Konsultansi Perencanaan Interior", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 145016000 },
  { name: "Jasa Konsultansi Perencanaan Kantor Kecamatan Lembang", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 139851500 },
  { name: "Rehabilitasi Gedung SKPD", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 160000000 },

  { name: "Belanja Jasa Tenaga Kebersihan", owner: "Provinsi Jawa Barat", type: "provinsi", budget: 117273509 },
  { name: "Belanja Jasa Tenaga Front Office", owner: "Provinsi Jawa Barat", type: "provinsi", budget: 117273509 },

  { name: "Pengadaan Perjalanan Meeting SEAMEO", owner: "Kementerian Pendidikan", type: "central", budget: 151000000 },
  { name: "Pengelolaan PNBP Sekretariat Badan", owner: "Kementerian Pertanian", type: "central", budget: 106580000 },
  { name: "Audit Laporan Keuangan Polban", owner: "Kementerian Pendidikan Tinggi", type: "central", budget: 115000000 },
  { name: "Meeting Penyusunan Program MBG", owner: "Kementerian Pendidikan", type: "central", budget: 112672000 },
  { name: "Biaya Penginapan Monitoring Digitalisasi", owner: "Kementerian Pendidikan", type: "central", budget: 119070000 },

  { name: "Pengawasan Jalan Wilayah 65", owner: "Kabupaten Bandung", type: "kabkota", budget: 100000000 },

  { name: "Belanja Bahan Cetak", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 101650000 },
  { name: "Belanja Bahan Bakar dan Pelumas", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 180648000 },
  { name: "Pengadaan Mebel", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 190764600 },

  { name: "Belanja Obat-obatan", owner: "Provinsi Jawa Barat", type: "provinsi", budget: 199900762 },
  { name: "Pengawasan Fasilitas Rehabilitasi", owner: "Provinsi Jawa Barat", type: "provinsi", budget: 127000000 },

  { name: "Pengadaan ID Card Holder (Lanyard)", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 124320000 },
  { name: "Taman Halaman Kantor", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 109000000 },
  { name: "Pemeliharaan Halaman Gedung Padalarang", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 183956250 },

  { name: "Pengadaan ATK Kantor", owner: "Kabupaten Bandung Barat", type: "kabkota", budget: 120000000 }
];

// 🔥 INSERT (ID FIX)
data.forEach((item, index) => {
  db.prepare(`
    INSERT INTO packages (
      id,
      source_id,
      schema_version,
      package_name,
      owner_name,
      owner_type,
      location_raw,
      budget,
      is_umkm,
      within_country,
      potential_waste,
      severity,
      is_priority,
      is_flagged,
      risk_score,
      active_tag_count,
      mapped_region_count,
      inserted_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    index + 2,
    "manual_" + index,
    "manual_input",
    item.name,
    item.owner,
    item.type,
    "Jawa Barat",
    item.budget,
    0,
    1,
    0,
    "low",
    1,
    0,
    50,
    1,
    1,
    index
  );
});

console.log("🔥 SEMUA DATA BERHASIL MASUK!");
db.close();