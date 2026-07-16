#!/usr/bin/env node

/**
 * Script per ottimizzare automaticamente le immagini del blog
 * Converte JPG/PNG in WebP con qualità 82% per ridurre il peso del 60%
 * 
 * Uso: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurazione
const config = {
  inputDir: './public/images/blog',
  quality: 82, // Qualità WebP ottimale per il web
  extensions: ['.jpg', '.jpeg', '.png'],
  skipIfExists: true // Skip se il file WebP esiste già
};

// Verifica se cwebp è installato
function checkCWebP() {
  try {
    execSync('cwebp -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ cwebp non trovato. Installa con:');
    console.error('  macOS: brew install webp');
    console.error('  Ubuntu: sudo apt install webp');
    console.error('  Windows: Scarica da https://developers.google.com/speed/webp/download');
    return false;
  }
}

// Ottimizza una singola immagine
function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!config.extensions.includes(ext)) return false;

  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Skip se WebP esiste già
  if (config.skipIfExists && fs.existsSync(webpPath)) {
    console.log(`⏭️  Skip: ${path.basename(webpPath)} (già exists)`);
    return false;
  }

  try {
    const originalSize = fs.statSync(filePath).size;
    
    // Converti in WebP
    execSync(`cwebp -q ${config.quality} "${filePath}" -o "${webpPath}"`, { 
      stdio: 'ignore' 
    });
    
    const webpSize = fs.statSync(webpPath).size;
    const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(filePath)} → ${path.basename(webpPath)}`);
    console.log(`   📉 Riduzione: ${reduction}% (${formatBytes(originalSize)} → ${formatBytes(webpSize)})`);
    
    return true;
  } catch (error) {
    console.error(`❌ Errore ottimizzando ${filePath}:`, error.message);
    return false;
  }
}

// Formatta i byte in formato leggibile
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Scansiona ricorsivamente una directory
function scanDirectory(dir) {
  let optimized = 0;
  let totalFiles = 0;

  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      const [subOptimized, subTotal] = scanDirectory(filePath);
      optimized += subOptimized;
      totalFiles += subTotal;
    } else if (file.isFile()) {
      totalFiles++;
      if (optimizeImage(filePath)) {
        optimized++;
      }
    }
  }
  
  return [optimized, totalFiles];
}

// Main function
function main() {
  console.log('🎯 NoLimits3D Image Optimizer');
  console.log('================================');
  
  if (!checkCWebP()) {
    process.exit(1);
  }
  
  if (!fs.existsSync(config.inputDir)) {
    console.error(`❌ Directory non trovata: ${config.inputDir}`);
    process.exit(1);
  }
  
  console.log(`📁 Scansione: ${config.inputDir}`);
  console.log(`⚙️  Qualità WebP: ${config.quality}%`);
  console.log('');
  
  const startTime = Date.now();
  const [optimized, totalFiles] = scanDirectory(config.inputDir);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log('');
  console.log('📊 Risultato:');
  console.log(`   🖼️  Immagini trovate: ${totalFiles}`);
  console.log(`   ✅ Immagini ottimizzate: ${optimized}`);
  console.log(`   ⏱️  Tempo: ${duration}s`);
  
  if (optimized > 0) {
    console.log('');
    console.log('💡 Suggerimenti:');
    console.log('   • Usa <OptimizedImage> nei componenti React');
    console.log('   • Le immagini WebP sono caricate automaticamente nei browser compatibili');
    console.log('   • Controlla Core Web Vitals con Lighthouse dopo il deploy');
  }
}

// Esegui solo se chiamato direttamente
if (require.main === module) {
  main();
}

module.exports = { optimizeImage, scanDirectory }; 