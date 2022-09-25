<template>
    <div>
        <span>You are about to delete</span> the toll <span class="t-font-boldest"><b>{{tollName}}</b></span>
        <div>
            <input v-model="model.deleteTollName" class="textBox" type="text" name="tollName" :placeholder="'Type ' + tollName + ' to DELETE'">
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {}
    },
    created() {
        this.model.tollIndex = this.tollIndex;
    },
    props: ['flags', 'tollName', 'model', 'tollIndex'],
    watch: {
        'model.deleteTollName': function(val) {
            this.model.tollIndex = this.tollIndex;
            this.flags.invalid = (val != this.tollName);
        }
    },
}
</script>