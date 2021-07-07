<template>
  <div class="cart">
    <OrderInfo />
    <div v-show="this.getOrderInfo">
      <h2>Cart</h2>
      <p class="cart_info" v-if="!cartData.length">There are no products in the cart...</p>
      <CartItem
        v-for="(item, index) in cartData"
        :key="item.article"
        :cartItemData="item"
        @deleteFromCart="deleteFromCart(index)"
        @incrementItem="incrementItem(index)"
        @decrementItem="decrementItem(index)"
      />
    
      <div class="cart_total" v-if="cartData.length">
        <h3>Total: {{cartTotalCost}} ₴</h3>
        <span class='next_btn' @click="openDeliveryInfo">Next<i class="material-icons">navigate_next</i></span>
      </div>
    
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem'
import OrderInfo from './OrderInfo'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartItem: CartItem,
    OrderInfo: OrderInfo
  },
  props: {
    cartData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'cartBox',
      'getDeliveryInfo',
      'getOrderInfo'
    ]),
    cartTotalCost() {
      let result = [];
      if(this.cartData.length){
        for (let item of this.cartData){
          result.push(item.cost * item.quantity);
        }
        result = result.reduce(function(sum, el){
          return sum + el;
        });
        this.cartBox.total = result;
        return result;
      } else {
        return 0;
      }
    }        
  },
  methods: {
    ...mapActions([
      'decrementCartItem',
      'incrementCartItem',
      'deleteFromCartBox',
    ]),
    ...mapMutations([
      'setDeliveryInfo',
      'setOrderInfo'
    ]),
    incrementItem(index) {
      this.incrementCartItem(index);
    },
    decrementItem(index) {
      this.decrementCartItem(index);
    },
    deleteFromCart(index){
      this.deleteFromCartBox(index);
    },
    openDeliveryInfo() {
      if (this.cartData.length > 0) {
        this.setDeliveryInfo(true);
        this.setOrderInfo(false);
      }	
    }
  }
}
</script>

<style lang="scss">
.cart {
  display: flex;
  cursor: pointer;
  background-color: white;
  border-radius: 6px;
}
.cart_info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 150px;
  padding: 8px 16px;
}
.cart_total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  margin-left: 10px;
}
.next_btn {
  display: flex;
  align-items:center;
  cursor: pointer;
  background: rgb(221, 205, 59);
  color: white;
  border-radius: 5px;
  padding: 3px 10px;
}
.next_btn:hover {
  box-shadow: 0 0 4px 0 #2e1306;
  color:rgb(117, 60, 27);
}
</style>