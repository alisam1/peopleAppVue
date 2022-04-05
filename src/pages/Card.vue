<template>
   <div class="card">
    <div class="container">
        <div class="card__img">
            <img v-bind:src="item.avatar" alt="Name" />
        </div>
        <div class="card__info">
           <h1>{{ item.first_name }} {{item.last_name}}</h1> 
           <p>
               <a :href="`mailto:${item.email}`">{{ item.email }}</a>
            </p>
        </div>
    </div>
   </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
data() {
  return {
      item: null
    }
  },
  created() {
    const item = this.ITEMS.find(item => item.id == this.$route.params.id)
    if (item) {
      this.item = item
    }
  },
  computed: {
    ...mapGetters([
      'ITEMS'
    ]),
  },
  methods: {
    ...mapActions([
        'GET_ITEMS_FROM_API',
      ]),
    },
  mounted(){
      this.GET_ITEMS_FROM_API()
    }
  }
</script>

<style lang="scss">

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding-top: 100px;
}

.card {
   &__img {
       margin-right: 40px;
       img {
           width: 200px;
           height: 200px;
           border-radius: 5px;
           border: 2px solid #eee;
       }
    }

    &__info {
        h1 {
            margin: 0;
            padding: 0;
            font-size: 40px;
            line-height: 50px;
        }

        p {
            margin: 20px 0 0 0;
            padding: 0;

            a {
                text-decoration: none;
                font-size: 20px;
                line-height: 30px;
                color: #142bfc;
                margin-top: 20px;
            }
        }
    }
}
</style>
