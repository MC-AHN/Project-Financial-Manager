import { Datas } from "../Model/datas.js";

const result = document.querySelector("tbody");
const Datass = new Datas();

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  render();
});

async function render() {
  try {
    const datas = await Datass.getData();
    console.log(datas)
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
  if (dataUser.type == "income") {
    document.getElementById("categoryB").style.display = 'none';
    document.getElementById("subCategoryB").style.display = 'none';
    document.getElementById("categoryBLabel").style.display = 'none';
    document.getElementById("subCategoryBLabel").style.display = 'none';
  } else {
    document.getElementById("categoryB").value = dataUser.category;

    const category = document.getElementById("categoryB").value;
  const subCategory = document.getElementById("subCategoryB");
  const categories = {
    kebutuhanPokok: [
      "Makanan & Minuman",
      "Tempat Tinggal (Sewa/Cicilan)",
      "Listrik, Air, Gas",
      "Transportasi",
      "Kesehatan",
      "Pendidikan",
    ],
    keinginan: [
      "Hiburan",
      "Hobi",
      "Belanja Pakaian/Gadget",
      "Makan di Luar (Tambahan)",
    ],
    kewajiban: ["Pajak", "Cicilan Utang", "Asuransi", "Sedekah/Donasi"],
    tabunganInvestasi: [
      "Tabungan Dana Darurat",
      "Tabungan Pendidikan",
      "Investasi Saham/Reksa Dana",
    ],
  };
  subCategory.innerHTML = "";

  const optionDefault = document.createElement("option");
  optionDefault.value = "";
  optionDefault.textContent = "-- Sub Category --";

  subCategory.appendChild(optionDefault);
  categories[category].forEach((subCat) => {
    const option = document.createElement("option");
    option.value = subCat;
    option.textContent = subCat;
    subCategory.appendChild(option);
  });

    document.getElementById("subCategoryB").value = dataUser.subCategory;
  }
  console.log(dataUser.subCategory)
  document.getElementById("dateB").value = dataUser.date;
  render();
}

document.getElementById("categoryB").onchange = () => {
  console.log("bisa")
  const category = document.getElementById("categoryB").value;
  const subCategory = document.getElementById("subCategoryB");
  const categories = {
    kebutuhanPokok: [
      "Makanan & Minuman",
      "Tempat Tinggal (Sewa/Cicilan)",
      "Listrik, Air, Gas",
      "Transportasi",
      "Kesehatan",
      "Pendidikan",
    ],
    keinginan: [
      "Hiburan",
      "Hobi",
      "Belanja Pakaian/Gadget",
      "Makan di Luar (Tambahan)",
    ],
    kewajiban: ["Pajak", "Cicilan Utang", "Asuransi", "Sedekah/Donasi"],
    tabunganInvestasi: [
      "Tabungan Dana Darurat",
      "Tabungan Pendidikan",
      "Investasi Saham/Reksa Dana",
    ],
  };
  subCategory.innerHTML = "";

  const optionDefault = document.createElement("option");
  optionDefault.value = "";
  optionDefault.textContent = "-- Sub Category --";

  subCategory.appendChild(optionDefault);
  categories[category].forEach((subCat) => {
    const option = document.createElement("option");
    option.value = subCat;
    option.textContent = subCat;
    subCategory.appendChild(option);
  });
};

document.getElementById("update").addEventListener("click", async (e) => {
  e.preventDefault();

  console.log(id);
  try {
    await Datass.editData(id);

    render();
  } catch {}
});
