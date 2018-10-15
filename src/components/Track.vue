<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Track</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Movie</th>
              <th>Name</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="track in tracks" :key="track.id">
              <td>{{ track.id }}</td>
              <td>{{ track.movie.name }}</td>
              <td>{{ track.name }}</td>
              <td>{{ track.startTime }}</td>
              <td>{{ track.endTime }}</td>
              <td>{{ track.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateTrackToEdit(track)">Edit</a> -
                <a href="#" @click.prevent="deleteTrack(track.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Track ID#' + model.id : 'New Track')">
          <form @submit.prevent="saveTrack">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Start time">
              <b-form-input type="number" v-model="model.startTime"></b-form-input>
            </b-form-group>
            <b-form-group label="End time">
              <b-form-input type="number" v-model="model.endTime"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Track</b-btn>
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
      tracks: [],
      model: {}
    }
  },
  async created () {
    this.refreshTracks()
  },
  methods: {
    async refreshTracks () {
      this.loading = true
      this.tracks = await api.getTracks()
      this.loading = false
    },
    async populateTrackToEdit (track) {
      this.model = Object.assign({}, track)
    },
    async saveTrack () {
      if (this.model.id) {
        await api.updateTrack(this.model.id, this.model)
      } else {
        await api.createTrack(this.model)
      }
      this.model = {} // reset form
      await this.refreshTracks()
    },
    async deleteTrack (id) {
      if (confirm('Are you sure you want to delete this track?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteTrack(id)
        await this.refreshTracks()
      }
    }
  }
}
</script>
