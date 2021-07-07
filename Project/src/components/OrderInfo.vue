<template>	
	<div class="orderInfo" v-show="openDeliveryInfo()">
		<Notification 
			:messages="messages"
			:timeout="4000"
      	/>
		
		<div>
			<span class="home_button" v-on:click="returnToCart"><i class="material-icons">navigate_before</i>Return to the cart</span>
		</div>

		<div class="header">
			<h3 class="heading">Delivery information</h3>
		</div>
		
		<div class="information">
			<div class="information_block">
				<div class="input_data"><strong>Enter your name</strong></div>
				<input type="text" placeholder="Jane Doe" v-model="userData.name" v-bind:class="{underline_invalidData: invalidData.name}">
			</div>
			<div class="information_block">
				<div class="input_data"><strong>Enter your phone</strong></div>
				<input type="tel" placeholder="+380XXXXXXXXX" maxlength="13" v-model="userData.phone" v-bind:class="{underline_invalidData: invalidData.phone}">
			</div>
			<div class="information_block">
				<div class="input_data"><strong>Enter your email</strong></div>
				<input type="email" placeholder="jane.doe@gmail.com" v-model="userData.email" v-bind:class="{underline_invalidData: invalidData.email}">
			</div>
			<div class="information_block">
				<div class="input_data"><strong>Enter your address</strong></div>
				<input type="text" placeholder="Kyiv" v-model="userData.address" v-bind:class="{underline_invalidData: invalidData.address}">
			</div>
		</div>

		<div>
			<span class="order_button" v-on:click="newOrder">Order goods<i class="material-icons">assignment_turned_in</i></span>
		</div>
	</div>

</template>


<script>
import Notification from './Notification'
import sendAjax from '../database/Database'
import {mapMutations, mapGetters} from 'vuex'

export default {
	name: 'OrderInfo',
	components: {
		Notification: Notification,
		sendAjax: sendAjax,
	},
	data () {
		return {
			userData: {},
			invalidData: {
				name: false,
				phone: false,
				email: false,
				address: false
			},
			orderDetails: [],
			messages: []
		}
	},
	computed: {
		...mapGetters([
			'getDeliveryInfo',
			'cartBox'
		])
	},			
	methods: {
		...mapMutations([
			'setDeliveryInfo',
			'setOrderInfo',
			'setModalWindowVisibility'
		]),
		returnToCart () {
			this.setDeliveryInfo(false);
			this.setOrderInfo(true); 
		},
		openDeliveryInfo () {
			if (this.getDeliveryInfo == false) {
				for (let item in this.invalidData) {
					this.invalidData[item] = false;
				}
			};
			return this.getDeliveryInfo;
		},
		newOrder () {
			this.invalidData.name = !this.userData.name;
			this.invalidData.phone = !this.isPhoneValid();
			this.invalidData.email = !this.isEmailValid();
			this.invalidData.address = !this.userData.address;
			if (this.isEmailValid() && this.isPhoneValid() && this.userData.name && this.userData.address) {
				let orderData = [];
				if(this.cartBox.length){
					for (let item of this.cartBox){
						orderData.push(item.title + ' (article:' + item.article + ') × ' + item.quantity + 'pcs. = ' + item.quantity * item.cost + ' ₴');
					}
				}
				this.userData.order = orderData.toLocaleString();
				this.userData.total = this.cartBox.total + ' ₴';
				this.sendOrderData();
			} else {
				let timeStamp = Date.now().toLocaleString();
				this.messages.unshift(
					{name: 'Please, fill in all fields correctly!', icon: 'error' ,id: timeStamp}
				)
			}
		},
		//validation of the email address according to the valid format
		isEmailValid () {
			let validEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return validEmailFormat.test(this.userData.email);
		},
		//validation of the phone number according to the valid format, which includes "+" and 12 digits 
		isPhoneValid () {
			let validPhoneFormat = /\+\d{12}/;
			return validPhoneFormat.test(this.userData.phone);
		},
		sendOrderData(){
			sendAjax('post', 'http://localhost:3000/order/new', JSON.stringify(this.userData))
			.then((resolve) => {
				alert('Thank you for your order! Our manager will contact you soon! :)');
				this.setDeliveryInfo(false);
				this.setOrderInfo(false); 
				this.cartBox.length = 0;
				this.setModalWindowVisibility(false);
				// window.location.reload(); //to reload the page
			},
			(reject) => {
				alert('Something went wrong! :(');
			});
		}
	}  			
}
</script>

<style scoped>
* {
	display: flex;
}
.orderInfo {
	margin: 10px;
	width: 500px;
	flex-direction: column;
}
.header {
	justify-content: center;
	align-items: center;
	color: rgb(43, 15, 3);
	margin-top: 10px;
}
.information {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: rgb(43, 15, 3);
}
.information_block {
	justify-content: center;
	align-items: center;
	height: 70px;
	margin: 10px;
	box-shadow: 0 0 8px 0 #e0e0e0;
}
.information_block:hover {
	box-shadow: 0 0 8px 0 #999898;
}
.input_data {
	margin-right: 40px;
	width: 160px;
	padding: 15px;
}
input {
	width: 200px;
	font-size: 15px;
	padding-bottom: 5px;
	padding-left: 5px;
	border: 2px solid white;
	padding: 15px;
	outline: none;
}
input::placeholder {
	color: #A9A9A9;
}
input:focus::placeholder {
	text-indent: 500px;
	transition: text-indent 1.5s ease;
	z-index: 0;
}
input:hover {
	border-bottom: 2px solid #708090;
}
input[type=text] {
	text-transform: capitalize; 
}
.underline_invalidData {
	border-bottom: 2px solid red;
}
.home_button {
	align-items: center;
	cursor: pointer;
	background: rgb(221, 205, 59);
	color: white;
	border-radius: 5px;
	padding: 2px 12px;
	margin: 5px;
}
.home_button:hover {
	box-shadow: 0 0 4px 0 #2e1306;
	color:rgb(117, 60, 27);
}
.order_button{
	align-items: center;
	cursor: pointer;
	padding: 4px 12px;
	background: rgb(6, 128, 26);
	color: white;
	border-radius: 5px;
	margin: 15px;
	margin-left: 35%;
}
.order_button:hover {
	box-shadow: 0 0 4px 0 #062003;
	color: rgb(8, 37, 8);
}
.material-icons {
	margin: 5px;
}
</style>		