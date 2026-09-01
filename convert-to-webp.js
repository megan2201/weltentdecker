import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

// Pfad zum Ordner mit deinen Bildern (z.B. 'public/images' oder 'src/assets/images')
const TARGET_DIR = "./public/img";

// Einstellungen
const WEBP_QUALITY = 80; // Qualität von 0 bis 100 (80 ist ein perfekter Kompromiss aus Größe & Qualität)
const DELETE_ORIGINALS = false; // Auf `true` setzen, wenn Originaldateien nach der Konvertierung gelöscht werden sollen

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function processDirectory(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        // Unterordner rekursiv durchsuchen
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();

        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          const outputPath =
            fullPath.substring(0, fullPath.lastIndexOf(".")) + ".webp";

          console.log(`Konvertiere: ${fullPath} -> ${outputPath}`);

          // Bild konvertieren und speichern
          await sharp(fullPath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);

          // Optional: Originaldatei löschen
          if (DELETE_ORIGINALS) {
            await fs.unlink(fullPath);
            console.log(`Gelöscht: ${fullPath}`);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Fehler beim Verarbeiten von ${directory}:`, error);
  }
}

async function run() {
  console.log("🚀 Starte Konvertierung in WebP...\n");
  await processDirectory(TARGET_DIR);
  console.log("\n✅ Konvertierung abgeschlossen!");
}

run();
