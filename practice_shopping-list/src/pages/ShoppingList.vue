<template>
    <template v-if="hasDeleteAllModal">
        <ModalWindow @closeModal="hasDeleteAllModal=false">
            <template v-slot>
                Are you sure you want to delete all items?
                <div :class="$style.modalBtnsWrapper">
                    <button :class="$style.yesBtn" @click="deleteAllItems">Yes</button>
                    <button :class="$style.cancelBtn" @click="hasDeleteAllModal=false">Cancel</button>
                </div>
            </template>
        </ModalWindow>
    </template>
    <template v-if="hasMarkAsCompletedModal">
        <ModalWindow @closeModal="hasMarkAsCompletedModal=false">
            <template v-slot>
                Are you sure you want to mark all items as completed?
                <div :class="$style.modalBtnsWrapper">
                    <button :class="$style.yesBtn" @click="markAllAsCompleted">Yes</button>
                    <button :class="$style.cancelBtn" @click="hasMarkAsCompletedModal=false">Cancel</button>
                </div>
            </template>
        </ModalWindow>
    </template>
    <template v-if="hasMarkAsIncompleteModal">
        <ModalWindow @closeModal="hasMarkAsIncompleteModal=false">
            <template v-slot>
                Are you sure you want to mark all items as incomplete?
                <div :class="$style.modalBtnsWrapper">
                    <button :class="$style.yesBtn" @click="markAllAsIncomplete">Yes</button>
                    <button :class="$style.cancelBtn" @click="hasMarkAsIncompleteModal=false">Cancel</button>
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
            <button :class="$style.deleteAllBtn" @click="deleteAllBtnClicked">Delete all items</button>
            <div :class="$style.bottomLeftBtnsWrapper">
                <button :class="$style.markAllBtns" @click="markAllAsCompletedBtnClicked">Mark all as completed</button>
                <button :class="$style.markAllBtns" @click="markAllAsIncompleteBtnClicked">Mark all as incomplete</button>
            </div>            
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
            hasDeleteAllModal: false,
            hasMarkAsCompletedModal: false,
            hasMarkAsIncompleteModal: false,
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
        deleteAllBtnClicked() {
            if (this.shoppingList.length === 0) {
                return
            } else {
                this.hasDeleteAllModal = true
            }
        },
        deleteAllItems() {
            this.shoppingList = []
            this.hasDeleteAllModal = false
        },
        markAllAsCompletedBtnClicked() {
            let counter = 0
            for (let i = 0; i < this.shoppingList.length; i++) {
                if (this.shoppingList[i].completion === true) {
                    counter++
                }
            }
            if (counter === this.shoppingList.length) {
                this.hasMarkAsCompletedModal = false
            } else {
                this.hasMarkAsCompletedModal = true
            }
        },
        markAllAsCompleted() {
            for (let i = 0; i < this.shoppingList.length; i++) {
                this.shoppingList[i].completion = true
            }
            this.hasMarkAsCompletedModal = false
        },
        markAllAsIncompleteBtnClicked() {
            let counter = 0
            for (let i = 0; i < this.shoppingList.length; i++) {
                if (this.shoppingList[i].completion === true) {
                    counter++
                }
            }
            if (counter === 0) {
                this.hasMarkAsCompletedModal = false
            } else {
                this.hasMarkAsIncompleteModal = true
            }
        },
        markAllAsIncomplete() {
            for (let i = 0; i < this.shoppingList.length; i++) {
                this.shoppingList[i].completion = false
            }
            this.hasMarkAsIncompleteModal = false
        }
    },
}

</script>

<style module src="./ShoppingList.css"></style>