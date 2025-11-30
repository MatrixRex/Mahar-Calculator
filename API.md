# Mahar Calculator API

The Mahar Calculator project provides a free, public API that returns the current **Mahr Fatemi** and **Minimum Mahr** amounts in Bangladeshi Taka (BDT), updated daily.

## Endpoint

**URL:** `https://raw.githubusercontent.com/MatrixRex/Mahar-Calculator/data/price.json`

**Method:** `GET`

**Format:** `JSON`

## Response Structure

```json
{
  "timestamp": 1732960800,      // Unix timestamp of the update
  "metal": "XAG",               // Metal Code (Silver)
  "currency": "BDT",            // Currency Code
  "price": 3500.50,             // Price of 1 Troy Oz Silver in BDT
  "rate_usd": 30.50,            // Price of 1 Troy Oz Silver in USD
  "exchange_rate": 115.0,       // USD to BDT Exchange Rate
  "mahr_fatemi": 172000,        // Calculated Mahr Fatemi (1530.9g) in BDT
  "minimum_mahr": 3500          // Calculated Minimum Mahr (30.618g) in BDT
}
```

## Usage Example (JavaScript)

```javascript
fetch('https://raw.githubusercontent.com/MatrixRex/Mahar-Calculator/data/price.json')
  .then(response => response.json())
  .then(data => {
    console.log("Mahr Fatemi:", data.mahr_fatemi);
    console.log("Minimum Mahr:", data.minimum_mahr);
    console.log("Last Updated:", new Date(data.timestamp * 1000).toLocaleString());
  })
  .catch(error => console.error('Error:', error));
```

## Notes
- The data is updated automatically once every day at **12:00 AM BDT**.
- The API is hosted on GitHub Pages via a raw file, so it has **no rate limits** and is **CORS-friendly**.
