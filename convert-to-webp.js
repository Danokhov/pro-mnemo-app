import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке с изображениями
const imagesDir = path.join(__dirname, 'public', 'images', 'associations');

// Проверяем, установлен ли sharp (библиотека для конвертации изображений)
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default;
} catch (e) {
  console.log('❌ Sharp не установлен. Устанавливаю...');
  try {
    execSync('npm install sharp --save-dev', { stdio: 'inherit', cwd: __dirname });
    const sharpModule = await import('sharp');
    sharp = sharpModule.default;
    console.log('✅ Sharp установлен');
  } catch (err) {
    console.error('❌ Не удалось установить sharp. Установите вручную: npm install sharp --save-dev');
    process.exit(1);
  }
}

// Функция для конвертации изображения в WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 }) // Качество 85% - хороший баланс между размером и качеством
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.error(`Ошибка при конвертации ${inputPath}:`, error.message);
    return false;
  }
}

// Функция для обработки всех изображений в директории
async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let converted = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Рекурсивно обрабатываем поддиректории
      const result = await processDirectory(filePath);
      converted += result.converted;
      skipped += result.skipped;
      errors += result.errors;
      continue;
    }

    // Проверяем, что это изображение
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    // Создаем имя для WebP файла
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Пропускаем, если WebP уже существует
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Пропущено (уже существует): ${file}`);
      skipped++;
      continue;
    }

    console.log(`🔄 Конвертирую: ${file}...`);
    const success = await convertToWebP(filePath, webpPath);
    
    if (success) {
      const originalSize = stat.size;
      const newSize = fs.statSync(webpPath).size;
      const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`✅ Готово: ${file} (сэкономлено ${saved}%)`);
      converted++;
    } else {
      errors++;
    }
  }

  return { converted, skipped, errors };
}

// Главная функция
async function main() {
  console.log('🚀 Начинаю конвертацию изображений в WebP...\n');
  console.log(`📁 Папка: ${imagesDir}\n`);

  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Папка не найдена: ${imagesDir}`);
    process.exit(1);
  }

  const result = await processDirectory(imagesDir);

  console.log('\n📊 Результаты:');
  console.log(`   ✅ Конвертировано: ${result.converted}`);
  console.log(`   ⏭️  Пропущено: ${result.skipped}`);
  console.log(`   ❌ Ошибок: ${result.errors}`);
  console.log('\n✨ Готово!');
}

main().catch(console.error);
