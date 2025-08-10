  
  if (window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0) {
    document.documentElement.className = document.documentElement.className + ' ie';

    var scripts = document.getElementsByTagName('script')[0];
    var polyfill = document.createElement("script");
    polyfill.defer = true;
    polyfill.src = "cdn/shop/t/151/assets/ie11.js?v=144489047535103983231699441056";

    scripts.parentNode.insertBefore(polyfill, scripts);
  } else {
    document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
  }

  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.preloadAfterLoad = true;

  let root = '/';
  if (root[root.length - 1] !== '/') {
    root = root + '/';
  }

  window.theme = {
    routes: {
      root: root,
      cart: '/cart',
      cart_add_url: '/cart/add',
      product_recommendations_url: '/recommendations/products',
      predictive_search_url: '/search/suggest',
      addresses_url: '/account/addresses'
    },
    assets: {
      photoswipe: 'cdn/shop/t/151/assets/photoswipe.js?v=101811760775731399961699441056',
      smoothscroll: 'cdn/shop/t/151/assets/smoothscroll.js?v=37906625415260927261699441056',
      swatches: 'cdn/shop/t/151/assets/swatches.json?v=153762849283573572451699441056',
      base: "cdn/shop/t/151/assets/",
      no_image: "cdn/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_1024x.gif",
    },
    strings: {
      addToCart: "Add to cart",
      soldOut: "We’re working on it",
      from: "From",
      preOrder: "Pre-order",
      sale: "Sale",
      subscription: "Subscription",
      unavailable: "Unavailable",
      unitPrice: "Unit price",
      unitPriceSeparator: "per",
      shippingCalcSubmitButton: "Calculate shipping",
      shippingCalcSubmitButtonDisabled: "Calculating...",
      selectValue: "Select value",
      selectColor: "Select color",
      oneColor: "color",
      otherColor: "colors",
      upsellAddToCart: "Add",
      free: "Free"
    },
    settings: {
      customerLoggedIn: null ? true : false,
      cartDrawerEnabled: true,
      enableQuickAdd: true,
      enableAnimations: true,
      transparentHeader: false,
      swatchStyle: "rectangle"
    },
    moneyFormat: false ? "£{{amount}} GBP" : "£{{amount}}",
    moneyWithoutCurrencyFormat: "£{{amount}}",
    moneyWithCurrencyFormat: "£{{amount}} GBP",
    subtotal: 0,
    info: {
      name: 'broadcast'
    },
    version: '3.6.0'
  };

  document.addEventListener('lazyloaded', (e) => {
    const lazyImage = e.target.parentNode;
    if (lazyImage.classList.contains('lazy-image')) {
      lazyImage.style.backgroundImage = 'none';
    }
  }); 
 