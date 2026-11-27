// Jest runs in a CommonJS runtime and cannot require() the ESM-only @nestjs/* 12 packages before Node 24.9.
// This transformer compiles them to CommonJS (only used for node_modules/@nestjs, see jest-e2e.json).
const ts = require('typescript');

module.exports = {
  process(source, filename) {
    const code = source.replace(/import\.meta\.url/g, "require('url').pathToFileURL(__filename).href");
    const { outputText } = ts.transpileModule(code, {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, allowJs: true },
    });
    return { code: outputText };
  },
};
