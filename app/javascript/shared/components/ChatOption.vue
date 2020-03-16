<template>
  <li class="option" :class="{ 'is-selected': isSelected }">
    <button class="option-button" @click="onClick">
      <span v-if="isSelected" class="option-icon ion-checkmark-circled" />
      <span v-else class="option-icon ion-android-radio-button-off" />
      <span>{{ action.text }}</span>
    </button>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    action: {
      type: Object,
      default: () => {},
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      // Do postback here
    },
  },
};
</script>

<style scoped lang="scss">
@import '~dashboard/assets/scss/variables.scss';
@import '~dashboard/assets/scss/mixins.scss';

$option-min-height: $space-large + $space-smaller;
.option {
  .option-button {
    width: 100%;
    padding: 0;
    min-height: $option-min-height;
    font-size: $font-size-small;
    border-radius: 0;
    background: transparent;
    color: $color-woot;
    border: 0;
    text-align: left;
    cursor: pointer;

    span {
      display: inline-block;
      vertical-align: middle;
    }

    > .option-icon {
      margin-right: $space-smaller;
      font-size: $font-size-medium;
    }
  }

  + .option .option-button {
    @include border-light-top;
  }

  &.is-selected {
    .option-button {
      color: $success-color;
    }
  }
}
</style>
