let helpers = {
  formatPrice: function(cents) {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
}

export default helpers;
