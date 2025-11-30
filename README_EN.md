# **Mahar Calculator**

A real-time web application to calculate the **Mahr Fatemi** and **Minimum Mahr** amounts in Bangladeshi Taka (BDT).

[🇧🇩 বাংলা (Bangla)](README.md)

---

## **🚀 Live Demo**

👉 [Check Today's Mahr Amount](https://matrixrex.github.io/Mahar-Calculator/)

---

## **📖 Why This Project?**

Determining the Mahr during marriage is an important religious duty. However, since the price of silver changes daily, calculating the exact amount can often be confusing.

This tool is specifically designed to **raise awareness about Mahr Fatemi** and simplify decision-making for families. It makes the process completely hassle-free. With just one click, you can find out:

*   Today's **Mahr Fatemi** amount in BDT
*   The **Minimum Valid Mahr** amount in BDT

All calculations are based on **Shariah-compliant rules** and **daily market rates**.

---

## **🕌 Brief Overview of Mahr**

According to Islamic Shariah, the mandatory gift or money given by the groom to the bride for marriage is called **Mahr**. There are four common methods for determining Mahr:

### 1. Minimum Mahr

The lowest amount determined by Shariah, below which Mahr cannot be set.

*   Amount: **10 Dirhams**
*   Silver Weight: Approximately **30.618 grams** (2.625 Bhori)

### 2. Mahr Fatemi

The amount of Mahr that the Prophet (PBUH) determined for his daughter Fatimah (RA) and other female family members.

*   Amount: **500 Dirhams**
*   Silver Weight: Approximately **1530.9 grams** (131.25 Bhori)

### 3. Mahr Mithil

Mahr determined in accordance with the Mahr of contemporary women from the bride's father's family.

### 4. Mahr Musamma

Mahr determined by the mutual consent of the bride and groom's parties (however, it cannot be less than 10 Dirhams).

---

## **🎯 Core Objective of This App**

*   To make the **accurate calculation of Mahr Fatemi easy** for the general public.
*   To bring **Shariah rules and current silver market prices** into one place.
*   To show **accurate results within seconds** without any complex calculations.

There is no need to search for market prices separately or sit with a calculator to use this app—everything here is automatic!

> 🤍 This is a **community-driven tool**—there is no commercial intent, the only goal is to deliver simple, accurate, and Shariah-compliant information.

---

## **🛠 Tech Stack**

This project is built to run fast and hassle-free—with zero server costs!

*   **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
*   **Icons & Fonts:** Phosphor Icons, Google Fonts (Tiro Bangla)
*   **Automation & Hosting:** GitHub Actions, GitHub Pages

---

## **⚙️ How It Works (Behind the Scenes)**

This app is built using **Serverless Automation**—meaning there is no separate backend server.

### 🔁 Step 1: Automated Price Update (GitHub Actions)

Every day at **12:00 AM (Bangladesh Time)**, an automation runs automatically:

1.  Fetches current Silver price (USD) from goldapi.io
2.  Fetches USD → BDT rate from open.er-api.com
3.  Calculates today's silver price in BDT using these two data points
4.  Generates a new `price.json` file
5.  Auto-deploys it to the `data` branch

---

### 🌐 Step 2: Displaying Data on Website

When you open the site:

*   `script.js` reads `price.json` directly from the `data` branch
*   Then it automatically calculates and shows:
    *   **Mahr Fatemi = Price per gram × 1530.9**
    *   **Minimum Mahr = Price per gram × 30.618**

Everything is updated without any refresh or reload hassle!

---

## **✅ Benefits of This Architecture**

*   💸 **Completely Free Hosting**
*   🛡 **Data remains safe even if API goes down for a day**
*   ⚡ **Super Fast Loading** (Only loads a tiny JSON file)
*   🧠 **No Backend Maintenance Required**

---

## **🔌 API Usage (Developers)**

If you want to show Mahr rates in your own app or website, you can use our free API.

👉 [View API Documentation (API.md)](API.md)

---

## **📂 Project Structure**

```bash
Mahar-Calculator/
├── .github/workflows/   # Automation Script (update_price.yml)
├── assets/              # Images and Icons
├── css/                 # Custom Styles (style.css)
├── js/                  # Application Logic (script.js)
├── index.html           # Main Application File
└── README.md            # Project Documentation
```

---

## **🤝 Contributing (Community First)**

This project is a **Community Tool**—your ideas, suggestions, bug reports—everything is warmly welcome!

---

## **📄 License**

This project is open-source and covered under the **MIT License**.
