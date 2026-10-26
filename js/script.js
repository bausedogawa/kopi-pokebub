// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//toggle search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toggle shopping cart class active

const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartButton = document.querySelector("#shopping-cart-button");

shoppingCartButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  shoppingCart.classList.toggle("active");
});

// klik di luar sidebar, untuk menghilangkan nav

const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const closeModal = document.querySelector(".modal .close-icon");

// Ambil elemen di dalam modal
const modalImage = document.querySelector(".modal-content > img");
const modalTitle = document.querySelector(".modal-content .product-content h3");
const modalPrice = document.querySelector(".modal-content .product-price");

// Klik tombol mata pada setiap produk
itemDetailButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    // Ambil kartu produk yang tombolnya diklik
    const productCard = button.closest(".product-card");

    // Ambil data dari kartu produk
    const productName = productCard.querySelector(".product-title").textContent;
    const productImage = productCard
      .querySelector(".product-img img")
      .getAttribute("src");
    const productPrice = productCard.querySelector(".product-price").innerHTML;

    // Masukkan data ke modal
    modalTitle.textContent = productName;
    modalImage.src = productImage;
    modalImage.alt = productName;
    modalPrice.innerHTML = productPrice;

    // Tampilkan modal
    itemDetailModal.style.display = "flex";
  });
});

// Tutup modal dengan tombol X
closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  itemDetailModal.style.display = "none";
});

// Tutup modal ketika area gelap diklik
itemDetailModal.addEventListener("click", (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
});

// Tutup modal dengan tombol Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    itemDetailModal.style.display = "none";
  }
});

/* =========================
   SHOPPING CART KOPI POKEBUB
========================= */

const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.querySelector("#cart-total");

const cartButtons = document.querySelectorAll(
  ".product-card .product-icon a:first-child",
);

let cartItems = [];

// Mengubah angka harga menjadi format IDR
function formatRupiah(number) {
  return "IDR " + number.toLocaleString("id-ID") + "K";
}

// Mengambil angka harga dari HTML, misalnya IDR 50K menjadi 50
function getPrice(priceText) {
  const match = priceText.match(/IDR\s*([\d.]+)\s*K/i);

  return match ? Number(match[1].replace(/\./g, "")) : 0;
}

// Menampilkan isi keranjang dan menghitung total harga
function renderCart() {
  if (!cartItemsContainer || !cartTotalElement) return;

  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;

    const detail = document.createElement("div");
    detail.className = "item-detail";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("div");
    price.className = "item-price";
    price.textContent = formatRupiah(item.price) + " × " + item.quantity;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-item";
    removeButton.setAttribute("aria-label", "Hapus " + item.name);
    removeButton.textContent = "🗑";

    removeButton.addEventListener("click", () => {
      cartItems.splice(index, 1);
      renderCart();
    });

    detail.append(title, price);
    cartItem.append(image, detail, removeButton);
    cartItemsContainer.appendChild(cartItem);
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  cartTotalElement.textContent = formatRupiah(total);

  // Perbarui ikon Feather jika tersedia
  if (window.feather) {
    feather.replace();
  }
}

// Menambahkan produk ke keranjang
cartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const card = button.closest(".product-card");

    if (!card) return;

    const name = card.querySelector(".product-title").textContent.trim();

    const image = card.querySelector(".product-img img").getAttribute("src");

    const priceText = card.querySelector(".product-price").textContent;

    const price = getPrice(priceText);

    // Cek apakah produk sudah ada di keranjang
    const existingItem = cartItems.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        name: name,
        image: image,
        price: price,
        quantity: 1,
      });
    }

    renderCart();
  });
});

// Tampilkan total awal
renderCart();
