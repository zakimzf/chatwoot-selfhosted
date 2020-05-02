<template>
  <span class="back-button" @click.capture="goBack">
    <feather type="chevron-left" />
    Back
  </span>
</template>
<script>
import router from '../../routes/index';

export default {
  methods: {
    goBack() {
      router.go(-1);
    },
  },
};
</script>
