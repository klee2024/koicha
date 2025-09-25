#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const projectRoot = dirname(new URL(import.meta.url).pathname.replace(/\/$/, ''));
const root = resolve(projectRoot, '..');
const inputPath = resolve(root, 'src/styles.tailwind.css');
const outputPath = resolve(root, 'src/styles.css');
const tailwindConfigPath = resolve(root, 'tailwind.config.js');

async function build() {
  const css = await readFile(inputPath, 'utf8');
  const processor = postcss([
    tailwind({ config: tailwindConfigPath }),
    autoprefixer,
  ]);
  const result = await processor.process(css, {
    from: inputPath,
    to: outputPath,
  });

  await writeFile(outputPath, result.css, 'utf8');

  if (result.map) {
    await writeFile(`${outputPath}.map`, result.map.toString(), 'utf8');
  }
}

build().catch((error) => {
  console.error('[tailwind] build failed');
  console.error(error);
  process.exitCode = 1;
});
