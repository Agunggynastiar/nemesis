function analyzePackage(pkg) {
  let riskScore = 0;
  let severity = "low";
  let reason = [];

  // 🔥 RULE 1: Budget besar
  if (pkg.budget > 150000000) {
    riskScore += 40;
    reason.push("Anggaran besar (>150jt)");
  }

  // 🔥 RULE 2: ATK / barang kecil tapi mahal
  if (pkg.packageName.toLowerCase().includes("atk") && pkg.budget > 100000000) {
    riskScore += 50;
    reason.push("ATK mahal (tidak wajar)");
  }

  // 🔥 RULE 3: Konsultansi mahal
  if (pkg.packageName.toLowerCase().includes("konsultansi") && pkg.budget > 130000000) {
    riskScore += 30;
    reason.push("Konsultansi mahal");
  }

  // 🔥 RULE 4: Owner pusat (kadang rawan)
  if (pkg.ownerType === "central") {
    riskScore += 10;
    reason.push("Program dari pusat");
  }

  // 🔥 LEVEL
  if (riskScore >= 70) severity = "high";
  else if (riskScore >= 40) severity = "medium";
  else severity = "low";

  return {
    riskScore,
    severity,
    reason: reason.join(", "),
    anomalyLevel:
      riskScore >= 70 ? "HIGH" :
      riskScore >= 40 ? "MEDIUM" :
      "LOW"
  };
}

module.exports = { analyzePackage };