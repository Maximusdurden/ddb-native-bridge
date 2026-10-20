/**
 * D&D Beyond Gamelog Stream Reader (`stream.js`)
 */
import { DDBAuth } from "./auth.js";
import { DDBParser } from "./parser.js";

export class DDBStreamReader {
  constructor() {
    this.intervalId = null;
    this.lastProcessedId = null;
  }

  start() {
    const pollInterval = game.settings.get("ddb-native-bridge", "pollInterval") || 3000;
    console.log(`DDB Native Bridge | Starting gamelog stream poller (${pollInterval}ms interval)...`);
    
    this.intervalId = setInterval(async () => {
      await this.pollGamelog();
    }, pollInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("DDB Native Bridge | Stopped gamelog stream poller.");
    }
  }

  async pollGamelog() {
    const cobalt = game.settings.get("ddb-native-bridge", "cobaltCookie");
    if (!cobalt) return;

    try {
      const response = await fetch("https://gamelog.dndbeyond.com/dice", {
        method: "GET",
        headers: DDBAuth.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.warn("DDB Native Bridge | Cobalt cookie expired or unauthorized.");
        }
        return;
      }

      const data = await response.json();
      if (data && data.rolls && data.rolls.length > 0) {
        const latestRoll = data.rolls[data.rolls.length - 1];
        if (latestRoll.id !== this.lastProcessedId) {
          this.lastProcessedId = latestRoll.id;
          DDBParser.parseRoll(latestRoll);
        }
      }
    } catch (err) {
      console.error("DDB Native Bridge | Error polling gamelog stream:", err);
    }
  }
}
