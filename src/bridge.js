/**
 * Native Card & Workflow Injection (`bridge.js`)
 */
export class DDBBridge {
  static async injectNativeCard({ actor, characterName, formula, total, rollType, raw }) {
    console.log(`DDB Native Bridge | Injecting native ${rollType} card for ${characterName}: ${formula} = ${total}`);

    // Construct official Foundry Roll instance
    let roll = new Roll(formula);
    await roll.evaluate();

    let speaker = ChatMessage.getSpeaker({ actor: actor });
    speaker.alias = characterName;

    // Render using standard Foundry ChatMessage creation
    await ChatMessage.create({
      user: game.user.id,
      speaker: speaker,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      rolls: [roll],
      content: `<div class="dnd5e chat-card roll-card">
        <h3>D&D Beyond: ${characterName}</h3>
        <p><strong>Roll Type:</strong> ${rollType.toUpperCase()}</p>
        <div class="dice-roll">
          <div class="dice-result">
            <div class="dice-formula">${formula}</div>
            <div class="dice-tooltip"></div>
            <h4 class="dice-total">${total}</h4>
          </div>
        </div>
      </div>`
    });
  }
}
