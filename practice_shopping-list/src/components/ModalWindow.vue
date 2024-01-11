<template>
    <div :class="$style.modal"></div>
    <div :class="$style.modalContent">
        <div :class="$style.topBanner">
            <font-awesome-icon icon="fa-solid fa-square-xmark" :class="$style.closeBtn" @click="closeBtnClicked"/>
        </div>
        <div :class="$style.contentWrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ModalWindow',
    methods: {
        closeBtnClicked() {
            this.$emit('closeModal')
        },
    },
}

</script>

<style module src="./ModalWindow.css"></style>