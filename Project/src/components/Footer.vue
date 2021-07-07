<template>
  <div class="footer">
    <img src="../assets/logo.png" alt="">
      <div>
        <h3>Contact us</h3>
        <p>+38 (000) 000 00 00</p>
      </div>
      <div>
        <h3>Social media</h3>
        <a href="https://www.facebook.com/"><i class="material-icons">facebook</i></a>
        <a href="https://www.instagram.com/"><i class="material-icons">photo_camera</i></a>
        <a href="https://www.gmail.com//"><i class="material-icons">email</i></a>
      </div>
    <span class="show_cart" @click="openCart" v-if="cartBox.length"><i class="material-icons">shopping_basket</i>{{checkCartCounter()}} </span>

    <Modal v-if="getModalWindowVisibility" @close="closeModal">
      <template v-slot:content>
        <div class='cart_content'>
          <Cart :cartData = cartBox />
        </div>
      </template>
    </Modal>

  </div>
</template>

<script>
import Modal from './Modal'
import Cart from './Cart'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Footer',
  components: {
    Modal: Modal,
    Cart: Cart,
  },
  computed: {
    ...mapGetters([
      'cartBox', 
      'getModalWindowVisibility'
    ]),
  },
  methods: {
    ...mapMutations([
      'setModalWindowVisibility',
      'setOrderInfo', 
      'setDeliveryInfo'
    ]),
    openCart() {
      if(this.cartBox.length > 0){
        this.setModalWindowVisibility(true);
        this.setOrderInfo(true);
        this.setDeliveryInfo(false);
      }
    },
    closeModal() {
      this.setModalWindowVisibility(false);
    },
    checkCartCounter:function () {
      if (this.cartBox.length > 0) {
        let cartCounter = 0;
        this.cartBox.forEach(function (value, index) {
          cartCounter = cartCounter + value.quantity
        });
        return cartCounter;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(221, 205, 59);
  color: rgb(117, 60, 27);
  margin-top: 40px;
  padding: 2px 16px;
}
.footer img {
  width: 10vh;
  height: 12vh;
}
.show_cart {
  position: fixed;
  top: -10px;
  right: 10px;
  padding: 16px;
}
.material-icons {
  color: rgb(117, 60, 27);
  font-size: 30px;
  padding: 5px;
  margin-bottom: 6px;
}
.material-icons:hover {
  cursor: pointer;
  color: rgba(117, 60, 27, 0.74);
}
</style>