<template>
    <div class="modal fade" id="deleteComponent" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Удаление записи</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы уверены, что хотите удалить эту запись?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" @click="$emit('confirm')"
                        data-bs-dismiss="modal">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteComponent',
    emits: ['confirm'],
}
</script>