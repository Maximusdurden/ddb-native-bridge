/**
 * Authentication and Settings Management (`auth.js`)
 */
export class DDBAuth {
  static registerSettings() {
    if (typeof game === "undefined" || !game.settings) return;
    
    game.settings.register("ddb-native-bridge", "cobaltCookie", {
      name: "Cobalt Cookie",
      hint: "Paste your active D&D Beyond session Cobalt cookie here to authenticate the real-time stream.",
      scope: "world",
      config: true,
      type: String,
      default: ""
    });

    game.settings.register("ddb-native-bridge", "campaignId", {
      name: "Campaign / Character ID",
      hint: "D&D Beyond Campaign or Character ID for gamelog filtering.",
      scope: "world",
      config: true,
      type: String,
      default: ""
    });

    game.settings.register("ddb-native-bridge", "pollInterval", {
      name: "Poll Interval (ms)",
      hint: "Polling frequency in milliseconds for fetching new gamelog entries (default: 3000ms).",
      scope: "world",
      config: true,
      type: Number,
      default: 3000
    });
  }

  static getHeaders() {
    if (typeof game === "undefined" || !game.settings) return {};
    const cobalt = game.settings.get("ddb-native-bridge", "cobaltCookie");
    return {
      "Cookie": `Cobalt=${cobalt}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  }
}
