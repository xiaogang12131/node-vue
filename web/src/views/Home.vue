<template>
  <div class="home">
    <van-button @touchstart.stop="show = true">
      弹出默认键盘
    </van-button>
    <div v-inview:style="{'background-color':'#eee'}" style="height: 500px;border: 1px solid #000"></div>
    <div v-inview:style="{'background-color':'#eee'}" style="margin-top:200px;height: 300px;border: 1px solid #000">
    </div>
    <van-number-keyboard :show="show" extra-key="." close-button-text="完成" @blur="show = false" @input="onInput"
      @delete="onDelete" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    onInput(value) {
      this.$toast(value);
    },
    onDelete() {
      this.$toast("删除");
    }
  }
};
</script>
