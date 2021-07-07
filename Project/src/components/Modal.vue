<template>
  <div class="modal_background">
    <div class="modal_content">
      <slot name="content"></slot>
      <button type="button" class="close_button" @click="close">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props:{
    visible: Boolean,
  },
  methods: {
    close() {
      this.$emit('close', this.visible);
    }
  }
}
</script>

<style scoped lang="scss">
* {
  display: flex;
  justify-content: center;
  align-items: center; 
}
.modal_background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.close_button {
  position:absolute;
  width: 25px;
  height: 25px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: white;
  background: red;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 15px;
  padding: 10px;
}
.close_button:hover {
  box-shadow: 0 0 4px 0 #610c0c;
  color: black;
}
.modal_content {
  position: fixed;
  top: 50px;
  box-shadow: 0 0 10px 0 #5e5d5d;
}
</style>