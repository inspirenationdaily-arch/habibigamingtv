fetch("/.netlify/functions/steam-prices")
  .then(res => res.json())
  .then(items => {
    const priceMap = {
      "AK-47 | Head Shot (Factory New)": "price-headshot",
      "AK-47 | Orbit Mk01 (Minimal Wear)": "price-orbit",
      "Desert Eagle | Blaze (Factory New)": "price-blaze",
      "AWP | Asiimov (Field-Tested)": "price-asiimov"
    };

    items.forEach(item => {
      const elId = priceMap[item.market_hash_name];
      if (!elId) return;

      const el = document.getElementById(elId);
      if (!el) return;

      const value = item.price_mix ?? item.price_real ?? item.price_latest_sell;

      el.textContent = value != null
        ? `$${Number(value).toFixed(2)}`
        : "N/A";
    });
  })
  .catch(err => console.error(err));
