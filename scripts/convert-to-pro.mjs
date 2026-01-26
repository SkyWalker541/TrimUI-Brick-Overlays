#!/usr/bin/env bun
/**
 * TrimUI Brick → Smart Pro Overlay Converter
 *
 * Converts existing Brick overlays (1024×768, 4:3) to Smart Pro format (1280×720, 16:9)
 *
 * Usage:
 *   bun scripts/convert-to-pro.mjs                    # Convert all
 *   bun scripts/convert-to-pro.mjs --native           # NATIVE mode only (letterbox)
 *   bun scripts/convert-to-pro.mjs --aspect           # ASPECT mode only (stretch)
 *   bun scripts/convert-to-pro.mjs --system GB        # Convert specific system only
 *   bun scripts/convert-to-pro.mjs --dry-run          # Preview without converting
 */

import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRO_RES = { width: 1280, height: 720 };

// Parse CLI arguments
const args = process.argv.slice(2);
const options = {
  mode: args.find(a => a === '--native' || a === '--aspect')?.replace('--', '') || 'all',
  system: args.find(a => a.startsWith('--system'))?.split('=')[1] || null,
  dryRun: args.includes('--dry-run'),
  inputBaseDir: join(__dirname, '..'),
  outputBaseDir: join(__dirname, '..', 'PRO'),
};

/**
 * Determine conversion mode based on filename
 * NATIVE: Preserve aspect ratio with letterboxing (side pillars for 16:9)
 * ASPECT: Stretch to fill screen
 */
function getConversionMode(filename) {
  if (filename.includes('NATIVE')) return 'native';
  if (filename.includes('ASPECT')) return 'aspect';
  return 'aspect'; // Default to stretch for unspecified
}

/**
 * Generate output filename with PRO_ prefix
 */
function generateOutputFilename(inputFilename) {
  return inputFilename.replace('BRICK_', 'PRO_');
}

/**
 * Apply letterboxing for NATIVE mode
 * Creates 16:9 canvas with 4:3 content centered (side pillars)
 */
async function applyLetterbox(imageBuffer) {
  const targetWidth = PRO_RES.width;
  const targetHeight = PRO_RES.height;

  // Calculate letterbox dimensions
  // For 4:3 → 16:9, we add side pillars
  const scaledHeight = targetHeight;
  const scaledWidth = Math.floor(scaledHeight * (4 / 3)); // 960
  const pillarWidth = Math.floor((targetWidth - scaledWidth) / 2); // 160 on each side

  return await sharp(imageBuffer)
    .resize(scaledWidth, scaledHeight, { fit: 'fill' })
    .extend({
      top: 0,
      bottom: 0,
      left: pillarWidth,
      right: pillarWidth,
      background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent pillars
    })
    .toBuffer();
}

/**
 * Stretch image for ASPECT mode (direct resize)
 */
async function applyStretch(imageBuffer) {
  return await sharp(imageBuffer)
    .resize(PRO_RES.width, PRO_RES.height, { fit: 'fill' })
    .toBuffer();
}

/**
 * Convert a single overlay file
 */
async function convertOverlay(inputPath, outputPath, mode) {
  const filename = inputPath.split('/').pop();
  console.log(`  Converting: ${filename}`);

  if (options.dryRun) {
    console.log(`    → ${generateOutputFilename(filename)} [${mode.toUpperCase()} mode]`);
    return;
  }

  const imageBuffer = await sharp(inputPath).toBuffer();

  let resultBuffer;
  if (mode === 'native') {
    resultBuffer = await applyLetterbox(imageBuffer);
  } else {
    resultBuffer = await applyStretch(imageBuffer);
  }

  await sharp(resultBuffer).toFile(outputPath);
}

/**
 * Get all system directories containing BRICK_*.png files
 */
function getSystemDirectories(baseDir) {
  const systems = [];
  const entries = readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const systemPath = join(baseDir, entry.name);
    const files = readdirSync(systemPath);
    const hasBrickOverlays = files.some(f => f.startsWith('BRICK_') && f.endsWith('.png'));

    if (hasBrickOverlays) {
      systems.push({ name: entry.name, path: systemPath });
    }
  }

  return systems;
}

/**
 * Main conversion workflow
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   TrimUI Brick → Smart Pro Overlay Converter               ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`Input base:  ${options.inputBaseDir}`);
  console.log(`Output base: ${options.outputBaseDir}`);
  console.log(`Mode:        ${options.mode}`);
  if (options.system) console.log(`System:      ${options.system}`);
  console.log(`Dry run:     ${options.dryRun}\n`);

  // Find all system directories with Brick overlays
  const systems = getSystemDirectories(options.inputBaseDir);

  if (systems.length === 0) {
    console.error('❌ No Brick overlays found (looking for BRICK_*.png files)');
    process.exit(1);
  }

  // Filter by system if specified
  const systemsToProcess = options.system
    ? systems.filter(s => s.name.toUpperCase() === options.system.toUpperCase())
    : systems;

  if (systemsToProcess.length === 0) {
    console.error(`❌ System "${options.system}" not found or has no overlays`);
    console.log(`Available systems: ${systems.map(s => s.name).join(', ')}`);
    process.exit(1);
  }

  console.log(`Found ${systems.length} system(s) with Brick overlays\n`);

  let totalConverted = 0;
  let totalSkipped = 0;

  for (const system of systemsToProcess) {
    const files = readdirSync(system.path).filter(f => f.startsWith('BRICK_') && f.endsWith('.png'));
    const outputDir = join(options.outputBaseDir, system.name);

    console.log(`\n📂 ${system.name} (${files.length} file(s))`);

    if (!options.dryRun && !existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    let systemConverted = 0;
    let systemSkipped = 0;

    for (const file of files) {
      const mode = getConversionMode(file);

      // Skip if mode filter is active and doesn't match
      if (options.mode !== 'all' && mode !== options.mode) {
        systemSkipped++;
        totalSkipped++;
        continue;
      }

      const inputPath = join(system.path, file);
      const outputPath = join(outputDir, generateOutputFilename(file));

      try {
        await convertOverlay(inputPath, outputPath, mode);
        systemConverted++;
        totalConverted++;
      } catch (error) {
        console.error(`    ❌ Error: ${error.message}`);
      }
    }

    if (systemSkipped > 0) {
      console.log(`    ⏭️  Skipped: ${systemSkipped} (mode filter)`);
    }
  }

  console.log('\n─────────────────────────────────────────────────────────────');
  console.log(`✅ Total converted: ${totalConverted} overlay(s)`);
  if (totalSkipped > 0) console.log(`⏭️  Total skipped:   ${totalSkipped} overlay(s) (mode filter)`);
  console.log('─────────────────────────────────────────────────────────────\n');

  if (!options.dryRun && totalConverted > 0) {
    console.log(`📁 Output saved to: ${options.outputBaseDir}\n`);
    console.log('Next steps:');
    console.log('  1. Review converted overlays in the PRO directory');
    console.log('  2. Test on your TrimUI Smart Pro device');
    console.log('  3. Fine-tune using design templates if needed\n');
  }
}

main().catch(console.error);
