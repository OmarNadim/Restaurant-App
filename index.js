import { menuArray } from "./data.js";

/*At the start of the App, The items of the menu are rendered*/

renderMenuItems();

let orderedItems = "";
let totalPrice = 0;

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    document.getElementById("thank-you").style.display = "none";
    const addedItem = menuArray.filter(function (item) {
      return item.id === e.target.dataset.add;
    })[0];

    orderedItems += `
        <div class="ordered" id="item-${addedItem.id}">
            <p>${addedItem.name}<span data-remove="${addedItem.id}">remove</span></p>
            <p>$${addedItem.price}</p>
        </div>`;

    totalPrice += addedItem.price;
    renderOrderedItems();
  } else if (e.target.dataset.remove) {
    const parent = document.getElementById("ordered-items-modal");
    const child = document.getElementById("item-" + e.target.dataset.remove);

    parent.removeChild(child);

    orderedItems = document.getElementById("ordered-items-modal").innerHTML;

    const removedItem = menuArray.filter(function (item) {
      return item.id === e.target.dataset.remove;
    })[0];

    totalPrice -= removedItem.price;
    if (totalPrice) {
      renderOrderedItems();
    } else {
      document.getElementById("order-modal").style.display = "none";
    }
  }
});

function renderMenuItems() {
  const menu = document.getElementById("menu");
  let menuItems = "";

  for (let item of menuArray) {
    menuItems += `
        <div class="item">
            <div class="order">
                <img src=${item.image}>
                    <div class="description">
                        <p class="dish">${item.name}</p>
                        <p class="ingredients">${item.ingredients}</p>
                        <p class="price">$${item.price}</p>
                    </div>
            </div>
            <div class="add" data-add="${item.id}">
                <p class="plus" data-add="${item.id}">+<p>
            </div>
        </div>
        <div class="border"></div>`;
  }

  menu.innerHTML = menuItems;
}

function renderOrderedItems() {
  document.getElementById("order-modal").style.display = "block";
  document.getElementById("ordered-items-modal").innerHTML = orderedItems;
  document.getElementById("total-price").innerHTML = "$" + totalPrice;
}

const orderBtn = document.getElementById("order-btn");

orderBtn.addEventListener("click", function () {
  document.getElementById("payment-modal").style.display = "block";
});

const myForm = document.querySelector("form");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("payment-modal").style.display = "none";
  document.getElementById("order-modal").style.display = "none";

  const name = document.getElementById("name").value;

  document.getElementById(
    "thank-you-msg"
  ).innerHTML = `Thanks, ${name}! Your order is on its way!`;
  document.getElementById("thank-you").style.display = "block";
  orderedItems = "";
  totalPrice = 0;
});
