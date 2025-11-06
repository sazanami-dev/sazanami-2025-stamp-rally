import type { NextRequest } from 'next/server'
import Logger from './lib/logger'

const logger = new Logger('proxy')
 
export function proxy(request: NextRequest) {
  // logger.debug(`Proxying request: ${request.method} ${request.url}`)
  return new Response('Proxy endpoint is under construction.', { status: 501 });
}
