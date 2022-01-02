<template>
    <v-dialog v-model="display">
        hi
    </v-dialog>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { API } from '@/modules/api'
    import { Chart } from '@/types/chart';

    import Detail from '@/components/Charts/Detail.vue';


    const api = new API()

    export default Vue.extend({
        name: 'Detail',
        props: ['value'],
        data() {
            return {
                display: this.value as boolean
            }
        },
        watch: {
            display: function (val:boolean) {
                this.$emit('input', val)
            }
        },
        mounted() {
            console.log("details")
        },
    })
</script>