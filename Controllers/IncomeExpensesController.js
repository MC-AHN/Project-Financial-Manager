import { Datas } from "../Model/datas.js";
import { Category } from "../Model/createCategory.js";

const Datass = new Datas();

const form = document.getElementById("form");

form.addEventListener("submit", (f) => {
  f.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const type = document.getElementById("type").value;
  const total = document.getElementById("total").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value == "" ? value : new Date();
  console.log("ini cek", title, description, category, date);
  if (!title || !description || !type || !total || !date) {
    alert("Title, description, type,   total, date is Required");
  } else {
    Datass.postData();
    form.reset();
  }
});

function renderCategory(){
  const CategoryManager = new Category()
  const allDataCategory = CategoryManager.getKategoriPelajaranFromLocalStorage()
  const category = document.getElementById("category");

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

document.addEventListener("DOMContentLoaded", () => {
  renderCategory()
})
