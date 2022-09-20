<template>
    <div>
        <span>You are about to delete</span> the toll <span class="t-font-boldest"><b>{{tollName}}</b></span>
        <div>
            <input v-model="deleteTollName" class="textBox" type="text" name="tollName" :placeholder="'Type ' + tollName + ' to DELETE'">
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            deleteTollName: ''
        }
    },
    props: ['flags', 'tollName'],
    watch: {
        deleteTollName: function(val) {
            this.flags.invalid = (val != this.tollName);
        }
    },
}
</script>