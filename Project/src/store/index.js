import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: "Sort by price",
    cart: [],
    showDeliveryInfo: false,
    showOrderInfo: false,
    showModalWindow: false
  },
  getters: {
    getFilterName(state){
      return state.name;
    },
    cartBox(state) {
      return state.cart;
    },
    getDeliveryInfo (state) {
      return state.showDeliveryInfo;
    },
    getOrderInfo (state) {
      return state.showOrderInfo;
    },
    getModalWindowVisibility(state){
      return state.showModalWindow;
    }
  },
  mutations: {
    setFilterName(state, value){
      state.name = value;
    },
    setModalWindowVisibility(state, value){
      state.showModalWindow = value;
    },
    setUser (state, value) {
      Object.assign(state.user, value)
    },
    setDeliveryInfo (state, value) {
      state.showDeliveryInfo = value
    },
    setOrderInfo(state, value) {
      state.showOrderInfo = value
    },
    setCart(state, product){
      if(state.cart.length){
        let isProductExists = false;
        state.cart.map(function (item){
          if(item.article === product.article){
            isProductExists = true;
            item.quantity++;
          }
        })
        if(!isProductExists) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product)
      }
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    incrementItem: (state, index) => {
      state.cart[index].quantity++;
    },
    decrementItem: (state, index) => {
      if(state.cart[index].quantity > 1){
        state.cart[index].quantity--;
      } else {
        state.cart.splice(index, 1);
      } 
    }
  },
  actions: {
    addToCartBox({commit}, item) {
      commit('setCart', item)
    },
    deleteFromCartBox({commit}, index) {
      commit('removeFromCart', index)
    },
    incrementCartItem({commit}, index) {
      commit('incrementItem', index);
    },
    decrementCartItem({commit}, index) {
      commit('decrementItem', index);
    }
  }
})