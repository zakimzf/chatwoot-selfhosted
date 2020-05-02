<template>
  <div class="settings-header">
    <h1 class="page-title">
      <woot-sidemenu-icon></woot-sidemenu-icon>
      <back-button v-if="showBackButton"></back-button>
      <feather :type="icon" class="icon header--icon" />
      <span>{{ headerTitle }}</span>
    </h1>
    <router-link
      v-if="showNewButton && isAdmin"
      :to="buttonRoute"
      class="button icon success nice button--fixed-right-top"
    >
      <feather class="icon" type="plus-circle"></feather>
      {{ buttonText }}
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import BackButton from '../../../components/widgets/BackButton';

export default {
  components: {
    BackButton,
  },
  props: {
    headerTitle: {
      default: '',
      type: String,
    },
    buttonRoute: {
      default: '',
      type: String,
    },
    buttonText: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
    showBackButton: { type: Boolean, default: false },
    showNewButton: { type: Boolean, default: false },
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
    }),
    isAdmin() {
      const { role } = this.currentUser;
      return role === 'administrator';
    },
  },
};
</script>
