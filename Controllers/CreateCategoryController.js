import { Category } from "../Model/createCategory.js";

const KategoriPelajaranForm = document.getElementById(
  "Kategori-pelajaran-form"
);
const tableBody = document.querySelector("#Kategori-pelajaran-table tbody");

// instance object class kategori pelajaran
const CategoryManager = new Category();

KategoriPelajaranForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldId = document.getElementById("oldId").value;
  const name = document.getElementById("name").value;

  CategoryManager.addKategoriPelajaran(oldId, name);

  renderKatagoriPelajaran();
  KategoriPelajaranForm.reset();
});

function renderKatagoriPelajaran() {
  tableBody.innerHTML = "";

  const semuaDataKategoriPelajaran =
    CategoryManager.getKategoriPelajaranFromLocalStorage();
  console.log("semua data kategori pelajaran: ", semuaDataKategoriPelajaran);

  semuaDataKategoriPelajaran.forEach((data) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${data.category_id}</td>
    <td>${data.category_name}</td>
    <td>${new Date(data.create_ad).toDateString()}</td>
    <td>
    <button id="edit-${data.category_id}" class="btn btn-warning">Edit</button>
    <button id="delete-${
      data.category_id
    }" class="btn btn-danger">Delete</button>
    </td>
    `;

    tableBody.appendChild(row);

    document
      .getElementById(`edit-${data.category_id}`)
      .addEventListener("click", () => {
        editKategoriPelajaran(data.category_id);
      });
    document
      .getElementById(`delete-${data.category_id}`)
      .addEventListener("click", () => {
        deleteKategoriPelajaran(data.category_id);
      });
  });
}

function deleteKategoriPelajaran(id) {
  CategoryManager.deleteKategoriPelajaran(id);
  renderKatagoriPelajaran();
}

function editKategoriPelajaran(id) {
  const semuaDataKategoriPelajaran =
    CategoryManager.getKategoriPelajaranFromLocalStorage();

  const editDataKategoriPelajaran = semuaDataKategoriPelajaran.filter(
    (data) => data.category_id === id
  );

  document.getElementById("oldId").value =
    editDataKategoriPelajaran[0].category_id;
  document.getElementById("name").value =
    editDataKategoriPelajaran[0].category_name;

  renderKatagoriPelajaran();
}

document.addEventListener("DOMContentLoaded", () => {
  renderKatagoriPelajaran();
  console.log("Berhasil");
});
