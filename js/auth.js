document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  const path = location.pathname.split('/').pop();
  if (path === 'register.html') {
    document.getElementById('register-form').addEventListener('submit', registerUser);
  } else if (path === 'login.html') {
    document.getElementById('login-form').addEventListener('submit', loginUser);
  }
});

function getAccounts() {
  return JSON.parse(localStorage.getItem('accounts') || '{}');
}
function saveAccounts(accts) {
  localStorage.setItem('accounts', JSON.stringify(accts));
}

function registerUser(e) {
  e.preventDefault();
  const u = e.target.username.value.trim();
  const p = e.target.password.value;
  const cp = e.target.confirm.value;
  if (p !== cp) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }
  if (p.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự.');
    return;
  }
  const accts = getAccounts();
  if (accts[u]) {
    alert('Tài khoản đã tồn tại!');
    return;
  }
  accts[u] = p;
  saveAccounts(accts);
  alert('Đăng ký thành công! Vui lòng đăng nhập.');
  window.location.href = 'login.html';
}

function loginUser(e) {
  e.preventDefault();
  const u = e.target.username.value.trim();
  const p = e.target.password.value;
  const accts = getAccounts();
  if (accts[u] === p) {
    localStorage.setItem('currentUser', u);
    alert('Đăng nhập thành công!');
    window.location.href = 'index.html';
  } else {
    alert('Sai tên đăng nhập hoặc mật khẩu!');
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  renderNav();
}

function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

function renderNav() {
  const nav = document.getElementById('nav-user');
  if (!nav) return;
  const u = getCurrentUser();
  if (u) {
    nav.innerHTML = `
      <li class="nav-item"><span class="nav-link">Xin chào, ${u}</span></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Đăng xuất</a></li>`;
  } else {
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="login.html">Đăng nhập</a></li>
      <li class="nav-item"><a class="nav-link" href="register.html">Đăng ký</a></li>`;
  }
}
function addToCart(product) {
  const user = getCurrentUser();
  if (!user) {
    alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
    window.location.href = "login.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const index = cart.findIndex(p => p.name === product.name);

  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert("✅ Đã thêm vào giỏ: " + product.name);
}


function addToCart(product) {
  const user = getCurrentUser?.();
  if (!user) {
    alert("Bạn cần đăng nhập để thêm vào giỏ hàng.");
    window.location.href = "login.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const index = cart.findIndex(p => p.name === product.name);

  if (index !== -1) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert("✅ Đã thêm vào giỏ: " + product.name);
}
