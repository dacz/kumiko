const nejkratsiStrana = 15; // mm
const uhel = 30; // ° ... pro trojuhelnikovej pattenr asanoha

const tloustkaMaterialu = 4.56; // mm
const pocetKroku = 16;

const tanCalculated = Math.tan(degToRad(uhel));

function degToRad(deg) {
  return deg * Math.PI / 180;
}

const delky = [];
for (let i = 0; i < pocetKroku; i++) {
  delky.push(Math.round(tanCalculated * i * 100) / 100 + nejkratsiStrana); // ta prvni iterace je jenom nejkratsi stranu
}

// vystup
for (let d of delky) {
  console.log(d);
}