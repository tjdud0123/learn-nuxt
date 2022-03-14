<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { createCartItem, fetchProductById } from '~/api'

export default {
  async asyncData({ params }) {
    const response = await fetchProductById(params.id)
    return { product: response.data }
  },

  head() {
    return {
      title: `상품 상세 페이지 - ${this.product.name}`,
      meta: [
        {
          hid: 'og:title', // og:을 붙여준다
          property: 'og:title',
          content: `상품 상세 페이지 - ${this.product.name}`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `이 페이지는 ${this.product.name} 상품입니다`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.product.imageUrl,
        },
      ],
    }
  },

  methods: {
    ...mapMutations(['addItemToCart']),
    async addToCart() {
      await createCartItem(this.product)
      // this.$store.commit('addItemToCart', this.product)
      this.addItemToCart(this.product)
      this.$router.push('/cart')
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
