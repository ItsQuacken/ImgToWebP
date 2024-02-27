import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const ulaz = "C:/Users/karlo/OneDrive/Desktop/img";
const izlaz = "C:/Users/karlo/OneDrive/Desktop/imgs";

async function konverzija(ulazPut: string, izlazPut: string): Promise<void> {
  try {
    await sharp(ulazPut).toFile(izlazPut);
  } catch (error: any) {
    console.error(
      `Problem kod pretvorbe ${ulazPut}: ${(error as Error).message}`
    );
  }
}

async function konverzijaFolder(ulaz: string, izlaz: string): Promise<void> {
  try {
    if (!fs.existsSync(izlaz)) {
      fs.mkdirSync(izlaz, { recursive: true });
    }

    const files = fs.readdirSync(ulaz);

    for (const file of files) {
      const ulazPut = path.join(ulaz, file);
      const fileIme = `${path.parse(file).name}.webp`;
      const izlazPut = path.join(izlaz, fileIme);

      await konverzija(ulazPut, izlazPut);
    }
  } catch (error: any) {
    console.error(`Problem kod pretvorbe: ${(error as Error).message}`);
  }
}

konverzijaFolder(ulaz, izlaz);
