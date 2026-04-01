exports.handler = async function () {
  const apiKey = process.env.STEAMWEBAPI_KEY;

  const skins = [
    "AK-47 | Head Shot (Factory New)",
    "AK-47 | Orbit Mk01 (Minimal Wear)",
    "Desert Eagle | Blaze (Factory New)",
    "AWP | Asiimov (Field-Tested)"
  ];

  try {
    const results = [];

    for (const skin of skins) {
      const url =
        "https://www.steamwebapi.com/steam/api/item" +
        "?key=" + encodeURIComponent(apiKey) +
        "&game=cs2" +
        "&market_hash_name=" + encodeURIComponent(skin);

      const response = await fetch(url);
      const data = await response.json();

      results.push({
        market_hash_name: data.markethashname || skin,
        market_name: data.marketname || skin,
        price_latest_sell: data.pricelatestsell ?? null,
        price_real: data.pricereal ?? null,
        price_mix: data.pricemix ?? null,
        image: data.itemimage || null,
        unstable: data.unstable ?? false
      });
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=55, s-maxage=55"
      },
      body: JSON.stringify(results)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        error: "Failed to fetch item prices",
        details: error.message
      })
    };
  }
};
