class Datas {
  constructor() {}

  async getData() {
    try {
      return fetch(`https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.json());
    } catch (error) {
      console.error("Error while geting data from request: ", error);
    }
  }

  async postData() {
    try {
      const response = await fetch(
        "https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            type: document.getElementById("type").value,
            total: document.getElementById("total").value,
            category: document.getElementById("category").value,
            date: document.getElementById("date").value,
          }),
        }
      );
      const hasil = await response.json();
      console.log(hasil);
    } catch (error) {
      console.error("Error while posting data: ", error);
    }
  }

  async deleteData(id) {
    try {
      const isConfrim = confirm(
        `Apakah anda yakin ingin menghapus data dengan id ${id}?`
      );

      if (isConfrim) {
        const deleteData = await fetch(
          `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteData.ok) {
          alert(`You can Delete data with id ${id}`);
        } else {
          alert(`Data with id ${id} cannot deleting: ${deleteData.status}`);
        }
      }
    } catch (error) {
      console.error("Error while deleteing data: ", error);
    }
  }

  async editData(id) {
    try {
      try {
        const response = await fetch(
          `https://68258f1d0f0188d7e72d6675.mockapi.io/api/todos/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: document.getElementById("titleB").value,
              description: document.getElementById("descriptionB").value,
              type: document.getElementById("typeB").value,
              total: document.getElementById("totalB").value,
              category: document.getElementById("categoryB").value,
              date: document.getElementById("dateB").value,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error while updating user data", response.status);
        }

        const updateData = await response.json();
        console.log("data Berhasil diupdate: ", updateData);
        alert("Data Berhasil diperbarui");
      } catch (error) {
        console.error("Error while updating user data: ", error);
      }
    } catch (error) {
      console.error("Error while editing data: ", error);
    }
  }
}

export { Datas };
