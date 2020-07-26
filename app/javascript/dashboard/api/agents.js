import ApiClient from './ApiClient';

class Agents extends ApiClient {
  constructor() {
    super('agents', { accountScoped: true, transformKeys: true });
  }
}

export default new Agents();
