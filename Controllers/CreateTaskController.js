import { Datas } from "../Model/datas.js";

const Datass = new Datas();

const form = document.getElementById("form");

form.addEventListener("submit", (f) => {
  f.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const type = document.getElementById("type").value;
  const total = document.getElementById("total").value;
  const category = document.getElementById("category").value;
  const subCategory = document.getElementById("subCategory").value;
  const date = document.getElementById("date").value == "" ? value : new Date();
  console.log("ini cek", title, description, category, subCategory, date);
  if (!title || !description || !type || !total || !category || !subCategory || !date) {
    alert("Title, description, type,   total, category, sub category, date is Required");
  } else {
    Datass.postData();
    form.reset();
  }
});

const typee = document.getElementById("type")
const kategori = document.getElementById("category")
const kategoriLabel = document.getElementById("categoryLabel")
const subCategory = document.getElementById("subCategory")
const subCategoryLabel = document.getElementById("subCategoryLabel")
typee.onchange = () => {
  if (typee.value == "income") {
    kategori.style.display = "none"
    kategoriLabel.style.display = "none"
    subCategory.style.display = "none"
    subCategoryLabel.style.display = 'none'
  } else {
    kategori.style.display = "block"
    kategoriLabel.style.display = "block"
    subCategory.style.display = "block"
    subCategoryLabel.style.display = 'block'
  }
}

document.getElementById("category").onchange = () => {
  const category = document.getElementById("category").value;
  const subCategory = document.getElementById("subCategory");
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
