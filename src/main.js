/**
 * Main Entry Point (`main.js`)
 */
import { DDBAuth } from "./auth.js";
import { DDBStreamReader } from "./stream.js";

let streamReader = null;

// Register settings immediately on script evaluation to ensure they are available before init hooks
DDBAuth.registerSettings();

Hooks.once("init", () => {
  console.log("DDB Native Bridge | Initializing D&D Beyond Native Bridge module...");
});

Hooks.once("ready", () => {
  console.log("DDB Native Bridge | Ready. Initializing gamelog stream reader...");
  streamReader = new DDBStreamReader();
  streamReader.start();
});
