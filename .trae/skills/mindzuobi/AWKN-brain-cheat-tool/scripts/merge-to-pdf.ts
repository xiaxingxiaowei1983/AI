#!/usr/bin/env bun
/**
 * 合并漫画页面为PDF
 */

import { PDFDocument } from 'pdf-lib';
import { readdirSync } from 'fs';
import { join } from 'path';

async function mergeImagesToPdf(imageDir: string, outputPdf: string) {
  console.log(`[merge-to-pdf] Merging images from ${imageDir} to ${outputPdf}...`);

  // 创建新PDF
  const pdfDoc = await PDFDocument.create();

  // 读取图片文件
  const files = readdirSync(imageDir)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .sort();

  if (files.length === 0) {
    console.error('[merge-to-pdf] No image files found!');
    process.exit(1);
  }

  console.log(`[merge-to-pdf] Found ${files.length} images`);

  // 为每张图片创建一个页面
  for (const file of files) {
    const imagePath = join(imageDir, file);
    console.log(`[merge-to-pdf] Processing ${file}...`);

    const imageBytes = await Bun.file(imagePath).arrayBuffer();
    let image;

    if (file.endsWith('.png')) {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  // 保存PDF
  const pdfBytes = await pdfDoc.save();
  await Bun.write(outputPdf, pdfBytes);

  console.log(`[merge-to-pdf] PDF saved to ${outputPdf}`);
}

// 使用方式
const imageDir = process.argv[2];
const outputPdf = process.argv[3];

if (!imageDir || !outputPdf) {
  console.error('Usage: bun merge-to-pdf.ts <image-dir> <output-pdf>');
  process.exit(1);
}

mergeImagesToPdf(imageDir, outputPdf).catch(console.error);
