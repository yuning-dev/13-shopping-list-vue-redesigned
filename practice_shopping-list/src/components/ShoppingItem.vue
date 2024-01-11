<template>
    <div :class="$style.wrapper">
        <div :class="$style.contentWrapper">
            <template v-if="!isInEditMode">
                <template v-if="!item.completion">
                    <font-awesome-icon icon="fa-regular fa-square" @click="squareIconClicked" />
                </template>
                <template v-else>
                    <font-awesome-icon icon="fa-solid fa-square-check" @click="squareCheckedIconClicked" />
                </template>
                {{ item.content }}
            </template>
            <template v-if="isInEditMode">
                <input type="text" v-model="editedContent" @keyup.enter="editCompleteIconClicked"/>
                <img src="./icons/edit-complete-icon.png" width="20" :class="$style.editCompleteIcon" @click="editCompleteIconClicked">
            </template>
        </div>
        <div :class="$style.buttonsWrapper">
            <button :class="$style.editBtn" @click="editBtnClicked">Edit</button>
            <button :class="$style.deleteBtn" @click="deleteBtnClicked">Delete</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ShoppingItem',
    props: {
        item: Object,
    },
    data() {
        return {
            isInEditMode: false,
            editedContent: this.item.content,
        }
    },
    methods: {
        squareIconClicked() {
            this.$emit('itemChecked', this.item.id)
        },
        squareCheckedIconClicked() {
            this.$emit('itemUnchecked', this.item.id)
        },
        editBtnClicked() {
            this.isInEditMode = true
        },
        editCompleteIconClicked() {
            this.isInEditMode = false
            this.item.content = this.editedContent
        },
        deleteBtnClicked() {
            this.$emit('deleteItem', this.item.id)
        },
    }
}
</script>

<style module src="./ShoppingItem.css"></style>