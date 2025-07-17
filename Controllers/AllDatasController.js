import { Datas } from "../Model/datas.js";
import { Category } from "../Model/createCategory.js";

const result = document.querySelector("tbody");
const Datass = new Datas();

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  render();
  renderCategory()
});

async function render() {
  try {
    const datas = await Datass.getData();
    console.log(datas);
    result.innerHTML = "";

    let number = 1;
    datas.forEach((f) => {
      const para = document.createElement("tr");

      para.innerHTML = `
      <td>${number}</td>
      <td>${f.title} </td>
      <td>${f.type} </td>
      <td>${f.total}</td>
      <td>${new Date(f.date).toLocaleDateString()}</td>
      <button id="edit-${
        f.id
      }" type="button" class="btn btn-warning bg-warning text-white m-1 p-2 " data-bs-toggle="modal" data-bs-target="#detailModal">Detail</button>
      <button id="delete-${
        f.id
      }" class="btn btn-danger bg-danger text-white m-1 p-2">Delete</button>
      `;
      result.appendChild(para);

      number = ++number;
      document.getElementById(`edit-${f.id}`).addEventListener("click", (s) => {
        s.preventDefault();
        editData(`${f.id}`);
      });

      document
        .getElementById(`delete-${f.id}`)
        .addEventListener("click", (s) => {
          s.preventDefault();
          deleteData(`${f.id}`);
        });
    });
  } catch (error) {
    console.error("Error while rendering data: ", error);
  }
}

async function deleteData(id) {
  await Datass.deleteData(id);
  render();
}

async function editData(id) {
  const getUser = await fetch(
    `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`
  );

  if (!getUser.ok) {
    throw new Error(`Error while fetch data user: `);
  }

  window.id = id;
  const dataUser = await getUser.json();
  document.getElementById("titleB").value = dataUser.title;
  document.getElementById("descriptionB").value = dataUser.description;
  document.getElementById("typeB").value = dataUser.type;
  document.getElementById("totalB").value = dataUser.total;
  document.getElementById("categoryB").value = dataUser.category;
  document.getElementById("dateB").value = dataUser.date;
  render();
}

function renderCategory(){
  const CategoryManager = new Category()
  const allDataCategory = CategoryManager.getKategoriPelajaranFromLocalStorage()
  const category = document.getElementById("categoryB");

  const optionDefault = document.createElement("option")
  optionDefault.textContent = "-- Pilih Category --"
  optionDefault.value = ""
  category.appendChild(optionDefault)
  
  allDataCategory.forEach(c => {
    const option = document.createElement("option")
    option.textContent = c.category_name
    option.value = c.category_name
    category.appendChild(option)
  });
}

document.getElementById("update").addEventListener("click", async (e) => {
  e.preventDefault();

  console.log(id);
  try {
    await Datass.editData(id);
    renderCategory()
    render();
  } catch {}
});
