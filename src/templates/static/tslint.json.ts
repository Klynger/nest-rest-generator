export const code = `{
  "defaultSeverity": "error",
  "extends": ["tslint:recommended"],
  "jsRules": {
    "no-unused-expression": true
  },
  "rules": {
    "quotemark": [true, "single"],
    "member-access": [false],
    "ordered-imports": [false],
    "max-line-length": [true, 150],
    "member-ordering": [false],
    "interface-name": [false],
    "arrow-parens": false,
    "object-literal-sort-keys": false
  },
  "rulesDirectory": []
}
`;

export const path  = './tslint.json';