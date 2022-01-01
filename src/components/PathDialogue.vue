<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Set Game Path
        </v-card-title>

        <v-card-text class="pt-3">
            Your Muse Dash path is not set. Please set it here:
            <v-text-field
                label="Game Path"
                placeholder="C:\Program Files\Steam\steamapps\common\Muse Dash\"
                class="mt-3"
                outlined
            ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    name: 'PathDialogue',
    data () {
      return {
        dialog: false,
      }
    },
    async mounted() {
    }
  })
</script>