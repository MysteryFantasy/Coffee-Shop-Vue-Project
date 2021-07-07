<template>
  <div class="logIn">
    <Notification 
      :messages="messages"
      :timeout="4000"
    />

    <div class="greeting">
      <h3> Welcome to my demo project! </h3>
      To visit the main page you have to Log In by using the following data: login: adminka, password: 1234.
      Or you can create your own account by clicking on "Sign Up" button and filling in the registration form.
    </div>

    <div class="logIn_content">
      <div class="logIn_info">
        <h3>Login to your account</h3>
        <input type='text' name='login' placeholder="Input your login" v-model="obj.login">
        <input type='password' name='password' placeholder="Input your password" v-model="obj.password">  
        <button class='logIn_button' @click='receiveData'>Log In</button>
      </div>

      <div class='logIn_footer'>
        <Modal v-if="getModalWindowVisibility" @close="closeModal">
          <template v-slot:content>
            <SignIn />
          </template>
        </Modal>
        <button @click='signUp' :class="{'sign_up': !highlightSignUpButton,'sign_up_color': highlightSignUpButton}">Sign Up</button>
      </div>
    </div>

  </div>
</template>

<script>
import Modal from '../components/Modal'
import SignIn from '../components/SignIn'
import Notification from '../components/Notification'
import sendAjax from '../database/Database'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'LogIn',
  components: {
    Modal: Modal,
    SignIn: SignIn,
    Notification: Notification,
    sendAjax: sendAjax,
  },
  data() {
    return {
      obj: {
        login: '',
        password: '',
      },
      highlightSignUpButton: false,
      showModalWindow: false,
      messages: [],
    }
  },
  computed: {
    ...mapGetters([
      'getModalWindowVisibility'
    ]),
  },
  methods: {
    ...mapMutations([
      'setModalWindowVisibility'
    ]),
    receiveData(){
      if ((this.obj.login && this.obj.password !== '') && isNaN(this.obj.login)) {
        this.sendUserData();
      } else {
		  	let timeStamp = Date.now().toLocaleString();
        this.messages.unshift(
          {name: 'Please, fill in all fields!', icon: 'info' ,id: timeStamp}
        )
		  }   
    },
    sendUserData(){
      sendAjax('post', 'http://localhost:3000/', JSON.stringify(this.obj))
      .then((resolve) => {
        this.$router.push('/main');
      },
      (reject) => {
        this.highlightSignUpButton = true;
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift(
          {name: 'Click "Sign Up" to create a new account', icon: 'warning' ,id: timeStamp}
        )
      });
    },
    signUp(){
      this.setModalWindowVisibility(true);
      this.highlightSignUpButton = false;
    },
    closeModal() {
      this.setModalWindowVisibility(false);
    }
  }
}
</script>

<style scoped lang="scss">
* {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.logIn {
  padding-top: 150px;
  background: url(../assets/images/coffee.png) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
  height: 100vh;
}
.logIn_content {
  background: rgba(172, 172, 168, 0.801);
  box-shadow: 1px 1px 30px rgb(65, 63, 60);
  width: 400px;
  height: 350px;
  border-radius: 10px;
}
.logIn_button {
  cursor: pointer;
  width: 45%;
  color: rgb(109, 109, 109);
  background: rgba(248, 245, 245, 0.637);
  border: 2px solid rgb(212, 212, 212);
  border-radius: 30px;
  margin-top: 30px;
  margin-right: 145px;
}
.logIn_button:hover {
  box-shadow: 0 0 4px 0 #252020;
  color: rgba(27, 27, 27, 0.993);
}
.sign_up {
  cursor: pointer;
  width: 50%;
  color: rgb(109, 109, 109);
  background: rgba(248, 245, 245, 0.637);
  border: 2px solid rgb(212, 212, 212);
  border-radius: 30px;
  margin-top: -22px;
  margin-left: 125px;
}
.sign_up:hover {
  box-shadow: 0 0 4px 0 #252020;
  color: rgba(27, 27, 27, 0.993);
}
.sign_up_color {
  cursor: pointer;
  width: 50%;
  color: rgba(0, 0, 0, 0.993);
  background: rgba(253, 253, 253, 0.973);
  border: 2px solid rgb(236, 230, 230);
  border-radius: 30px;
  box-shadow: 0 0 4px 3px rgb(230, 222, 219);
  margin-top: -22px;
  margin-left: 125px;
}
.sign_up_color:hover {
  color: rgba(27, 27, 27, 0.993);
  background: rgba(248, 248, 248, 0.904);
  box-shadow: 0 0 4px 0 #252020;
}
input {
  font-size: 15px;
  width: 100%;
  height: 100%;
  background: rgba(3,3,3,.1);
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}
input:focus {
  background: rgba(3,3,3,.18);
  box-shadow: 3px 3px 10px #333;
  outline: none;
}
.greeting {
  margin-top: -200px;
  padding: 40px;
  width: 100%;
}
</style>