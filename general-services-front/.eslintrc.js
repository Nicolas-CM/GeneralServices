module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    parser: '@typescript-eslint/parser', // Usa el parser de TypeScript
    extends: [
      'eslint:recommended', // Reglas recomendadas de ESLint
      'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TypeScript
      'plugin:react/recommended', // Reglas recomendadas para React
      'plugin:react-hooks/recommended', // Reglas recomendadas para hooks de React
      'plugin:jsx-a11y/recommended', // Reglas para accesibilidad en JSX
    ],
    parserOptions: {
      ecmaVersion: 2021, // Última versión de ECMAScript
      sourceType: 'module', // Usa módulos ECMAScript
      ecmaFeatures: {
        jsx: true, // Habilita JSX
      },
    },
    plugins: [
      'react', // Soporte para React
      '@typescript-eslint', // Soporte para TypeScript
      'jsx-a11y', // Accesibilidad en JSX
    ],
    rules: {
      // Personaliza las reglas aquí
      'react/react-in-jsx-scope': 'off', // No es necesario importar React en JSX con React 17+
      '@typescript-eslint/explicit-module-boundary-types': 'off', // No requiere definir tipos explícitos en funciones
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Advierte sobre variables no usadas, excepto si comienzan con "_"
      'jsx-a11y/anchor-is-valid': 'off', // Desactiva la regla sobre enlaces no válidos (útil para React Router)
      'react/prop-types': 'off', // No es necesario con TypeScript
      '@typescript-eslint/no-explicit-any': 'off'
    },
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React
      },
    },
  };
  