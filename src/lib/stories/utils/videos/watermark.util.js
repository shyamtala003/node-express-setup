import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import {
  publicFolderPath,
  tempFolderPath
} from '../../../../configs/global.config.js';
import logger from '../../../../utils/logger.util.js';

/**
 * Generates overlay position based on x and y values.
 * @param {string|number} x - Horizontal position ('left', 'center', 'right' or '50%').
 * @param {string|number} y - Vertical position ('top', 'middle', 'bottom' or '50%').
 * @returns {string} - FFmpeg overlay position string.
 */
const getOverlayPosition = ({ x, y }) => {
  const positions = {
    left: '10',
    center: '(main_w-overlay_w)/2',
    right: 'main_w-overlay_w-10',
    top: '10',
    middle: '(main_h-overlay_h)/2',
    bottom: 'main_h-overlay_h-10'
  };

  const xPos =
    typeof x === 'string' && x.endsWith('%')
      ? `(main_w-overlay_w)*${parseFloat(x) / 100}`
      : positions[x] || positions.right;

  const yPos =
    typeof y === 'string' && y.endsWith('%')
      ? `(main_h-overlay_h)*${parseFloat(y) / 100}`
      : positions[y] || positions.bottom;

  return `${xPos}:${yPos}`;
};

/**
 * Adds a watermark image to a video with customizable position.
 * @param {string} fileName - The video file name.
 * @param {string} watermarkFile - The watermark image file name.
 * @param {object|string} position - Position object {x: "50%", y: "50%"} or string "left,top".
 * @returns {Promise<string>} - Resolves with the output file path.
 */

export default async function addWatermark({
  fileName,
  watermarkFile = 'logo.jpg',
  position = { x: 'left', y: 'middle' }
}) {
  try {
    const inputPath = path.join(tempFolderPath, fileName);
    const watermarkPath = path.join(publicFolderPath, watermarkFile);
    const outputFileName = `watermarked_${fileName}`;
    const outputPath = path.join(tempFolderPath, outputFileName);

    if (!fs.existsSync(inputPath)) throw new Error('Video file not found.');
    if (!fs.existsSync(watermarkPath))
      throw new Error('Watermark image file not found.');

    const overlayPosition = getOverlayPosition(position);

    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(inputPath) // Video input
        .input(watermarkPath) // Watermark input
        .complexFilter([
          `[1:v]scale=iw*0.1:-1[wm]; [0:v][wm]overlay=${overlayPosition}`
        ])
        .outputOptions('-codec:a copy') // Keep original audio
        .on('end', resolve)
        .on('error', err =>
          reject(new Error(`Watermarking failed: ${err.message}`))
        )
        .save(outputPath);
    });

    logger.log(`Watermark added successfully: ${outputPath}`);
    return outputPath;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}
