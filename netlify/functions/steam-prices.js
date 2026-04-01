exports.handler = async function () {
  const apiKey = process.env.STEAMWEBAPI_KEY;

  const url = `https://api.steamwebapi.com/steam/api/items?key=${apiKey}&game=csgo&currency=USD`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Only return 4 items (safe + stable)
    const filtered = data.slice(0, 4);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filtered)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
