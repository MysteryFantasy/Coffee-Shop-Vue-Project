<template>
  <div class="main_page">
    <Notification 
      :messages="messages"
      :timeout="4000"
    />

    <header>
      <h2>Welcome to the best coffee house!</h2> 
    </header>

    <div class="filter">
      <h4><span @click="filter" class="filter_btn">{{getFilterName}}</span></h4>
    </div>

    <div class="main_content">
      <div class="products" v-for="item in productsList" 
        :key="item.article">
        <img class="product_image" :src="require('../assets/images/' + item.image)" alt="img">
        <div>
          <p class="product_title">{{item.title}} </p>
          <p class="product_cost">Price: {{item.cost}} ₴</p>
        </div>
        <p><button class="addProduct_btn" @click="addToCart(item)">Add to cart</button></p>
      </div>
    </div>

    <Footer />
  
  </div>
</template>

<script>
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import sendAjax from '../database/Database'
import Notification from '../components/Notification'
import {mapMutations, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {
    sendAjax: sendAjax,
    Cart: Cart,
    Footer: Footer,
    Notification: Notification
  },
  data () {
    return {
      productsList: [],
      showModalWindow: false,
      messages: [],
    }
  },
  created(){
    sendAjax('post', 'http://localhost:3000/products', JSON.stringify(this.productsData))
    .then((resolve) => {
      this.productsList = resolve;
    },
    (reject) => {
      alert('Something went wrong! :(');
    })    
  },
  computed: {
    ...mapGetters([
      'getFilterName', 
    ]),
  },
  methods: {
    ...mapMutations([
      'setFilterName',
    ]),
    ...mapActions([
      'addToCartBox'
    ]),
    orderedToMaxCost: function() {
      this.setFilterName('Price: low to high');
      return this.productsList.sort(function(a,b) {
        return (a.cost - b.cost);
      })
    },
    orderedToMinCost: function() {
      this.setFilterName('Price: high to low');
      return this.productsList.sort(function(a,b) {
        return (b.cost - a.cost);
      })
    },
    filter: function() {
      if (this.getFilterName == 'Price: low to high'){
        this.orderedToMinCost();
      } else {
        this.orderedToMaxCost();
      }
    },
    addToCart: function(item) {
      if(item.quantity){
        item.quantity++;
      } else {
        this.addToCartBox(item);
        this.$set(item, 'quantity', 1);
      }
      let timeStamp = Date.now().toLocaleString();
      this.messages.unshift(
        {name: 'Item has been added to cart', icon: 'check_circle' ,id: timeStamp}
      )
    }
  }

}
</script>

<style lang="scss">
.main_page .main_content {
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
.products {
  flex-basis: 30%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 8px;
  margin-bottom: 16px;
}
.products:hover {
  box-shadow: 0 0 12px 0 #999898;
}
.addProduct_btn {
  cursor: pointer;
  background: rgb(6, 128, 26);
  color: white;
  border-radius: 5px;
  margin: 15px;
  padding: 4px 12px;
}
.addProduct_btn:hover {
  box-shadow: 0 0 5px 0 #062003;
}
.filter_btn {
  cursor: pointer;
  background: rgb(117, 60, 27);
  color: white;
  border-radius: 5px;
  margin: 15px;
  padding: 5px 12px;
}
.filter_btn:hover {
  box-shadow: 0 0 5px 0 #2e1306;
  color: rgb(43, 15, 3);
}
.product_image{
  width: 180px;
  height: 150px;
}
</style>