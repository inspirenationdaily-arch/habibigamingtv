exports.handler = async function () {
  const apiKey = process.env.STEAMWEBAPI_KEY;

  const url =
    "https://www.steamwebapi.com/steam/api/items" +
    "?key=" + encodeURIComponent(apiKey) +
    "&game=cs2";

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data.slice(0, 20)) // limit returned data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
