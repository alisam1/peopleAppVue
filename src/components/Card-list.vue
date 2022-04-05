<template>
  <div class="wrapper">
    <form class="new_people">
      <input v-model="newPeople.first_name" placeholder="Ваше имя">
      <input v-model="newPeople.last_name" placeholder="Ваша фамилия">
      <input v-model="newPeople.email" placeholder="Ваш e-mail">
      <input v-model="newPeople.avatar" placeholder="Ваше фото">
      <button @click="addPeople">Добавить</button>
    </form>
    <div class="people">
      <div
        v-for="item in paginatedCards"
        :key="item.id"
        class="people__content">
        <router-link :to="{ name: 'card', params: { id: item.id } }">
            <button class="people__button" @click="deletePeople(item)">X</button>
            <div class="people__avatar">
                <img v-bind:src="item.avatar" alt="" />
            </div>
            <p class="people__desc">
                <span>{{item.first_name}}</span>
                <span> {{item.last_name}}</span>
            </p>
            <p class="people__email">
                <a href="#" rel="bookmark">{{item.email}}</a>
            </p>
        </router-link>
      </div>
    </div>
   <Pagination @pageClick="pageClick" />
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
import Pagination from './Pagination.vue';
export default {
  components: { Pagination },
  name: 'Card',
  data() {
    return {
      newPeople: {},
      cardsPerPage: 4,
      pageNumber: 1
    }
  },
  computed: {
    ...mapGetters([
      'ITEMS'
    ]),
    paginatedCards(){
      let from = (this.pageNumber - 1) * this.cardsPerPage;
      let to = from + this.cardsPerPage;
      return this.ITEMS.slice(from,to)
    },
  },
  methods: {
      ...mapActions([
        'GET_ITEMS_FROM_API',
        'DELETE_PEOPLE',
        'ADD_PEOPLE'
      ]),
      addPeople(event) {
        event.preventDefault();
        this.ADD_PEOPLE(this.newPeople)
        this.newPeople = {};
    },
      deletePeople(event, index) {
        event.preventDefault();
        this.DELETE_PEOPLE(index)
    },
    pageClick(page){
          this.pageNumber = page
      },

  },
  mounted(){
    this.GET_ITEMS_FROM_API()
  }

}
</script>

<style lang="scss">

.wrapper {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.site-main{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 50px;
}

.new_people {
  width: 30%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #142bfc;
  border-radius: 5px;
  padding-top: 25px;
  padding-bottom: 25px;
  input {
      margin-bottom: 15px;
      color: #000;
      outline: none;
      padding-left: 5px;
    }

    button {
      padding: 5px 10px;
      border-radius: 3px;
      text-align: center;
      text-transform: uppercase;
      border: none;
      background-color: #142bfc;
      color: #fff;
    }
  }

.people {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  margin-bottom: 40px;

  &__content {
    flex-basis: 23%;
    border: 1px solid #eeee;
    border-radius: 4px;
    box-sizing: border-box;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    text-decoration: none;

    a {
      text-decoration: none;
      color: #333;
    }

    &:nth-child(4) {
      margin-right: 0;
    }
  }

  &__desc {
    margin-bottom: 0;
    text-align: center;
    color: #142bfc;
    font-weight: 700;
  }

  &__email {
    text-align: center;
  }

  &__button {
    position: absolute;
    right: -10px;
    top: -10px;
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid #777;
    color: #777;
    font-weight: bold;
    cursor: pointer;
  }

  &__avatar {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  img {
    width: 128px;
    height: 128px;
    object-fit: cover;
    object-position: center;
  }
}
</style>
