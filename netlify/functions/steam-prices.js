const skins = [
  "AK-47 | Head Shot (Factory New)",
  "AK-47 | Orbit Mk01 (Minimal Wear)",
  "Desert Eagle | Blaze (Factory New)",
  "AWP | Asiimov (Field-Tested)"
];

const results = [];

for (const skin of skins) {
  const url =
    "https://www.steamwebapi.com/steam/api/item" +
    "?key=" + encodeURIComponent(apiKey) +
    "&market_hash_name=" + encodeURIComponent(skin);

  const response = await fetch(url);
  const data = await response.json();

  results.push(data);
}

return {
  statusCode: 200,
  body: JSON.stringify(results)
};
