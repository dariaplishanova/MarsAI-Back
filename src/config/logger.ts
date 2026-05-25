import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    // Écrit toutes les erreurs dans 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Écrit tous les logs dans 'combined.log'
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// En développement, on affiche aussi dans la console avec des couleurs
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
          if (stack) {
            return `[${timestamp}] ${level}: ${message}\n${stack}`;
          }
          // C'est ici que l'on définit l'ordre d'affichage pour la console
          const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
          return `[${timestamp}] ${level}: ${message} ${metaString}`;
        }),
      ),
    }),
  );
}

export default logger;
