<template>
  <div class="signIn">
    <Notification 
      :messages="messages"
      :timeout="4000"
    />

    <div class='signIn_content'>
      <h3>Registration form</h3>
      <input type='text' name='login' placeholder="Create your login" v-model="obj.login">
      <input type='password' name='password' placeholder="Create your password" v-model="obj.password">
      <button class='register_btn' @click="register">Register</button>
    </div>
    
  </div>
</template>

<script>
import sendAjax from '../database/Database'
import Notification from './Notification'
import {mapMutations} from 'vuex'

export default {
  name: 'SignIn', 
  components: {
    sendAjax: sendAjax,
    Notification: Notification
  },
  data() {
    return {
      obj: {
        login: '',
        password: '',
      },
      messages: [],
    }
  },

  methods: {
    ...mapMutations([
      'setModalWindowVisibility'
    ]),
    register(){
      if ((this.obj.login && this.obj.password !== '') && isNaN(this.obj.login)) {
        this.sendNewUserData();
      } else {
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift(
          {name: 'Please, fill in all fields!', icon: 'info' ,id: timeStamp}
        )
      }
    },
    sendNewUserData(){
      sendAjax('post', 'http://localhost:3000/newUser', JSON.stringify(this.obj))
      .then((resolve) => {
        this.setModalWindowVisibility(false);
        this.$router.push('/main');
      },
      (reject) => {
        let timeStamp = Date.now().toLocaleString();
        this.messages.unshift(
          {name: 'This user already exists', icon: 'error' ,id: timeStamp}
        )
      });
    }
  }
}
</script>

<style scoped lang="scss">
* {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.signIn_content {
  background: rgb(231, 231, 231);
  color: rgb(29, 28, 28);
  width: 350px;
  height: 350px;
  border-radius: 10px;
}
input {
  color: rgb(29, 28, 28);
  font-size: 15px;
  padding: 10px;
  margin-top: 10px;
  background: rgba(146, 143, 143, 0.1);
  border: none;
  border-radius: 10px;
  width: 85%;
}
input:focus {
  box-shadow: 3px 3px 10px #333;
  background: rgba(3,3,3,.18);
  outline: none;
}
.register_btn {
  cursor: pointer;
  margin-top: 30px;
  width: 30%;
  color: rgb(109, 109, 109);
  background: rgba(255, 251, 251, 0.459);
  border: 2px solid rgb(212, 212, 212);
  border-radius: 30px;
}
.register_btn:hover {
  color: rgba(27, 27, 27, 0.993);
  box-shadow: 0 0 4px 0 #252020;
}
</style>