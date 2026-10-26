/* =========================
   NAVBAR: HAMBURGER MENU
========================= */

const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");

hamburgerMenu.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  navbarNav.classList.toggle("active");
});

/* =========================
   SEARCH FORM
========================= */

const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  searchForm.classList.toggle("active");

  if (searchForm.classList.contains("active")) {
    searchBox.focus();
  }
});

/* =========================
   SHOPPING CART: NAVBAR
========================= */

const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartButton = document.querySelector("#shopping-cart-button");

shoppingCartButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  shoppingCart.classList.toggle("active");
});

/* =========================
   MENUTUP MENU SAAT KLIK DI LUAR
========================= */

document.addEventListener("click", (e) => {
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (
    !shoppingCartButton.contains(e.target) &&
    !shoppingCart.contains(e.target)
  ) {
    shoppingCart.classList.remove("active");
  }
});

/* =========================
   MODAL DETAIL PRODUK
========================= */

const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const closeModal = document.querySelector(".modal .close-icon");

const modalImage = document.querySelector(".modal-content > img");
const modalTitle = document.querySelector(".modal-content .product-content h3");
const modalPrice = document.querySelector(".modal-content .product-price");

itemDetailButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const productCard = button.closest(".product-card");

    if (!productCard) return;

    const productName = productCard
      .querySelector(".product-title")
      .textContent.trim();

    const productImage = productCard
      .querySelector(".product-img img")
      .getAttribute("src");

    const productPrice = productCard.querySelector(".product-price").innerHTML;

    modalTitle.textContent = productName;
    modalImage.src = productImage;
    modalImage.alt = productName;
    modalPrice.innerHTML = productPrice;

    itemDetailModal.style.display = "flex";
  });
});

closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  itemDetailModal.style.display = "none";
});

itemDetailModal.addEventListener("click", (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
});

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

/* FORMAT HARGA */

function formatRupiah(number) {
  return "IDR " + number.toLocaleString("id-ID") + "K";
}

/* AMBIL ANGKA HARGA DARI HTML */

function getPrice(priceText) {
  const match = priceText.match(/IDR\s*([\d.]+)\s*K/i);

  return match ? Number(match[1].replace(/\./g, "")) : 0;
}

/* TAMPILKAN ISI KERANJANG */

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

  if (window.feather) {
    feather.replace();
  }
}

/* =========================
   TAMBAHKAN PRODUK KE KERANJANG
   SEKALIGUS BUKA PANEL NAVBAR
========================= */

cartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    // Buka panel shopping cart di sebelah kanan navbar
    shoppingCart.classList.add("active");

    const card = button.closest(".product-card");

    if (!card) return;

    const name = card.querySelector(".product-title").textContent.trim();

    const image = card.querySelector(".product-img img").getAttribute("src");

    const priceText = card.querySelector(".product-price").textContent;

    const price = getPrice(priceText);

    // Jika produk sudah ada, tambah jumlahnya
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

/* =========================
   TAMPILKAN TOTAL AWAL
========================= */

renderCart();

/* =========================
   TOMBOL ORDER NOW
   NAVIGASI KE PRODUCTS
========================= */

const orderButton = document.querySelector(".hero .cta");
const productsSection = document.querySelector("#products");

if (orderButton && productsSection) {
  orderButton.addEventListener("click", (e) => {
    e.preventDefault();

    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
