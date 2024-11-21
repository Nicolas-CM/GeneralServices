import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // Detecta automáticamente la versión de React
      },
    },
  },
  // Deshabilitar reglas específicas
  {
    rules: {
      'no-unused-vars': 'off', // Deshabilitar la regla de no-unused-vars
      'react/prop-types': 'off', // Deshabilitar la validación de props
      'no-misleading-character-class': 'off',
      'no-useless-escape': 'off',
      'no-prototype-builtins': 'off',
      'no-cond-assign': 'off',
      'no-empty': 'off',
      'no-undef': 'off',
      'no-fallthrough': 'off',
      'valid-typeof': 'off',
      'react/display-name': 'off',
      'no-func-assign': 'off',
      'no-constant-binary-expression': 'off',
      'getter-return': 'off', // Deshabilitar la regla getter-return
      'no-control-regex': 'off',
    },
  },
];
