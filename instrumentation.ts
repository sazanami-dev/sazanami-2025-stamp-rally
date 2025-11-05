import Logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";

async function initializeInstrumentation(logger: Logger) {
  logger.info('System check starting...');
  await testDbConnection(logger);
}

async function testDbConnection(logger: Logger) {
  const dbLogger = logger.getChild('database');
  dbLogger.info('Testing database connection...');
  try {
    const result = await prisma.$queryRaw`SELECT version()` as [{ version: string }];
    dbLogger.success("Success: " + result[0].version.split(" ").slice(0, 2).join(" "));
  } catch (error) {
    dbLogger.error('Database connection failed: ' + (error as Error).message);
  }
}

const logger = new Logger('check');

initializeInstrumentation(logger).then(() => {
  logger.complete('System check complete.');
});


console.log(process.env.DATABASE_URL);
