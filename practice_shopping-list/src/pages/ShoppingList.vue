
import ShoppingItemVue from '@/components/ShoppingItem.vue';
<template>
    <template v-if="hasModal">
        <ModalWindow @closeModal="hasModal=false">
            <template v-slot>
                Are you sure you want to delete all items?
                <div :class="$style.modalBtnsWrapper">
                    <button :class="$style.yesBtn" @click="deleteAllItems">Yes</button>
                    <button :class="$style.cancelBtn" @click="hasModal=false">Cancel</button>
                </div>
            </template>

        </ModalWindow>
    </template>
    <div :class="$style.wrapper">
        <div :class="$style.title">Shopping List</div>
        <div :class="$style.addItemWrapper">
            <input type="text" placeholder="Add shopping item here..." :class="$style.addItemInput" v-model="newItemContent" @keyup.enter="createNewShoppingItem" />
            <button :class="$style.addItemButton" @click="createNewShoppingItem" >Add item</button>
        </div>
        <div :class="$style.itemsWrapper">
            Current shopping items:
            <template v-for="item in shoppingList">
                <ShoppingItem :item="item" @itemChecked="updateToCompleted" @itemUnchecked="updateToIncomplete" @deleteItem="deleteItem"/>
            </template>
        </div>
        <div :class="$style.bottomBtnsWrapper">
            <button :class="$style.deleteAllBtn" @click="hasModal=true">Delete all items</button>
        </div>
    </div>
</template>


<script>
import ShoppingItem from '../components/ShoppingItem.vue'
import ModalWindow from '../components/ModalWindow.vue'

export default {
    name: 'ShoppingList',
    components: {
        ShoppingItem,
        ModalWindow,
    },
    data() {
        return {
            newItemContent: '',
            newItemId: 1,
            shoppingList: [],
            hasModal: false,
        }
    },
    methods: {
        createNewShoppingItem() {
            const item = {
                content: this.newItemContent,
                completion: false,
                id: this.newItemId,
            }
            this.shoppingList.push(item)

            this.newItemId++
            this.newItemContent=''
        },
        updateToCompleted(id) {
            const itemToBeUpdated = this.shoppingList.find((item) => item.id === id)
            itemToBeUpdated.completion = true
        },
        updateToIncomplete(id) {
            const itemToBeUpdated = this.shoppingList.find((item) => item.id === id)
            itemToBeUpdated.completion = false
        },
        deleteItem(id) {
            const listWithoutItemToBeDeleted = this.shoppingList.filter((item) => item.id !== id)
            this.shoppingList = listWithoutItemToBeDeleted
        },
        deleteAllItems() {
            this.shoppingList = []
            this.hasModal = false
        },

    },
}

</script>

<style module src="./ShoppingList.css"></style>