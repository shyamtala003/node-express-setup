import { WebClient } from '@slack/web-api';
import logger from './logger.js';
import { SLACK_BOT_TOKEN, SLACK_CHANNEL_ID } from '../configs/environment.js';

const slackClient = new WebClient(SLACK_BOT_TOKEN);

const formatMessage = message => {
  if (message instanceof Error) {
    return `\n\`\`\`Error: ${message.message}\nStack: ${message.stack}\`\`\``;
  } else if (typeof message === 'object') {
    return `\n\`\`\`${JSON.stringify(message, null, 2)}\`\`\``;
  }
  return message;
};

const sendSlackNotification = async ({
  type = 'log',
  title,
  message,
  channel = SLACK_CHANNEL_ID
}) => {
  try {
    const formattedMessage = formatMessage(message);
    const colorMap = {
      log: '#00fa92',
      info: '#00fdff',
      warn: '#dff774',
      error: '#ff0070'
    };

    const options = colorMap[type]
      ? {
          attachments: [
            {
              color: colorMap[type],
              title,
              text: formattedMessage
            }
          ]
        }
      : {};

    await slackClient.chat.postMessage({
      channel,
      text: `*${type.toUpperCase()}*`,
      ...options
    });
  } catch (error) {
    logger.error(error);
  }
};

export default sendSlackNotification;
