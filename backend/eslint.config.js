import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
    languageOptions: { 
      // Esto le dice a ESLint que reconozca variables como 'process' o 'console'
      globals: {
        ...globals.node,
        ...globals.browser // Opcional, si también haces cosas de frontend
      } 
    }
  },
]);
