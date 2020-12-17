<template>
  <div class="medium-10 column signup">
    <div class="text-center medium-12 signup--hero">
      <img
        :src="globalConfig.logo"
        :alt="globalConfig.installationName"
        class="hero--logo"
      />
      <h2 class="hero--title">
        {{ $t('REGISTER.TRY_WOOT') }}
      </h2>
    </div>
    <div class="row align-center">
      <div class="medium-5 column small-12">
        <ul class="signup--features">
          <li v-for="feature in features" :key="feature.key">
            <i :class="feature.className" />
            <span>{{ $t(`REGISTER.FEATURES.${feature.key}`) }}</span>
          </li>
        </ul>
      </div>
      <div class="medium-5 column small-12">
        <form class="signup--box login-box" @submit.prevent="submit">
          <div class="column log-in-form">
            <label :class="{ error: $v.credentials.name.$error }">
              {{ $t('REGISTER.ACCOUNT_NAME.LABEL') }}
              <input
                v-model.trim="credentials.name"
                type="text"
                :placeholder="$t('REGISTER.ACCOUNT_NAME.PLACEHOLDER')"
                @input="$v.credentials.name.$touch"
              />
              <span v-if="$v.credentials.name.$error" class="message">
                {{ $t('REGISTER.ACCOUNT_NAME.ERROR') }}
              </span>
            </label>
            <label :class="{ error: $v.credentials.email.$error }">
              {{ $t('REGISTER.EMAIL.LABEL') }}
              <input
                v-model.trim="credentials.email"
                type="email"
                :placeholder="$t('REGISTER.EMAIL.PLACEHOLDER')"
                @input="$v.credentials.email.$touch"
              />
              <span v-if="$v.credentials.email.$error" class="message">
                {{ $t('REGISTER.EMAIL.ERROR') }}
              </span>
            </label>
            <woot-submit-button
              :disabled="
                $v.credentials.name.$invalid ||
                  $v.credentials.email.$invalid ||
                  isRegistrationInProgress
              "
              :button-text="$t('REGISTER.SUBMIT')"
              :loading="isRegistrationInProgress"
              button-class="large expanded"
            >
            </woot-submit-button>
            <p class="accept--terms" v-html="termsLink"></p>
          </div>
        </form>
        <div class="column text-center sigin--footer">
          <span>{{ $t('REGISTER.HAVE_AN_ACCOUNT') }}</span>
          <router-link to="/app/login">
            {{
              $t('LOGIN.TITLE', {
                installationName: globalConfig.installationName,
              })
            }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import Auth from '../../api/auth';
import { mapGetters } from 'vuex';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';

export default {
  mixins: [globalConfigMixin],
  data() {
    return {
      isRegistrationInProgress: false,
      credentials: {
        name: '',
        email: '',
      },
      register: {
        message: '',
        showLoading: false,
      },
      error: '',
      features: [
        { key: 'UNLIMITED_INBOXES', className: 'ion-beer beer' },
        { key: 'ROBUST_REPORTING', className: 'ion-stats-bars report' },
        { key: 'CANNED_RESPONSES', className: 'ion-chatbox-working canned' },
        { key: 'AUTO_ASSIGNMENT', className: 'ion-loop uptime' },
        { key: 'SECURITY', className: 'ion-locked secure' },
      ],
    };
  },
  validations: {
    credentials: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    ...mapGetters({ globalConfig: 'globalConfig/get' }),
    termsLink() {
      const { termsURL, privacyURL } = this.globalConfig;
      return this.$t('REGISTER.TERMS_ACCEPT', { termsURL, privacyURL });
    },
  },
  methods: {
    async submit() {
      this.isRegistrationInProgress = true;
      try {
        const response = await Auth.register(this.credentials);
        if (response.status === 200) {
          window.location = '/';
        }
      } catch (error) {
        let errorMessage = this.$t('REGISTER.API.ERROR_MESSAGE');
        if (error.response && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        this.showAlert(errorMessage);
      } finally {
        this.isRegistrationInProgress = false;
      }
    },
  },
};
</script>
