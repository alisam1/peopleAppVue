<template>
    <div class="pagination">
        <div class="pagination__page"
          v-for="page in pages"
          :key="page"
          @click="pageClick(page)">
            <button>{{page}}</button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Pagination',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'ITEMS'
    ]),
    pages(){
        return Math.ceil(this.ITEMS.length / 4)
    },
  },
  methods: {
      ...mapActions([
        'GET_ITEMS_FROM_API',
      ]),
      pageClick(page){
          this.$emit('pageClick', this.pageNumber = page)
      },
  },
  mounted(){
    this.GET_ITEMS_FROM_API()
  }

}
</script>

<style lang="scss">

/* Pagintaion */
.pagination{
    display: flex;
    flex-direction: row;
    justify-content: center;
    &__page{
        margin-right: 20px;
        button{
            width: 40px;
            height: 40px;
            border: none;
            background: #142bfc;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            border: 1px solid transparent;
            &:hover{
                background: inherit;
                border: 1px solid #142bfc;
                color: #142bfc;
            }
            &:active{
                background: inherit;
                border: 1px solid #142bfc;
                color: #142bfc;
            }
        }
    }
}
</style>
