import { Backend, KuzzleRequest } from 'kuzzle';
import { DateTime } from 'luxon';

import { SchedulerPlugin } from '../../../lib/SchedulerPlugin';
import {
  dummyIotScheduledTask,
  cleanDatabaseScheduledTask
} from './scheduledTasks';

const app = new Backend('kuzzle');

const schedulerPlugin = new SchedulerPlugin();

schedulerPlugin.registerEngineTask(cleanDatabaseScheduledTask);
schedulerPlugin.registerEngineTask(dummyIotScheduledTask, {
  group: 'iot',
});

app.plugin.use(schedulerPlugin);

app.hook.register('request:onError', async (request: KuzzleRequest) => {
  app.log.error(request.error);
});

app.config.set('plugins.kuzzle-plugin-logger.services.stdout.level', 'debug');

app.start()
  .then(async () => {
    app.log.info('Application started');
  })
  .catch(console.error);
