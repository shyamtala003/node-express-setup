import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { tempFolderPath } from '../../../../configs/global.config.js';
import logger from '../../../../utils/logger.util.js';

/**
 * Gets the duration of a video.
 * @param {string} inputPath - Path to the video file.
 * @returns {Promise<number>} - Resolves with the video duration in seconds.
 */
async function getVideoDuration(inputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err)
        return reject(
          new Error(`Failed to get video duration: ${err.message}`)
        );
      resolve(metadata.format.duration || 0);
    });
  });
}

/**
 * Generates a snapshot (thumbnail) from a video.
 * @param {string} fileName - Video file name.
 * @param {number} timestamp - Time (in seconds) to capture the snapshot (default: 5 seconds).
 * @returns {Promise<string>} - Resolves with the output image path.
 */
export default async function generateSnapshot({ fileName, timestamp = 5 }) {
  try {
    const inputPath = path.join(tempFolderPath, fileName);
    const outputFileName = `snapshot_${path.parse(fileName).name}.jpg`;
    const outputPath = path.join(tempFolderPath, outputFileName);

    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath, { recursive: true });
    }

    const duration = await getVideoDuration(inputPath);

    if (duration === 0) {
      throw new Error('Invalid video file or unable to retrieve duration.');
    }

    const safeTimestamp = Math.min(timestamp, duration - 1);

    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .screenshots({
          timestamps: [safeTimestamp], // Capture frame at valid second
          filename: outputFileName, // Output filename
          folder: tempFolderPath, // Save location
          size: '640x?' // Resize width (keep aspect ratio)
        })
        .on('end', resolve)
        .on('error', err =>
          reject(new Error(`Snapshot generation failed: ${err.message}`))
        );
    });

    logger.log(`Snapshot created at ${safeTimestamp}s: ${outputPath}`);
    return outputPath;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

// Example Usage:
// (async () => {
//   try {
//     const snapshotPath = await generateSnapshot({ fileName: 'video_1.mp4', timestamp:5 });
//     logger.log(`Snapshot saved at: ${snapshotPath}`);
//   } catch (err) {
//     logger.error(`Error: ${err.message}`);
//   }
// })();
