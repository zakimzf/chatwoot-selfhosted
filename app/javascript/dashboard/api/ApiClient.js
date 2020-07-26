const DEFAULT_API_VERSION = 'v1';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

class ApiClient {
  constructor(resource, options = {}) {
    this.apiVersion = `/api/${options.apiVersion || DEFAULT_API_VERSION}`;
    this.options = options;
    this.resource = resource;
  }

  get url() {
    return `${this.baseUrl()}/${this.resource}`;
  }

  transformResponse = [
    data => {
      if (data) {
        return camelcaseKeys(JSON.parse(data), { deep: true });
      }
      return data;
    },
  ];

  transformRequest = [
    (data, headers) => {
      if (data) {
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json;charset=utf-8';
        }
        return JSON.stringify(snakecaseKeys(data, { deep: true }));
      }
      return data;
    },
  ];

  makeRequest({ url, method, params, data }) {
    const config = { method, url };
    if (params) {
      config.params = params;
    }

    if (data) {
      config.data = data;
    }

    if (this.options.transformKeys) {
      config.transformRequest = this.transformRequest;
      config.transformResponse = this.transformResponse;
    }

    return axios.request(config);
  }

  baseUrl() {
    let url = this.apiVersion;
    if (this.options.accountScoped) {
      const isInsideAccountScopedURLs = window.location.pathname.includes(
        '/app/accounts'
      );

      if (isInsideAccountScopedURLs) {
        const accountId = window.location.pathname.split('/')[3];
        url = `${url}/accounts/${accountId}`;
      }
    }

    return url;
  }

  get() {
    return this.makeRequest({ url: this.url, method: 'get' });
  }

  show(id) {
    return this.makeRequest({ url: `${this.url}/${id}`, method: 'get' });
  }

  create(data) {
    return this.makeRequest({ url: this.url, method: 'post', data });
  }

  update(id, data) {
    return this.makeRequest({
      url: `${this.url}/${id}`,
      method: 'patch',
      data,
    });
  }

  delete(id) {
    return this.makeRequest({ url: `${this.url}/${id}`, method: 'delete' });
  }
}

export default ApiClient;
