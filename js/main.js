// js/main.js

// Danh sách 10 sản phẩm, thêm thuộc tính mp (megapixel)
const products = [
  {
    id: 1,
    name: "Canon EOS R5",
    price: 10000000,
    img: "img/canon-eos-r5.jpg",
    brand: "Canon",
    mp: 45
  },
  {
    id: 2,
    name: "Nikon Z6 II",
    price: 15000000,
    img: "img/nikon-z6-ii.jpg",
    brand: "Nikon",
    mp: 24.5
  },
  {
    id: 3,
    name: "Sony A7 III",
    price: 12500000,
    img: "img/sony-a7-iii.jpg",
    brand: "Sony",
    mp: 24.2
  },
  {
    id: 4,
    name: "Fujifilm X‑AS",
    price: 20000000,
    img: "img/FujifilmXAS.jpg",
    brand: "Fujifilm",
    mp: 26.1
  },
  {
    id: 5,
    name: "Panasonic Lumix S5",
    price: 18000000,
    img: "img/Panasonic-Lumix-S5.jpg",
    brand: "Panasonic",
    mp: 24.2
  },
  {
    id: 6,
    name: "Olympus OM-D E-M10",
    price: 8000000,
    img: "img/olympus-m10.jpg",
    brand: "Olympus",
    mp: 20.3
  },
  {
    id: 7,
    name: "Canon EOS M50",
    price: 9000000,
    img: "img/canon-eos-m50.jpg",
    brand: "Canon",
    mp: 24.1
  },
  {
    id: 8,
    name: "Nikon D7500",
    price: 14000000,
    img: "img/nikon-d7500.jpg",
    brand: "Nikon",
    mp: 20.9
  },
  {
    id: 9,
    name: "Sony A6400",
    price: 11000000,
    img: "img/sony-6400.jpg",
    brand: "Sony",
    mp: 24.2
  },
  {
    id: 10,
    name: "Leica Q2",
    price: 26000000,
    img: "img/leica-q2.jpg",
    brand: "Leica",
    mp: 47.3
  },
  {
    id: 11,
    name: "Canon EOS R6",
    price: 13000000,
    img: "img/canon-eos-r6.jpg",
    brand: "Canon",
    mp: 20.1
  },
  {
    id: 12,
    name: "Nikon Z7 II",
    price: 22000000,
    img: "img/nikon-z7-ii.jpg",
    brand: "Nikon",
    mp: 45.7
  },
  {
    id: 13,
    name: "Sony A7R IV",
    price: 28000000,
    img: "img/sony-a7r-iv.jpg",
    brand: "Sony",
    mp: 61
  },
  {
    id: 14,
    name: "Fujifilm X-T4",
    price: 18000000,
    img: "img/fujifilm-x-t4.jpg",
    brand: "Fujifilm",
    mp: 26.1
  },
  {
    id: 15,
    name: "Panasonic GH5",
    price: 17000000,
    img: "img/panasonic-gh5.jpg",
    brand: "Panasonic",
    mp: 20.3
  },
  {
    id: 16,
    name: "Olympus OM-D E-M1 II",
    price: 16000000,
    img: "img/olympus-em1-ii.jpg",
    brand: "Olympus",
    mp: 20.4
  },
  {
    id: 17,
    name: "Leica SL2",
    price: 45000000,
    img: "img/leica-sl2.jpg",
    brand: "Leica",
    mp: 47.3
  },
  {
    id: 18,
    name: "Ricoh GR III",
    price: 12000000,
    img: "img/ricoh-gr-iii.jpg",
    brand: "Ricoh",
    mp: 24.2
  },
  {
    id: 19,
    name: "Sony RX100 VII",
    price: 15000000,
    img: "img/sony-rx100-vii.jpg",
    brand: "Sony",
    mp: 20.1
  },
  {
    id: 20,
    name: "Canon EOS 5D Mark IV",
    price: 25000000,
    img: "img/canon-5d-mark-iv.jpg",
    brand: "Canon",
    mp: 30.4
  }
];


let filteredProducts = [...products];
let currentPage = 0;
const pageSize = 4;

