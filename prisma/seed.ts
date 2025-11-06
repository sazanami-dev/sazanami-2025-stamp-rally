import { parseArgs } from 'node:util'
import { ParseArgsConfig } from 'node:util'
import developSeeder from './seeds/development'

const argsConfig: ParseArgsConfig = {
  options: {
    environment: {
      type: 'string',
    },
  }
}

async function execute() {
  const {
    values: { environment },
  } = parseArgs(argsConfig)

  switch (environment) {
    case 'development':
      await developSeeder()
      break;
    case 'production':
      console.log('Production seeding not implemented yet.');
      break;
    default:
      console.log(
        'Please provide a valid environment');
  }

}

execute();
