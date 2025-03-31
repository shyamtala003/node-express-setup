import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { tempFolderPath } from '../../../../configs/global.config.js';
import logger from '../../../../utils/logger.util.js';

/**
 * Compresses a video using FFmpeg.
 * @param {string} fileName - video file name.
 * @param {number} bitrate - Target bitrate (in kbps) for compression (default: 1000 kbps).
 * @returns {Promise<string>} - Resolves with the output file path.
 */

export default async function compressVideo({ fileName, bitrate = 1000 }) {
  try {
    const inputPath = tempFolderPath + fileName;
    const outputPath = tempFolderPath + 'compressed_' + fileName;
    const outputDir = path.dirname(tempFolderPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Step 1: Analyze the original video using ffprobe
    const probeData = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputPath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    const videoStream = probeData.streams.find(
      stream => stream.codec_type === 'video'
    );

    const originalBitrate = videoStream.bit_rate
      ? Math.floor(parseInt(videoStream.bit_rate) / 1000)
      : 'unknown'; // in kbps

    // Step 2: Adjust target bitrate based on original (use 80% of original or the default)
    const targetBitrate = Math.min(
      bitrate,
      originalBitrate !== 'unknown'
        ? Math.floor(originalBitrate * 0.8)
        : bitrate
    );

    // Step 3: Compress the video
    logger.info(
      `Compression start: ${outputPath} with target bitrate ${targetBitrate} kbps`
    );
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-c:v libx264', // H.264 video codec
          '-preset slow', // Use 'slow' for better compression
          `-b:v ${targetBitrate}k`, // Dynamic target bitrate
          `-maxrate ${targetBitrate}k`, // Enforce max bitrate
          `-bufsize ${targetBitrate * 2}k`, // Buffer size
          '-crf 28', // Higher CRF for smaller size
          '-c:a aac', // AAC audio codec
          '-b:a 64k', // Lower audio bitrate
          '-vf scale=1280:720' // Reduce resolution to 720p (if original is larger)
        ])
        .on('end', resolve)
        .on('error', err =>
          reject(new Error(`Compression failed: ${err.message}`))
        )
        .save(outputPath);
    });
    logger.log(`Compression successful: ${outputPath}`);
    return outputPath;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

// Example Usage with Async/Await
// (async () => {
//   try {
//     const compressedFilePath = await compressVideo({ fileName: 'video_1.mp4' });
//     logger.log(`Compressed video saved at: ${compressedFilePath}`);
//   } catch (err) {
//     logger.error(`Error: ${err.message}`);
//   }
// })();
