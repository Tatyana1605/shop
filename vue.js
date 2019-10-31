const ItemComponent = {
  props:['id', 'title', 'img', 'price'],
  template:`<div class="catalog-flex">
            <a href="single-page.html" class="productUnit">
               <div class="unit-img" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
                <div class="unit-text">
                    <p class="productUnitName">{{title}}</p>
                    <div class="procductUnitPrice">$ {{price}}</div>
                    <div class="rating">
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                    </div>
                </div>
            </a>
            <a  class="addtocard1" @click="handelBuyClick(id)"> Add to&nbsp;card </a>
            <a href="#" class="addtocard2"><i class="far fa-heart"></i></a>
            <a href="#" class="addtocard3"><i class="fas fa-retweet"></i></a>
          </div>`,
  methods: {
    handelBuyClick(id) {
      this.$emit('buy', id);
    }
  },
  
};


const ItemsListComponent = {
  props: ['items'],
  template: `<div class="product-catalog">
            <item-component 
              v-if="items.length"
              v-for="item in items"
              :key="item.id" 
              :id="item.id" 
              :title="item.title" 
              :img="item.img" 
              :price="item.price"
              @buy="handelBuyClick(item)"
              
            ></item-component>
            </div>
            <div v-if="!items.length" >Товар не найден </div>`,
  methods: {
    handelBuyClick(item) {
      this.$emit('buy', item);
    }
  },
  components: {
    'item-component': ItemComponent,
   
  },
};

const BasketsListComponent = {
  props:[ 'id', 'title', 'qty', 'price', 'img'],
  template: `<li class="product-in-sc">
            <a href="single-page.html" style="float: left;">
                <img :src="img" style="width: 50px; height:70px; float: left;" >
             </a>
                <div class="product-in-sc-desc">
                    <h3 class="h3-sc-name"> {{title}} </h3>
                    <div class="sc-rating">
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                        <i class="fas fa-star rat"></i>
                    </div>
                    <div class="sc-count">
                     <input class="qty" type="number" style="width: 30px; height:15px; " :value="qty" @input="handelQuantityChange"> x $ {{price }}
                    </div>

                </div>
           
            <div class="sh__action"  @click="handelDeletClick" ><a href="#" class="action"><i
                    class="far fa-times-circle"></i></a></div>

          </li>`,
        

  methods:{
    handelQuantityChange(event) {
      this.$emit('changed', {id:this.id, qty: event.target.value});

    },
    handelDeletClick() {
      this.$emit('deleted', this.id);
    }
  }

  

};

const BasketComponent = {
  props: ['items'],
  template: `<div class="shopping-cart__drop">
            <ul>
             <baskets-list-component
             v-for="item in items"
             :key="item.id"
             :title="item.title" 
             :id="item.id"
             :qty="item.qty"
             :price="item.price"
             :img="item.img"
             @changed="handelQuantityChange"
             @deleted="handelDelet"
             ></baskets-list-component>
             </ul>
             <div class="total">
                  <div>total</div>
                  <div>$  {{total}} </div>
              </div>
              <a href="checkout.html" class="sc-btn">Checkout</a>
              <a href="shopping-card.html" class="sc-btn">go&nbsp;to&nbsp;cart</a>
              </div>`,
  computed: {
    total(){
      return this.items.reduce((acc, item) => acc + item.qty * item.price, 0 );
    },
  },
   
        
   

  components: {
    'baskets-list-component': BasketsListComponent,
  },

  methods:{
    handelQuantityChange(item) {
      this.$emit('changed', item);
    },
    handelDelet(id) {
      this.$emit('deleted', id);
    }
  }
};

const SearchComponent = {
  template: `<div>
              <input type="text" v-model="query" class="search" placeholder="Search for Item..." >
              <button @click="handelSearchClick"class="search__button"><i class="fas fa-search"></i></button>
              </div>`,
  data() {
    return{
      query: '',
    }
  },

  methods: {
    handelSearchClick() {
      this.$emit('search', this.query);
    }
  }
};

const NumberComponent = {
  props: ['qty', 'total'],
  template: `<input class="sh-count" :value="qty" @input="handelQuantityChange">{{total}}  `,
  methods:{
    handelQuantityChange(event) {
      this.$emit('changed', {qty: event.target.value});

    }
  },
  computed: {
    total(){
      return this.items.reduce((acc, item) => acc + item.qty , 0 );
    }
  }
};

 

