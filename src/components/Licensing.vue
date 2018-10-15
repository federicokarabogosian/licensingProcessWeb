<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Licensing Process</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Track</th>
              <th>Song</th>
              <th>Status</th>
              <th>Contract</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="licensing in licensings" :key="licensing.id">
              <td>{{ licensing.id }}</td>
              <td>{{ licensing.track.name }}</td>
              <td>{{ licensing.song.name }}</td>
              <td>{{ licensing.status }}</td>
              <td>{{ licensing.contract }}</td>
              <td>{{ licensing.createdAt }}</td>
              <td>{{ licensing.updatedAt }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Licensing ID#' + model.id : 'Start Licensing Process')">
          <form @submit.prevent="saveLicensing">
            <b-form-group label="Track">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Song">
              <b-form-input type="text" v-model="model.startTime"></b-form-input>
            </b-form-group>
            <b-form-group label="End time">
              <b-form-input type="number" v-model="model.endTime"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Start New Licensing Process</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      licensings: [],
      model: {}
    }
  },
  async created () {
    this.refreshLicensing()
  },
  methods: {
    async refreshLicensing () {
      this.loading = true
      this.licensings = await api.getLicensings()
      this.loading = false
    },
    async populateLicensingToEdit (licensing) {
      this.model = Object.assign({}, licensing)
    },
    async saveLicensing () {
      if (this.model.id) {
        await api.updateLicensing(this.model.id, this.model)
      } else {
        await api.createLicensing(this.model)
      }
      this.model = {} // reset form
      await this.refreshLicensings()
    }
  }
}
</script>
