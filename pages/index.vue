<template>
  <div class="app">
    <main>
      <SearchInput
        v-model="inputText"
        @search="filterItemsBySearchText"
      ></SearchInput>
      <ul>
        <li
          v-for="item in proceedItems"
          :key="item.id"
          class="item flex"
          @click="routeToDetailPage(item.id)"
        >
          <img class="product-image" :src="item.imageUrl" alt="" />
          <p>{{ item.name }}</p>
          <span>{{ item.price }}</span>
        </li>
      </ul>
      <div class="cart-wrapper">
        <button class="btn" @click="routeToCartPage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
// import axios from 'axios'
import SearchInput from '@/components/SearchInput.vue'
import { fetchProducts, fetchProductsByKeyword } from '@/api/index'
// import { debounce } from 'lodash'

export default {
  components: { SearchInput },

  async asyncData() {
    try {
      const { data } = await fetchProducts()
      const items = data
      return { items }
    } catch (error) {
      error({
        statusCode: 503,
        message: 'API 요청이 실패했습니다 다시 시도해 주세요',
      })
    }
  },

  data() {
    return {
      inputText: '',
    }
  },

  computed: {
    proceedItems() {
      return this.items.map((item) => ({
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`,
      }))
    },
  },

  methods: {
    async filterItemsBySearchText() {
      const { data } = await fetchProductsByKeyword(this.inputText)
      this.items = data
    },
    routeToDetailPage(id) {
      this.$router.push(`/product/${id}`)
    },
    routeToCartPage() {
      this.$router.push('/cart')
    },
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