// Active filters
const activeFilters = {
  brand: null,
  priceMin: 0,
  priceMax: Infinity,
  resMin: 0,
  resMax: Infinity
};

document.addEventListener('DOMContentLoaded', () => {
  // Toggle chính và submenu khi click
  const catToggle = document.getElementById('categoryToggle');
  const catMenu   = document.getElementById('categoryMenu');

  // Mở/đóng menu chính
  catToggle.addEventListener('click', e => {
    e.preventDefault();
    catMenu.classList.toggle('show');
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener('click', e => {
    if (!e.target.closest('.filter-dropdown')) {
      catMenu.classList.remove('show');
      document.querySelectorAll('.dropdown-submenu .dropdown-menu.show')
              .forEach(sm => sm.classList.remove('show'));
    }
  });

  // Submenu
  document.querySelectorAll('.dropdown-submenu > .dropdown-toggle')
    .forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const id = btn.dataset.submenu;
        const sm = document.getElementById(id);
        sm.classList.toggle('show');
      });
    });

  // Render ban đầu
  renderProducts();

  // Tìm kiếm
  document.getElementById('search-btn')
    .addEventListener('click', () => applyAllFilters());
  document.getElementById('search-input')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyAllFilters();
      }
    });

  // Lọc theo thương hiệu
  document.querySelectorAll('.filter-brand').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      activeFilters.brand = el.dataset.brand;
      applyAllFilters();
    });
  });

  // Lọc theo giá
  document.querySelectorAll('.filter-price').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      activeFilters.priceMin = Number(el.dataset.min);
      activeFilters.priceMax = Number(el.dataset.max);
      applyAllFilters();
    });
  });

  // Lọc theo độ phân giải
  document.querySelectorAll('.filter-res').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      activeFilters.resMin = Number(el.dataset.min);
      activeFilters.resMax = Number(el.dataset.max);
      applyAllFilters();
    });
  });

  // Xóa bộ lọc
  document.querySelector('.clear-filters').addEventListener('click', e => {
    e.preventDefault();
    activeFilters.brand = null;
    activeFilters.priceMin = 0;
    activeFilters.priceMax = Infinity;
    activeFilters.resMin = 0;
    activeFilters.resMax = Infinity;
    document.getElementById('search-input').value = '';
    applyAllFilters();
  });
});

function applyAllFilters() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(q);
    const matchesBrand  = !activeFilters.brand || p.brand === activeFilters.brand;
    const matchesPrice  = p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax;
    const matchesRes    = p.mp    >= activeFilters.resMin    && p.mp    <= activeFilters.resMax;
    return matchesSearch && matchesBrand && matchesPrice && matchesRes;
  });
  currentPage = 0;
  renderProducts();
}

function renderProducts() {
  const row = document.getElementById('product-row');
  row.innerHTML = '';

  row.classList.add('product-row-zoomin');
  setTimeout(() => row.classList.remove('product-row-zoomin'), 500);

  const list = filteredProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  list.forEach(p => {
    row.innerHTML += `
    <div class="col-sm-6 col-md-3">
      <div class="card product-card h-100">
        <img src="${p.img}" class="card-img-top">
        <div class="card-body">
          <h5>${p.name}</h5>
          <p>${p.price.toLocaleString()}₫</p>
          <button class="btn btn-primary w-100 mb-2 add-cart-btn"
  data-name="${p.name}" data-price="${p.price}">
  Thêm vào giỏ
</button>

          <a href="product-detail.html?prod=${p.id}" class="btn btn-outline-light w-100">Chi tiết</a>
        </div>
      </div>
    </div>`;
  });
}
// Bắt sự kiện click cho tất cả nút "Thêm vào giỏ"
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-cart-btn')) {
    const name = e.target.dataset.name;
    const price = parseInt(e.target.dataset.price);

    if (typeof addToCart === 'function') {
      addToCart({ name, price });
    } else {
      console.error("❌ Hàm addToCart không tồn tại hoặc chưa được định nghĩa.");
    }
  }
});


function nextPage() {
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  currentPage = (currentPage + 1) % totalPages;
  renderProducts();
}

function prevPage() {
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  currentPage = (currentPage - 1 + totalPages) % totalPages;
  renderProducts();
}


