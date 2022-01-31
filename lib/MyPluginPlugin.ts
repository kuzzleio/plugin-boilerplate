import {
  Plugin,
  JSONObject,
  EmbeddedSDK,
  PluginContext,
  InternalError,
  Mutex,
} from 'kuzzle';
import _ from 'lodash';

import { MyPluginConfiguration } from './types';


export class MyPluginPlugin extends Plugin {
  /**
   * Plugin configuration
   */
  public config: MyPluginConfiguration;


  private get sdk () {
    return this.context.accessors.sdk;
  }

  /**
   * @internal
   */
  constructor () {
    super({
      'kuzzleVersion': '>=2.16.0 <3'
    });

    /* eslint-disable sort-keys */
    this.config = {};

    this.pipes = {};
    /* eslint-enable sort-keys */
  }

  /**
   * @internal
   */
  async init (config: JSONObject, context: PluginContext) {
    this.context = context;
    this.config = _.merge({}, this.config, config);


    try {
      await this.initDatabase();
    }
    catch (error) {
      throw new InternalError(`Cannot initialize database: ${error.message}`);
    }
  }

  private async initDatabase () {
    const mutex = new Mutex('my-plugin/init-database');

    await mutex.lock();

    try {
      if (! await this.sdk.index.exists(this.config.adminIndex)) {
        // Possible race condition because of index cache propagation.
        // The index has been created but the node didn't receive the index
        // cache update message yet, causing index:exists to returns false
        try {
          await this.sdk.index.create(this.config.adminIndex);
        }
        catch (error) {
          if (! error.message.includes('already exists')) {
            throw error;
          }
        }
      }
    }
    finally {
      await mutex.unlock();
    }
  }
}
