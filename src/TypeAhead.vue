<template>
<div class="container">
  <div class="type-ahead">
    
    <input type="text" @input="onChange" placeholder="github username">

    <div v-if="repos !== null" class="repos">
        <div class="error" v-if="repos.length === 0">
          <p>there is no repo to display!</p>
        </div>

        <div class="repo" v-for="repo in repos" :key="repo.id">
            <router-link :to="repo.full_name">{{repo.name}}</router-link>
        </div>
    </div>

    <div v-if="error" class="error">
      page not found
    </div>

  </div>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'TypeAhead',

  data: function () {
    return {
      requestedAt: null,
      requesting: false,
      repos: null,
      error: false
    }
  },

  methods: {
    onChange: _.debounce(function onChange(event) {
      this.requesting = true
      this.error = false

      fetch(`https://api.github.com/users/${event.target.value}/repos`)
      .then(data => data.json())
      .then(data => {
        if(Array.isArray(data)) {
          this.repos = data
        } else {
          this.error = true
        }

        this.requesting = false
      })
      .catch(error => {
        this.requesting = false
        this.error = true
      })
    }, 1000)
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
  }

  .type-ahead {
    flex: 1;
    max-width: 400px;
  }

  .type-ahead input {
    width:100%;
    height: 40px;
    padding: 10px;
    box-sizing: border-box;
  }

  .repos {
    width:100%;
  }

  .repo {
    box-sizing: border-box;
    margin: 5px 0;
    height: 40px;
    width: 100%;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    padding: 8px
  }
  
  .error {
    box-sizing: border-box;
    margin: 5px 0;
    height: 40px;
    width: 100%;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    padding: 8px;
    color: red;
  }

  a {
    text-decoration: none;
  }
</style>
