export const code = `{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "node --inspect-brk -r ts-node/register -r tsconfig-paths/register src/main.ts"
}
`;

export const path = './nodemon-debug.json';
