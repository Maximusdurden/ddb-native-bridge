# D&D Beyond Native Bridge (`ddb-native-bridge`)

Modern, lightweight, serverless Foundry VTT module compatible with **Foundry VTT v14.369+** and **D&D 5e system v6.0.6+**. Fetches real-time dice rolls from D&D Beyond using a user-provided Cobalt cookie and injects them into Foundry as native chat cards.

---

## Features
- **Client-Side Polling:** Zero external relay servers or companion browser extensions required (Forge.com compatible).
- **Native Foundry Integration:** Constructs official `Roll` instances so modules like *Dice So Nice!* automatically render 3D dice.
- **Actor & Token Resolution:** Automatically matches D&D Beyond character names to active Foundry actors and tokens.

---

## Setup & Configuration

### 1. Retrieving Your Cobalt Cookie
1. Log into [D&D Beyond](https://www.dndbeyond.com) in your web browser.
2. Open Browser Developer Tools (`F12` or `Ctrl+Shift+I`).
3. Navigate to **Application** -> **Cookies** (or **Storage** -> **Cookies**).
4. Locate the cookie named `Cobalt` and copy its value string.

### 2. Installation in Foundry VTT
1. Place the `ddb-native-bridge` folder into your Foundry VTT `Data/modules/` directory (or install via manifest URL).
2. Launch Foundry VTT (`v14.369+`) with the **dnd5e** system (`v6.0.6+`).
3. Enable **D&D Beyond Native Bridge** in Manage Modules.
4. Go to **Configure Settings** -> **Module Settings** -> **D&D Beyond Native Bridge**, paste your `Cobalt` cookie, and save.
