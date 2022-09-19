<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" :class="modelSize == 'small' ? 'modal-inner-sm' : 'modal-inner'">
          <div class="flex-container">
            <div class="toll-title-header">
              <h2 class="model-header">{{modelTitle}}</h2>
            </div>
            <div class="toll-title-header">
              <i @click="close" class="fa fa-close"></i>
            </div>
          </div>
          <!-- Modal Content -->
          <slot />
          <button @click="btnAction" type="button">{{btnTitle}}</button>
          <!-- <button @click="close" type="button">Cancel</button> -->
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["modalActive", "modelTitle", "btnTitle", "modelSize"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    return { close };
  },
  methods: {
    close() {
      this.$emit('close', !this.modalActive);
    },
    btnAction() {
      // console.log("btn action clicked!");
      // console.log(this);
      // console.log(this.$options.parent.model);
      this.$emit('btnAction', this.$options.parent.model);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  .modal-inner {
    position: relative;
    /* max-width: 640px; */
    max-width: 740px; /* pop-up model size */
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 45px 16px 12px;
    i {
      position: absolute;
      color: gray;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #0096FF;
      }
    }
    h2 {
      font-family: Georgia, serif;;
      /* width: 500px; */
      width: 100%;
      margin: 0 auto;
      position: absolute;
      top: 10px;
      font-weight: normal;
      font-size: 20px;
      text-align: center;
    }
    button {
      width: 100%;
      padding: 10px 30px;
      border: none;
      font-size: 16px;
      background-color: #0096FF;
      color: #fff;
      cursor: pointer;
    }
  }
  .modal-inner-sm {
    position: relative;
    max-width: 450px; 
    /* max-width: 740px; */ /* pop-up model size */
    width: 80%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 45px 16px 12px;
    i {
      position: absolute;
      color: gray;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: #0096FF;
      }
    }
    h2 {
      font-family: Georgia, serif;;
      /* width: 500px; */
      width: 100%;
      margin: 0 auto;
      position: absolute;
      top: 10px;
      font-weight: normal;
      font-size: 20px;
      text-align: center;
    }
    button {
      width: 100%;
      padding: 10px 30px;
      border: none;
      font-size: 16px;
      background-color: #0096FF;
      color: #fff;
      cursor: pointer;
    }
  }
}

/* Add Flexbox css */ 
.flex-container {
  display: flex;
  flex-direction: row;
}

.flex-container > div {
  padding-right: 0px;
}

</style>
