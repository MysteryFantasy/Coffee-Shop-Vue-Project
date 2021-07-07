<template>
    <div class="notification">
        <transition-group name="transition-animation" class="messages_list">
            <div class="notification_content"
                v-for="message in messages"
                :key="message.id"
                :class="message.icon"
            >
                <div class="content_text">
                    <span>{{message.name}}</span>
                    <i class="material-icons">{{message.icon}}</i>
                </div>
                <div class="content_buttons">
                    <button v-if="rightButton.length">{{rightButton}}</button>
                    <button v-if="leftButton.length">{{leftButton}}</button>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "Notification",
    props: {
        messages: {
            type: Array,
            default: () => {
                return []
            }
        },
        rightButton: {
            type: String,
            default: ''
        },
        leftButton: {
            type: String,
            default: ''
        },
        timeout: {
            type: Number,
            default:3000
        }
    },
    methods: {
        hideNotification() {
            let vm = this;
            if (this.messages.length) {
                setTimeout(function(){
                    vm.messages.splice(vm.messages.length -1, 1);
                }, vm.timeout);
            }
        }
    },
    watch: {
        messages() {
            this.hideNotification();
        }
    },
    mounted() {
        this.hideNotification();
    }
}
</script>

<style>
.notification {
    position: fixed;
    display: flex;
    top: 40px;
    right: 16px;
    z-index: 10;
}
.transition-animation-enter {
    transform: translateX(120px);
    opacity: 0;
}
.transition-animation-enter-active {
    transition: all .6s ease;
}
.transition-animation-enter-to {
    opacity: 1;
}
.transition-animation-leave {
    height: 50px;
    opacity: 1;
}
.transition-animation-leave-active {
    transition: transform .6s ease, opacity .6s, height .6s .2s;
}
.transition-animation-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
}
.transition-animation-move {
    transition: transform .6s ease; 
}
.notification_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    height: 50px;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 4px;
}
.notification_content.check_circle {
    background: rgba(0, 128, 0, 0.767);
}
.notification_content.error {
    background: rgba(255, 0, 0, 0.767);
}
.notification_content.warning {
    background: rgba(255, 166, 0, 0.767);
}
.notification_content.info {
    background: rgba(45, 156, 175, 0.767);
}
.content_text {
    display: flex;
    align-items:center;
    justify-content:space-between;
}
.material-icons {
    margin-left: 16px;
}
</style>