Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
  
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">

        <h1>{{ title }}</h1>
        <!-- <p>{{ description }}</p> -->
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>{{ sale }}</p>
        <p>User is premium: {{ premium }}</p>
        <a :href="link" target="_blank">More products like this</a>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div class="sizes" style="display: flex;">
          <p class="size" v-for="size in sizes">{{ size }}</p>
        </div>

        <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
        >
        </div>

        <div class="btn-cart">
          <button
            @click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
   `,
    data () {
      return {
        product:'Socks',
        brand: 'Vue Mastery',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        onSale: true,
        details: [ '80% cotton', '20% polyester', 'Gender-neutral' ],
        variants: [
            {
                variantId: '2234',
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: '2235',
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
      },
      // updateCart() {
      //   this.cart += 1
      // },
      removeFromCart() {
          this.$emit('remove-from-cart')
      },
      // removeCart() {
      //   this.cart -= 1
      // },
      updateProduct(index) {
        this.selectedVariant = index
        }
    },
    computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image() {
          return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
          return this.variants[this.selectedVariant].variantQuantity
      },
      sale() {
        if (this.onSale) {
          return this.brand + ' ' + this.product + ' are on sale!'
        } 
          return  this.brand + ' ' + this.product + ' are not on sale'
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
          return 2.99
      }
    }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeCart() {
      this.cart -= 1
    }
  }
})
