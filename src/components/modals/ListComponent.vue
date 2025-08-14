<template>
    <div class="modal fade" id="listComponent" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>

                <div class="modal-body">
                    <div v-if="items.length">
                        <table class="table table-bordered table-striped">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>ФИО</th>
                                    <th>Должность</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item?.[primaryField] }}</td>
                                    <td>{{ item?.[secondaryField] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-else class="text-muted">Нет данных</div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListComponent',
    props: {
        title: { type: String, default: 'Детали' },
        items: { type: Array, default: () => [] },
        primaryField: { type: String, default: 'name' },
        secondaryField: { type: String, default: '' },
        // primarySubTitle: { type: String, default: '' },
        // secondarySubTitle: { type: String, default: '' },
    }
}
</script>