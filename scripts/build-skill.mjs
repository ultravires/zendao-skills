import { build } from 'esbuild';
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { createRequire, isBuiltin } from 'node:module';
import { dirname, isAbsolute, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rootRequire = createRequire(join(root, 'package.json'));
const scriptsDir = join(root, 'skills/zendao/scripts');
const distDir = join(root, 'skills/zendao/dist');
const typesSrc = join(root, 'src/api/types.ts');
const typesDest = join(root, 'skills/zendao/references/types.ts');

/** @param {string} dir */
const listTsFiles = (dir) => {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listTsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
};

/** Bypass parent Yarn PnP by resolving via Node from project/node_modules. */
const nodeModulesResolvePlugin = {
  name: 'node-modules-resolve',
  /** @param {import('esbuild').PluginBuild} buildApi */
  setup(buildApi) {
    buildApi.onResolve({ filter: /^[^./]/ }, (args) => {
      const id = args.path.startsWith('node:') ? args.path.slice(5) : args.path;
      // Let esbuild handle Node builtins (avoids broken CJS->ESM require shim)
      if (isBuiltin(id)) {
        return undefined;
      }

      const tryResolve = (filename) => {
        const resolved = createRequire(filename).resolve(args.path);
        if (!isAbsolute(resolved)) {
          return { path: args.path, external: true };
        }
        return { path: resolved };
      };

      try {
        return tryResolve(join(args.resolveDir || root, 'package.json'));
      } catch {
        try {
          return tryResolve(join(root, 'package.json'));
        } catch {
          try {
            const resolved = rootRequire.resolve(args.path, {
              paths: [args.resolveDir, join(root, 'node_modules')].filter(Boolean),
            });
            if (!isAbsolute(resolved)) {
              return { path: args.path, external: true };
            }
            return { path: resolved };
          } catch {
            return null;
          }
        }
      }
    });
  },
};

const entries = listTsFiles(scriptsDir);
if (entries.length === 0) {
  console.error('No TypeScript entrypoints found under skills/zendao/scripts');
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
mkdirSync(dirname(typesDest), { recursive: true });
cpSync(typesSrc, typesDest);

await build({
  absWorkingDir: root,
  entryPoints: entries,
  outdir: distDir,
  outbase: scriptsDir,
  entryNames: '[dir]/[name]',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  outExtension: { '.js': '.mjs' },
  banner: {
    js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);",
  },
  plugins: [nodeModulesResolvePlugin],
  logLevel: 'info',
});

const outs = entries.map((f) => {
  const rel = relative(scriptsDir, f).replace(/\.ts$/, '.mjs');
  return `  dist/${rel}`;
});
console.log(`Built ${entries.length} skill scripts:\n${outs.join('\n')}`);
console.log('Synced references/types.ts');
