<template>
    <div class="delete--wrapper">
        <h4>Delete This Item ?</h4>
        <div class="actions">
            <button class="btn" @click.stop="handleCancel">Cancel</button>
            <button class="btn deleteBtn" @click.stop="handleDelete">Ok</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['close:modal', 'action:delete'],
    setup (props, { emit}) {
        const handleCancel = () => emit('close:modal');
        const handleDelete = () => {
            emit('action:delete')
        }

        return {handleCancel, handleDelete}
    }
})
</script>

<style scoped>
.delete--wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.actions {
    margin-top: 40px;
    display: flex;
    gap: 5px;
}

.btn {
  width: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
}

</style>