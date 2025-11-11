import Logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { ServerEnvUtil, ServerEnvKey } from "./lib/serverEnv";

async function initializeInstrumentation(logger: Logger) {
  logger.info('System check starting...');
  await testDbConnection(logger);
  await previewEnvVal(logger);
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

async function previewEnvVal(logger: Logger) {
  const envLogger = logger.getChild('env');
  envLogger.debug(`BASE_URL: ${ServerEnvUtil.get(ServerEnvKey.BASE_URL)}`);
}

const logger = new Logger('check');

initializeInstrumentation(logger).then(() => {
  logger.complete('System check complete.');
});

