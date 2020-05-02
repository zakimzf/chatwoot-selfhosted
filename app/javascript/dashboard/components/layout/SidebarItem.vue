<template>
  <router-link
    :to="menuItem.toState"
    tag="li"
    active-class="active"
    :class="computedClass"
  >
    <a
      class="sub-menu-title"
      :class="getMenuItemClass"
      data-tooltip
      aria-haspopup="true"
      :title="menuItem.toolTip"
    >
      <div class="wrap">
        <feather :type="menuItem.icon" class="feather-icon"></feather>
        {{ $t(`SIDEBAR.${menuItem.label}`) }}
      </div>
      <feather
        v-if="showItem(menuItem)"
        type="plus-circle"
        class="child-icon"
        @click.prevent="newLinkClick"
      />
    </a>
    <ul v-if="menuItem.hasSubMenu" class="nested vertical menu">
      <router-link
        v-for="child in menuItem.children"
        :key="child.id"
        active-class="active flex-container"
        tag="li"
        :to="child.toState"
      >
        <a href="#">
          <div class="wrap inbox-list-item">
            <feather
              v-if="computedInboxClass(child)"
              class="inbox-icon"
              :type="computedInboxClass(child)"
            >
            </feather>
            {{ child.label }}
          </div>
        </a>
      </router-link>
    </ul>
  </router-link>
</template>

<script>
/* eslint no-console: 0 */
import { mapGetters } from 'vuex';

import router from '../../routes';
import auth from '../../api/auth';
const feather = require('feather-icons');

const INBOX_TYPES = {
  WEB: 'Channel::WebWidget',
  FB: 'Channel::FacebookPage',
  TWITTER: 'Channel::TwitterProfile',
  TWILIO: 'Channel::TwilioSms',
};
const getInboxClassByType = type => {
  switch (type) {
    case INBOX_TYPES.WEB:
      return 'globe';

    case INBOX_TYPES.FB:
      return 'facebook';

    case INBOX_TYPES.TWITTER:
      return 'twitter';

    case INBOX_TYPES.TWILIO:
      return 'smartphone';

    default:
      return '';
  }
};

export default {
  props: {
    menuItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters({
      activeInbox: 'getSelectedInbox',
    }),
    getMenuItemClass() {
      return this.menuItem.cssClass
        ? `side-menu ${this.menuItem.cssClass}`
        : 'side-menu';
    },
    computedClass() {
      // If active Inbox is present
      // donot highlight conversations
      if (this.activeInbox) return ' ';

      if (
        this.$store.state.route.name === 'inbox_conversation' &&
        this.menuItem.toStateName === 'home'
      ) {
        return 'active';
      }
      return ' ';
    },
  },
  mounted() {
    feather.replace();
  },
  methods: {
    computedInboxClass(child) {
      const { type } = child;
      const classByType = getInboxClassByType(type);
      return classByType;
    },
    newLinkClick() {
      router.push({ name: 'settings_inbox_new', params: { page: 'new' } });
    },
    showItem(item) {
      return auth.isAdmin() && item.newLink !== undefined;
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-menu-title {
  display: flex;
  justify-content: space-between;
}

.wrap {
  display: flex;
  align-items: center;
}

.inbox-list-item {
  i.feather {
    min-width: 2rem;
  }
}
</style>
