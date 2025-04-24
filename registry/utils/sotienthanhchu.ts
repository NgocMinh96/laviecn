const ChuSo = [" không", " một", " hai", " ba", " bốn", " năm", " sáu", " bảy", " tám", " chín"]
const Tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"]

export function SoTienThanhChu(SoTien: number | string): string {
  const cleanSoTien = SoTien.toString().replaceAll(",", "")
  const so = parseFloat(cleanSoTien)

  if (isNaN(so)) {
    return ""
  }

  if (so < 0) return "Số tiền âm!"
  if (so === 0) return "Không đồng."
  if (so > 8999999999999999) return "Số quá lớn!"

  const ViTri: number[] = []
  ViTri[5] = Math.floor(so / 1e15)
  ViTri[4] = Math.floor((so % 1e15) / 1e12)
  ViTri[3] = Math.floor((so % 1e12) / 1e9)
  ViTri[2] = Math.floor((so % 1e9) / 1e6)
  ViTri[1] = Math.floor((so % 1e6) / 1e3)
  ViTri[0] = Math.floor(so % 1e3)

  let KetQua = ""
  const lan = ViTri.findLastIndex((val) => val > 0)

  for (let i = lan; i >= 0; i--) {
    const tmp = DocSo3ChuSo(ViTri[i])
    KetQua += tmp
    if (ViTri[i] > 0) KetQua += Tien[i]
    if (i > 0 && tmp.length > 0) KetQua += ","
  }

  if (KetQua.endsWith(",")) {
    KetQua = KetQua.slice(0, -1)
  }

  KetQua = KetQua.trim()
  return KetQua.charAt(0).toUpperCase() + KetQua.slice(1) + " đồng."
}

function DocSo3ChuSo(baso: number): string {
  const tram = Math.floor(baso / 100)
  const chuc = Math.floor((baso % 100) / 10)
  const donvi = baso % 10
  let KetQua = ""

  if (tram === 0 && chuc === 0 && donvi === 0) return ""

  if (tram !== 0) {
    KetQua += ChuSo[tram] + " trăm"
    if (chuc === 0 && donvi !== 0) KetQua += " linh"
  }

  if (chuc !== 0 && chuc !== 1) {
    KetQua += ChuSo[chuc] + " mươi"
  } else if (chuc === 1) {
    KetQua += " mười"
  }

  switch (donvi) {
    case 1:
      KetQua += chuc !== 0 && chuc !== 1 ? " mốt" : ChuSo[donvi]
      break
    case 5:
      KetQua += chuc === 0 ? ChuSo[donvi] : " lăm"
      break
    default:
      if (donvi !== 0) KetQua += ChuSo[donvi]
      break
  }

  return KetQua
}
