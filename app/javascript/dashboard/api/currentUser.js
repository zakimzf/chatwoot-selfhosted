import ApiClient from './ApiClient';
import snakecaseKeys from 'snakecase-keys';

class CurrentUserAPI extends ApiClient {
  constructor() {
    super('', { accountScoped: false, transformKeys: true });
  }

  validateToken() {
    return this.makeRequest({ url: '/auth/validate_token', method: 'get' });
  }

  profileUpdate({ password, passwordConfirmation, ...profileAttributes }) {
    const formData = new FormData();
    Object.keys(snakecaseKeys(profileAttributes)).forEach(key => {
      const value = profileAttributes[key];
      if (value) {
        formData.append(`profile[${key}]`, value);
      }
    });
    if (password && passwordConfirmation) {
      formData.append('profile[password]', password);
      formData.append('profile[password_confirmation]', passwordConfirmation);
    }
    return this.makeRequest({
      url: `${this.url}/profile`,
      data: formData,
      method: 'patch',
    });
  }
}

export default new CurrentUserAPI();
