const teamColors = [
  { 1: "#ce1126" },
  { 2: "#00539b" },
  { 3: "#0038a8" },
  { 4: "#f74902" },
  { 5: "#fcb514" },
  { 6: "#111111" },
  { 7: "#002654" },
  { 8: "#af1e2d" },
  { 9: "#bf910c" },
  { 10: "#00205b" },
  { 12: "#ce1126" },
  { 13: "#c8102e" },
  { 14: "#002868" },
  { 15: "#cf0a2c" },
  { 16: "#cf0a2c" },
  { 17: "#ce1126" },
  { 18: "#ffb81c" },
  { 19: "#002f87" },
  { 20: "#ce1126" },
  { 21: "#6f263d" },
  { 22: "#041e41" },
  { 23: "#001f5b" },
  { 24: "#b5985a" },
  { 25: "#006341" },
  { 26: "#111111" },
  { 28: "#006d75" },
  { 29: "#002654" },
  { 30: "#024930" },
  { 52: "#041e41" },
  { 53: "#8c2633" },
  { 54: "#b4975a" },
];

function getTeamColor(id) {
  let color;

  for (let team in teamColors) {
    let teamObj = teamColors[team];
    for (let teamId in teamObj) {
      if (teamId == id) {
        color = teamObj[teamId];
      }
    }
  }
  return color;
}
