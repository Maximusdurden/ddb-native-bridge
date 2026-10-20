/**
 * Roll Parser & Entity Resolution (`parser.js`)
 */
import { DDBBridge } from "./bridge.js";

export class DDBParser {
  static parseRoll(rollData) {
    console.log("DDB Native Bridge | Parsing incoming roll payload:", rollData);

    const characterName = rollData.characterName || rollData.userName || "Unknown";
    const actor = game.actors.find(a => a.name.toLowerCase() === characterName.toLowerCase()) || 
                  canvas.tokens?.controlled.find(t => t.actor)?.actor;

    const formula = rollData.expression || "1d20";
    const total = rollData.total || rollData.result || 0;
    const rollType = rollData.rollType || "check"; // attack, check, save, damage

    DDBBridge.injectNativeCard({
      actor,
      characterName,
      formula,
      total,
      rollType,
      raw: rollData
    });
  }
}
