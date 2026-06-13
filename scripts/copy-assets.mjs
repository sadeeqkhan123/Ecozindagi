import fs from 'fs'
import path from 'path'

const src = 'C:/Users/_/.cursor/projects/c-Users-Downloads-eco-zindagi-website-build/assets'
const pub = 'c:/Users/_/Downloads/eco-zindagi-website-build/public'
const products = path.join(pub, 'products')

fs.mkdirSync(products, { recursive: true })

function find(pat) {
  return fs.readdirSync(src).find((f) => f.includes(pat))
}

function copy(pat, dest) {
  const f = find(pat)
  if (!f) {
    console.log('MISS', pat)
    return false
  }
  fs.copyFileSync(path.join(src, f), dest)
  console.log('OK', path.basename(dest), '<-', pat)
  return true
}

// Logo
copy('WhatsApp_Image_2023-10-09', path.join(pub, 'eco-zindagi-logo.png'))
copy('WhatsApp_Image_2023-10-09', path.join(pub, 'favicon.png'))
copy('WhatsApp_Image_2023-10-09', path.join(pub, 'apple-icon.png'))

/**
 * CORRECT mapping (verified against actual image content):
 * __1  = BioLoop-60 (light blue labeled unit)
 * __2  = Black segregation bin (not a separate catalog product)
 * __7  = Basic Zero-Waste Bin (cream, foot pedal)
 * __8  = Compost Tumbler (dual chamber)
 * __9  = Community BioLoop 120L
 * __10 = Eco Caddy Mini
 */
const productMap = [
  ['04_40_19_PM__1', 'bioloop-60.png'],
  ['04_40_22_PM__7', 'basic-zero-waste-bin.png'],
  ['04_40_23_PM__10', 'eco-caddy-mini.png'],
  ['04_40_23_PM__9', 'community-bioloop-120l.png'],
  ['04_40_22_PM__8', 'compost-tumbler-60l.png'],
  ['04_40_21_PM__5', 'growmix-10kg.png'],
  ['04_40_20_PM__4', 'brownboost-2kg.png'],
  ['04_40_20_PM__3', 'odorguard-cartridge.png'],
  ['04_40_21_PM__6', 'activated-carbon-filter.png'],
]

for (const [pat, name] of productMap) {
  copy(pat, path.join(products, name))
}

// BioLoop scroll/hero transparent renders (separate from shop product shot)
const bioloopMap = [
  ['01-closed-removebg-preview-c425bf76', 'bioloop-hero.png'],
  ['02-drawers-open-removebg', 'bioloop-drawers-open.png'],
  ['03-semi-exploded-removebg', 'bioloop-semi-exploded.png'],
  ['04-full-exploded-removebg', 'bioloop-full-exploded.png'],
]

for (const [pat, name] of bioloopMap) {
  if (copy(pat, path.join(pub, name)) && name === 'bioloop-hero.png') {
    copy(pat, path.join(pub, 'bioloop-60-product.png'))
  }
}

console.log('\nProduct mapping complete.')

// Team photos
const teamDir = path.join(pub, 'team')
fs.mkdirSync(teamDir, { recursive: true })

const teamMap = [
  ['Areeba_Syed', 'areeba-syed.png'],
  ['Sadeeq_Khan', 'sadeeq-khan.png'],
  ['Anwar_Ul_Haq', 'anwar-ul-haq.png'],
  ['Zahid_Iqbal', 'zahid-iqbal.png'],
  ['Lilah_Ahmad', 'lilah-ahmad.png'],
  ['Arsakam_Khalil', 'arsalan-khalil.png'],
  ['Waleed_Tariq', 'waleed-tariq.png'],
  ['Alishba_Farukh', 'alishba-farrukh.png'],
  ['Toqeer_Ahmed', 'toqeer-ahmed.png'],
]

for (const [pat, name] of teamMap) {
  copy(pat, path.join(teamDir, name))
}
