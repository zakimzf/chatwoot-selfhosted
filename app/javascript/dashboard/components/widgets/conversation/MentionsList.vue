<template>
  <ul
    v-if="mentionsList.length"
    id="mentions-list"
    class="vertical dropdown menu canned"
    :style="{ top: getTopPadding() + 'rem' }"
  >
    <li
      v-for="(item, index) in mentionsList"
      :id="`canned-${index}`"
      :key="item.email"
      :class="{ active: index === selectedIndex }"
      @click="onListItemSelection(index)"
      @mouseover="onHover(index)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['onKeyenter', 'onClick'],
  data() {
    return {
      selectedIndex: 0,
    };
  },
  computed: {
    ...mapGetters({
      mentionsList: 'agents/getAgents',
    }),
  },
  watch: {
    mentionsList(newMentionsList) {
      if (newMentionsList.length < this.selectedIndex + 1) {
        this.selectedIndex = 0;
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.keyListener);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keyListener);
  },
  methods: {
    getTopPadding() {
      if (this.mentionsList.length <= 4) {
        return -(this.mentionsList.length * 2.8 + 1.7);
      }
      return -14;
    },
    isUp(e) {
      return e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80); // UP, Ctrl-P
    },
    isDown(e) {
      return e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78); // DOWN, Ctrl-N
    },
    isEnter(e) {
      return e.keyCode === 13;
    },
    keyListener(e) {
      if (this.isUp(e)) {
        if (!this.selectedIndex) {
          this.selectedIndex = this.mentionsList.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
      }
      if (this.isDown(e)) {
        if (this.selectedIndex === this.mentionsList.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
      }
      if (this.isEnter(e)) {
        const selected = this.mentionsList[this.selectedIndex];
        this.onKeyenter(`@[${selected.name}](mention://${selected.email})`);
      }
      this.$el.scrollTop = 28 * this.selectedIndex;
    },
    onHover(index) {
      this.selectedIndex = index;
    },
    onListItemSelection(index) {
      this.selectedIndex = index;
      const selected = this.mentionsList[this.selectedIndex];
      this.onClick(`@[${selected.name}](mention://${selected.email})`);
    },
  },
};
</script>
