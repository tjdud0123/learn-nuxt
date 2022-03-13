import { fetchCartItems } from '~/api'

export const Types = {
  getters: {
    PROCEED_CARTS: 'proceedCarts',
  },
  mutations: {
    ADD_ITEM_TO_CART: 'addItemToCart',
    SET_CARTS: 'setCarts',
  },
  actions: {
    FETCH_CARTS: 'fetchCarts',
  },
}

export const state = () => ({
  carts: [],
})

export const getters = {
  [Types.getters.PROCEED_CARTS](state) {
    return state.carts.map((item) => ({
      ...item,
      imageUrl: `${item.imageUrl}?random=${Math.random()}`,
    }))
  },
}

export const mutations = {
  [Types.mutations.ADD_ITEM_TO_CART](state, item = {}) {
    state.carts = [...state.carts, item]
  },
  [Types.mutations.SET_CARTS](state, carts) {
    state.carts = [...carts] || []
  },
}

export const actions = {
  async nuxtServerInit(storeContext, nuxtContext) {
    const { data } = await fetchCartItems()
    storeContext.commit(Types.mutations.SET_CARTS, data)
  },

  async [Types.actions.FETCH_CARTS](context) {
    const { data } = await fetchCartItems()
    const items = data
    context.commit(Types.mutations.SET_CARTS, items)
  },
}
