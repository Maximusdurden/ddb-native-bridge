/**
 * Authentication and Settings Management (`auth.js`)
 */
export class DDBAuth {
  static registerSettings() {
    game.settings.register("ddb-native-bridge", "cobaltCookie", {
      name: game.i18n.localize("DDB.Settings.Cobalt.Name"),
      hint: game.i18n.localize("DDB.Settings.Cobalt.Hint"),
      scope: "world",
      config: true,
      type: String,
      default: ""
    });

    game.settings.register("ddb-native-bridge", "campaignId", {
      name: game.i18n.localize("DDB.Settings.CampaignId.Name"),
      hint: game.i18n.localize("DDB.Settings.CampaignId.Hint"),
      scope: "world",
      config: true,
      type: String,
      default: ""
    });

    game.settings.register("ddb-native-bridge", "pollInterval", {
      name: game.i18n.localize("DDB.Settings.PollInterval.Name"),
      hint: game.i18n.localize("DDB.Settings.PollInterval.Hint"),
      scope: "world",
      config: true,
      type: Number,
      default: 3000
    });
  }

  static getHeaders() {
    const cobalt = game.settings.get("ddb-native-bridge", "cobaltCookie");
    return {
      "Cookie": `Cobalt=${cobalt}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  }
}