const MenusComponentItem = {
props: ['items'],
template: ` <div class="drop">
<div class="drop-flex">
    <h3 class="drop-h3">Women</h3>
    <ul>
        <li><a href="catalog.html" class="drop-link">Dresses</a></li>
        <li><a href="catalog.html" class="drop-link">Tops</a></li>
        <li><a href="catalog.html" class="drop-link">Sweaters/Knits</a></li>
        <li><a href="catalog.html" class="drop-link">Jackets/Coats</a></li>
        <li><a href="catalog.html" class="drop-link">Blazers</a></li>
        <li><a href="catalog.html" class="drop-link">Denim</a></li>
        <li><a href="catalog.html" class="drop-link">Leggings/Pants</a></li>
        <li><a href="catalog.html" class="drop-link">Skirts/Shorts</a></li>
        <li><a href="catalog.html" class="drop-link">Accessories </a></li>
    </ul>
</div>
<div class="drop-flex">
    <h3 class="drop-h3">Women</h3>
    <ul>
        <li><a href="catalog.html" class="drop-link">Dresses</a></li>
        <li><a href="catalog.html" class="drop-link">Tops</a></li>
        <li><a href="catalog.html" class="drop-link">Sweaters/Knits</a></li>
        <li><a href="catalog.html" class="drop-link">Jackets/Coats</a></li>
    </ul>
    <h3 class="drop-h3 drop-menu__margin">Women</h3>
    <ul>
        <li><a href="catalog.html" class="drop-link">Dresses</a></li>
        <li><a href="catalog.html" class="drop-link">Tops</a></li>
        <li><a href="catalog.html" class="drop-link">Sweaters/Knits</a></li>
    </ul>
</div>
<div class="drop-flex">
    <h3 class="drop-h3">Women</h3>
    <ul>
        <li><a href="catalog.html" class="drop-link">Dresses</a></li>
        <li><a href="catalog.html" class="drop-link">Tops</a></li>
        <li><a href="catalog.html" class="drop-link">Sweaters/Knits</a></li>
        <li><a href="catalog.html" class="drop-link">Jackets/Coats</a></li>
    </ul>
    <div class="drop-flex-img"><a href="catalog.html" class="drop-super-sale">Super
        sale!</a>
    </div>
</div>
</div>`,
 
};

const MenusComponentList = {
  props: ['id', 'href', 'grade', 'title'],
  template: `<li :class="grade"> 
  <a :href="href" class="menu-link"> {{title}}</a>
    <memus-component-item
    
    >
    </memus-component-item>
  </li>`,
  components: {
    'memus-component-item': MenusComponentItem,
  }
};

const MenusComponent = {
  props: ['items'],
  template: `<nav class="navigation">
  <ul class="container menu">
  <li class="menu-list"><a href="index.html" class="menu-link">Home</a>
  </li>
  <menus-component-list
              v-for="item in items"
              :key="item.id"
              :title="item.title" 
              :id="item.id"
              :href="item.href"
              :grade="item.grade" >
   </menus-component-list>
  </ul>
  </nav>`,
  components: {
    'menus-component-list': MenusComponentList,
  }
 };








const app = new Vue({

  el: '.wrapper',
  data: {
    items: [],
     
    basket: [],
    menus: [],
    menuItem1: [],
    menuItem2: [],
    menuItem3: [],
    menuItem4: [],
    catalog:[],
    query: '',
    isBasketVisible: false,
     
   
  },
  methods: {
     
     
    handelBuyClick(item){
      const basketItem = this.basket.find((basketItem) => +basketItem.id === +item.id); 
      
      if(basketItem) {
        fetch(`/baskets/${item.id}`, {
          method: 'PATCH',
          body: JSON.stringify({qty: basketItem.qty + 1}),
          headers: {
            'Content-type': 'application/json',
          }
        }).then(() => {
          basketItem.qty++;
          
        });
      } else {
        fetch('/baskets', {
        method: 'POST',
        body: JSON.stringify({...item, qty: 1}),
        headers: {
          'Content-type': 'application/json',
        },
      }).then(() => {
        this.basket.push({...item, qty:1});
      });
      }
      
      
      
    },
    handelDeletClick(id) {
      const basketItem = this.basket.find((basketItem) => +basketItem.id === +id); 

      if(basketItem && basketItem.qty > 1) {
        fetch(`/baskets/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({qty: basketItem.qty - 1}),
          headers: {
            'Content-type': 'application/json',
          }
        }).then(() => {
          basketItem.qty--;
          
        });
      } else {
          if(confirm('Вы действительно хотите удалить товар из корзины?')) {
            fetch(`/baskets/${id}`, {
            method: 'DELETE',
          }).then(() => {
            this.basket = this.basket.filter((item) => item.id !== id);
          });
          }
        
      }
      
    },
    toggleBasket() {
      this.isBasketVisible = !this.isBasketVisible;
    },
    onQueryChange(query){
      this.query = query;
    },
    handelBasketChange(item) {
      const basketItem = this.basket.find((basketItem) => +basketItem.id === +item.id); 
      basketItem.qty = item.qty;
      fetch(`/baskets/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({qty: item.qty }),
        headers: {
          'Content-type': 'application/json',
        }
      });
    }
  },
  mounted() {
    fetch('/goods')
      .then(response => response.json())
      .then((goods) => {
          this.items = goods;
        
      });
    
    fetch('/baskets')
      .then(response => response.json())
      .then((baskets) => {
          this.baskets = baskets;
           
      });
    fetch('/menus')
      .then(response => response.json())
      .then((menus) => {
          this.menus = menus;
          
      });
       
  },

  computed: {
   
    filteredItems() {
      return this.items.filter((item) => {
        const regexp = new RegExp(this.query, 'i');
        return regexp.test(item.title);
        });
    }
  },

  components: {
    'items-list-component': ItemsListComponent,
    'item-component': ItemComponent,
    'baskets-list-component': BasketsListComponent,
    'basket-component': BasketComponent,
    'search-component': SearchComponent,
    'numder-component': NumberComponent,
    'menus-component': MenusComponent,

  },

   
}); 

