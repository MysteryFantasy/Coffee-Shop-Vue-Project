<template>
  <div class="cartItem">
    <img class="cartItem_image" :src="require('../assets/images/' + cartItemData.image)" alt="img">
    <div class="cartItem_info">
      <p>{{cartItemData.title}}<p/>
      <p>{{cartItemData.cost}}<p/>
    </div>
    
    <div class="cartItemQuantity"> 
      <p>Quantity</p>
      <p>
        <span class="quantity_btn" @click="decrementItem">-</span>
        {{cartItemData.quantity}}
        <span class="quantity_btn" @click="incrementItem">+</span>
      </p>
    </div>
    <button class="carItem_delete" @click="deleteFromCart">Delete</button>

  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    cartItemData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    decrementItem(){
      this.$emit('decrementItem');
    },
    incrementItem(){
      this.$emit('incrementItem');
    },
    deleteFromCart() {
      this.$emit('deleteFromCart');
    }
  }
}
</script>

<style lang="scss">
.cartItem {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  width: 500px;
  height: 80px;
  margin: 8px;
  margin-bottom: 16px;
}
.cartItem:hover {
  box-shadow: 0 0 8px 0 #999898;
}
.cartItem_image {
  max-width: 80px;
}
.quantity_btn{
  cursor: pointer;
  border: 1px solid rgb(223, 222, 222);
  border-radius: 3px;
  padding: 0px 6px;
}
.quantity_btn:hover {
  box-shadow: 0 0 8px 0 #5e5d5d;
}
.carItem_delete {
  cursor: pointer;
  background: rgb(233, 15, 15);
  color: white;
  border-radius: 5px;
  padding: 4px 12px;
  margin: 8px;
}
.carItem_delete:hover {
  box-shadow: 0 0 4px 0 #610c0c;
  color:black;
}
</style>