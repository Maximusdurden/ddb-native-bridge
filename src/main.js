/**
 * Main Entry Point (`main.js`)
 */
import { DDBAuth } from "./auth.js";
import { DDBStreamReader } from "./stream.js";

let streamReader = null;

Hooks.once("init", () => {
  console.log("DDB Native Bridge | Initializing D&D Beyond Native Bridge module...");
  DDBAuth.registerSettings();
});

Hooks.once("ready", () => {
  console.log("DDB Native Bridge | Ready. Initializing gamelog stream reader...");
  streamReader = new DDBStreamReader();
  streamReader.start();
});
