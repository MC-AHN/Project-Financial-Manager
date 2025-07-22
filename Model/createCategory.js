class Category {
  constructor(
    category_id,
    category_name,
    create_ad = new Date()
  ) {
    this.category_id = category_id;
    this.category_name = category_name;
    this.create_ad = create_ad;
  }

  getKategoriPelajaranFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem("Category")) || [];
    } catch (error) {
      console.error(
        "Error reading kategory pelajaran from localStorage: ",
        error
      );
    }
  }

  saveKategoriPelajaranToLocalStorage(data) {
    try {
      localStorage.setItem("Category", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving kategori pelajaran to localStorage: ", error);
    }
  }

  addKategoriPelajaran(oldId, name) {
    try {
        if (!name) {
          throw new Error("name kategori pelajaran are required");
      }
      if (oldId == "") {
        const id = this.generateKategoriPelajaranId();
        const semuaDataKategoriPelajaran = this.getKategoriPelajaranFromLocalStorage();

        const dataBaruKategoriPelajaran = new Category(id, name);

        semuaDataKategoriPelajaran.push(dataBaruKategoriPelajaran);

        this.saveKategoriPelajaranToLocalStorage(semuaDataKategoriPelajaran);
        alert("Berhasil Menambahkan kategori pelajaran");
      } else {
        this.editKategoriPelajaran(oldId, name);
        alert("Berhasil update kategori pelajaran")
      }
    } catch (error) { 
      console.error("Error while adding kategori pelajaran: ", error);
    }
  }

  generateKategoriPelajaranId() {
    const timestamp = Date.now().toString().slice(-6);
    return `KAT-${timestamp}`;
  }

  deleteKategoriPelajaran(id) {
    try {
      if (!id) {
        throw new Error("invalid ID, ID are required.");
      }
      console.log(id)

      const allDataCategory = this.getKategoriPelajaranFromLocalStorage()
      let category = allDataCategory.filter(e => {
        e.category_id == id
      })

      console.log(category)

      let validate = confirm("Yakin ingin menghapus Category:", id)
      if (validate) {
        let semuaDataKategoriPelajaran =
          this.getKategoriPelajaranFromLocalStorage();
  
        semuaDataKategoriPelajaran = semuaDataKategoriPelajaran.filter(
          (data) => data.category_id !== id
        );
  
        this.saveKategoriPelajaranToLocalStorage(semuaDataKategoriPelajaran);
  
        alert("Data berhasil dihapus.");
      }
    } catch (error) {
      console.error("Error while deleting kategori pelajaran: ", error);
    }
  }

  editKategoriPelajaran(id, newName) {
    try {
      if (!id) {
        throw new Error("invalid ID, ID are required");
      }

      let semuaDataKategoriPelajaran =
        this.getKategoriPelajaranFromLocalStorage();

      let editDataKategoriPelajaran = semuaDataKategoriPelajaran.filter(
        (data) => data.category_id === id
      );

      editDataKategoriPelajaran[0].category_name = newName;

      this.saveKategoriPelajaranToLocalStorage(semuaDataKategoriPelajaran);
    } catch (error) {
      console.Error("Error while editing kategori pelajaran: ", error);
    }
  }
}

export { Category };
