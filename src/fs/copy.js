import { stat, mkdir, readdir, copyFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const origPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files');
const errorMessage = 'FS operation failed';

const copy = async () => {
  try {
    await stat(origPath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    }
  }

  try {
    await stat(copyPath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir(copyPath, {recursive: true});
      await copyFiles(origPath, copyPath);
    } else {
      throw new Error(errorMessage);
    }
  }
};

const copyOneFile = async (fileName, originalPath, savedPath) => {
  const originalFilePath = path.join(originalPath, fileName);
  const savedFilePath = path.join(savedPath, fileName);
  try {
    await copyFile(originalFilePath, savedFilePath);
  } catch (error) {
    throw new Error(errorMessage);
  }
}

const copyFiles = async (originalPath, savedPath) => {
  const folderContent = await readdir(originalPath, { withFileTypes: true });
  for (const folderElement of folderContent) {
    const copiedFileName = folderElement.name;

    if (folderElement.isFile()) {
      await copyOneFile(copiedFileName, originalPath, savedPath)
    }
    if (folderElement.isDirectory()) {
      const recursiveOriginalFilePath = path.join(originalPath, copiedFileName);
      const recursiveSavedFilePath = path.join(savedPath, copiedFileName);
      await mkdir(recursiveSavedFilePath, { recursive: true });
      await copyFiles(recursiveOriginalFilePath, recursiveSavedFilePath);
    }
  }
}

await copy();
