exports.handler = async function () {
  const apiKey = process.env.STEAMWEBAPI_KEY;

  const skins = [
    "AWP | Dragon Lore (Field-Tested)",
    "AK-47 | Fire Serpent (Field-Tested)",
    "M4A4 | Howl (Field-Tested)",
    "AK-47 | Wild Lotus (Factory New)",
    "AWP | Gungnir (Factory New)",
    "AK-47 | Case Hardened (Factory New)",
    "Glock-18 | Fade (Factory New)",
    "M4A1-S | Knight (Factory New)",
    "AWP | Medusa (Factory New)",
    "AK-47 | Bloodsport (Factory New)"
  ];

  try {
    const results = [];

    for (const name of skins) {
      const url =
        "https://www.steamwebapi.com/steam/api/item" +
        "?key=" + encodeURIComponent(apiKey) +
        "&game=cs2" +
       "&market_hash_name=" + encodeURIComponent(name);

      const response = await fetch(url);
      const data = await response.json();

      results.push(data);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(results)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
