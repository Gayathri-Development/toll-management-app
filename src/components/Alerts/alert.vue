<template>
    <div class="alert" :class="alertType">
        <i v-if="isDismissable" @click="close" class="fa fa-close"></i>
        <!-- 
            Availble alertType types -> info, danger & success
        -->
        <strong class="alertTitle">{{alertType}}!</strong> {{message}}
    </div>
</template>

<script>

export default {
  name: 'Alert',
  props: ["alertType", "isDismissable", "message"],
  data() {
        return {
            // alertType: 'info',
            // isDismissable: false,
        }
    },
    methods: {
        close() {
            console.log("Inside alert close option");
        }
    }
}
</script>
<style lang="scss" scoped>
strong.alertTitle {
    display: inline-block;
}
strong.alertTitle:first-letter {
    text-transform: uppercase;
}
.alert {
    color: white;
    font-size: 18px;
}
.alert.danger {
    padding: 13px;
    background-color: #E34234;
}
.alert.info {
    padding: 13px;
    background-color: #0096FF;
}
.alert.success {
    padding: 13px;
    background-color: green;
}
i {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

</style>