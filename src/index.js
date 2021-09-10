let addToy = false;

const toyUrl = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys(toyUrl);
});

// Magic below here:
function fetchToys(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => renderToys(json));
}

function renderToys(toys) {
  if (Array.isArray(toys)) {
    for (const toy of toys) {
      createToyCard(toy);
    }
  } else {
    createToyCard(toys);
  }
}

// Add new Toy
const newToyForm = document.querySelector(".add-toy-form");

newToyForm.addEventListener("submit", submitNewToy);

function submitNewToy(event) {
  event.preventDefault();

  const nameField = document.getElementsByName("name")[0];
  const imageField = document.getElementsByName("image")[0];

  const formData = {
    name: nameField.value,
    image: imageField.value,
    likes: 0,
  };

  console.log(formData);

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch(toyUrl, configObj)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (object) {
      renderToys(object);
    });
}

function createToyCard(toy) {
  const toyContainer = document.getElementById("toy-collection");
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = `toy-${toy.id}`;
  // h2 tag with name
  const h2 = document.createElement("h2");
  h2.innerHTML = toy.name;
  card.appendChild(h2);
  // img tag
  const img = document.createElement("img");
  img.classList.add("toy-avatar");
  img.src = toy.image;
  card.appendChild(img);
  // p tag with likes
  const p = document.createElement("p");
  p.innerHTML = `${toy.likes} Likes`;
  card.appendChild(p);
  // like button
  const btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.innerHTML = "Like <3";
  btn.addEventListener("click", function () {
    addLike(toy);
  });

  card.appendChild(btn);

  toyContainer.appendChild(card);
}

function addLike(toy) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: toy.likes + 1,
    }),
  };

  // console.log(toy.likes);
  fetch(toyUrl + `/${toy.id}`, configObj)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (object) {
      updateToy(object);
    });
}

function updateToy(toy) {
  // console.log(toy);
  const card = document.getElementById(`toy-${toy.id}`);
  const p = card.querySelector("p");
  // console.log(p);
  p.innerHTML = `${toy.likes} Likes`;
}
