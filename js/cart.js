document.getElementById('checkout-btn').addEventListener('click', () => {
  if (!getCurrentUser()) {
    alert('Vui lòng đăng nhập để thanh toán.');
    window.location.href = 'login.html';
    return;
  }

  const checkboxes = document.querySelectorAll('.cart-checkbox:checked');
  const cart = getCart();
  const selectedItems = [];

  checkboxes.forEach(cb => {
    const index = parseInt(cb.dataset.index);
    const quantityInput = document.querySelector(`.quantity-input[data-index="${index}"]`);
    const quantity = parseInt(quantityInput.value) || 1;

    selectedItems.push({
      name: cart[index].name,
      price: cart[index].price,
      quantity: quantity
    });
  });

  if (selectedItems.length === 0) {
    alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
    return;
  }

  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  window.location.href = 'checkout.html';
});

  
  function getCurrentUser() {
    return localStorage.getItem('currentUser');
  }
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function saveCart(c) {
    localStorage.setItem('cart', JSON.stringify(c));
  }
  
  function addToCart(prod) {
    if (!getCurrentUser()) {
      alert('Vui lòng đăng nhập để thêm sản phẩm.');
      window.location.href = 'login.html';
      return;
    }
    const c = getCart();
    c.push(prod);
    saveCart(c);
    alert('Đã thêm vào giỏ hàng!');
  }
  
  function renderCart() {
    const cart = getCart();
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
  
    let total = 0;
    cart.forEach((item, i) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-light';
      li.innerHTML = `
  <div class="cart-item row gx-2 align-items-center">
    <div class="col-auto">
      <input type="checkbox" class="cart-checkbox" data-index="${i}" checked>
    </div>
    <div class="col product-name">${item.name}</div>
    <div class="col-auto">
      <input type="number" min="1" class="form-control quantity-input" value="${item.quantity || 1}" data-index="${i}" style="width:70px;">
    </div>
    <div class="col-auto price-label text-end">${(item.price * (item.quantity || 1)).toLocaleString()}₫</div>
    <div class="col-auto">
      <button class="remove-btn btn btn-danger btn-sm" data-index="${i}">X</button>
    </div>
  </div>`;



      list.appendChild(li);
  
      total += item.price * (item.quantity || 1);
    });
  
    document.getElementById('cart-total').textContent = total.toLocaleString() + '₫';
    // Gắn sự kiện thay đổi checkbox và số lượng
document.querySelectorAll('.cart-checkbox, .quantity-input').forEach(el => {
  el.addEventListener('change', updateTotal);
});

// Gọi 1 lần khi render
updateTotal();
//sk xóa sp
document.querySelectorAll('.remove-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.dataset.index);
    removeItem(index);
  });
});

}
  
  
  function removeItem(idx) {
    const c = getCart();
    c.splice(idx, 1);
    saveCart(c);
    renderCart();
  }
  function updateTotal() {
    const checkboxes = document.querySelectorAll('.cart-checkbox');
    const cart = getCart();
    let total = 0;
  
    checkboxes.forEach(cb => {
      const index = parseInt(cb.dataset.index);
      const quantityInput = document.querySelector(`.quantity-input[data-index="${index}"]`);
      const quantity = parseInt(quantityInput.value) || 1;
  
      if (cb.checked) {
        total += cart[index].price * quantity;
      }
    });
  
    document.getElementById('cart-total').textContent = total.toLocaleString() + '₫';
  }
  
  renderCart();

  