<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Licensing Process</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <!--<th>ID</th>-->
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
              <!--<td>{{ licensing._id }}</td>-->
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
              <select v-model="model.trackId" :required="true">
                <option :selected="true">Choose a track</option>
                <option v-for="option in trackOptions" v-bind:value="option._id">
                  {{ option.name }}
                </option>
              </select>
            </b-form-group>
            <b-form-group label="Song">
              <select v-model="model.songId" :required="true">
                <option :selected="true">Choose a song</option>
                <option v-for="option in songOptions" v-bind:value="option._id">
                  {{ option.name }}
                </option>
              </select>
            </b-form-group>
            <b-form-group label="Status">
              <b-form-input type="text" v-model="model.status" value="INITIAL"></b-form-input>
            </b-form-group>
            <b-form-group label="Contract">
             <b-form-input type="text" v-model="model.contract"></b-form-input>
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
      model: {},
      trackOptions: [],
      songOptions: []
    }
  },
  async created () {
    this.refreshLicensing()
    this.trackOptions = await api.getTracks()
    this.songOptions = await api.getSongs()
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
