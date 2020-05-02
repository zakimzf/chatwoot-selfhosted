import { frontendURL } from '../helper/URLHelper';
import auth from '../api/auth';

const user = auth.getCurrentUser() || {};
const accountId = user.account_id;

export default {
  common: {
    routes: [
      'home',
      'inbox_dashboard',
      'inbox_conversation',
      'conversation_through_inbox',
      'settings_account_reports',
      'billing_deactivated',
      'profile_settings',
      'profile_settings_index',
    ],
    menuItems: {
      assignedToMe: {
        icon: 'message-circle',
        label: 'CONVERSATIONS',
        hasSubMenu: false,
        key: '',
        toState: frontendURL(`accounts/${accountId}/dashboard`),
        toolTip: 'Conversation from all subscribed inboxes',
        toStateName: 'home',
      },
      report: {
        icon: 'trending-up',
        label: 'REPORTS',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/reports`),
        toStateName: 'settings_account_reports',
      },
      settings: {
        icon: 'sliders',
        label: 'SETTINGS',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/settings`),
        toStateName: 'settings_home',
      },
    },
  },
  settings: {
    routes: [
      'agent_list',
      'agent_new',
      'canned_list',
      'canned_new',
      'settings_inbox',
      'settings_inbox_new',
      'settings_inbox_list',
      'settings_inbox_show',
      'settings_inboxes_page_channel',
      'settings_inboxes_add_agents',
      'settings_inbox_finish',
      'billing',
      'settings_integrations',
      'settings_integrations_webhook',
      'general_settings',
      'general_settings_index',
    ],
    menuItems: {
      back: {
        icon: 'chevron-left',
        label: 'HOME',
        hasSubMenu: false,
        toStateName: 'home',
        toState: frontendURL(`accounts/${accountId}/dashboard`),
      },
      agents: {
        icon: 'users',
        label: 'AGENTS',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/settings/agents/list`),
        toStateName: 'agent_list',
      },
      inboxes: {
        icon: 'inbox',
        label: 'INBOXES',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/settings/inboxes/list`),
        toStateName: 'settings_inbox_list',
      },
      cannedResponses: {
        icon: 'save',
        label: 'CANNED_RESPONSES',
        hasSubMenu: false,
        toState: frontendURL(
          `accounts/${accountId}/settings/canned-response/list`
        ),
        toStateName: 'canned_list',
      },
      billing: {
        icon: 'credit-card',
        label: 'BILLING',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/settings/billing`),
        toStateName: 'billing',
      },
      settings_integrations: {
        icon: 'zap',
        label: 'INTEGRATIONS',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/settings/integrations`),
        toStateName: 'settings_integrations',
      },
      general_settings: {
        icon: 'settings',
        label: 'ACCOUNT_SETTINGS',
        hasSubMenu: false,
        toState: frontendURL(`accounts/${accountId}/settings/general`),
        toStateName: 'general_settings',
      },
    },
  },
};
