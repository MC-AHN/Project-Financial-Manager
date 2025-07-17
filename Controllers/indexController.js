import { Datas } from "../Model/datas.js";

const datass = new Datas();

// Fungsi untuk memperbarui chart berdasarkan filter yang dipilih
async function updateChart() {
  let numberIncome = 0;
  let numberExpenses = 0;
  const type = "income";

  const Dataa = await datass.getData();
  let allData = Dataa;

  const hari = new Date();
  const sehari = new Date(hari);
  sehari.setDate(hari.getDate() - 1);

  const seminggu = new Date();
  seminggu.setDate(hari.getDate() - 7)

  const sebulan = new Date(hari);
  sebulan.setMonth(hari.getMonth() - 1);

  const setahun = new Date(hari);
  setahun.setFullYear(hari.getFullYear() - 1);

  const selectedFilterRadio = document.querySelector(
    'input[name="pilihanA"]:checked'
  );
  const filterOptionValue = selectedFilterRadio
    ? selectedFilterRadio.value
    : null;

  if (filterOptionValue === "oneDay") {
    allData = Dataa.filter((item) => {
      const tanggalItem = new Date(item.date);
      // Untuk membandingkan tanggal saja, abaikan waktu
      tanggalItem.setHours(0, 0, 0, 0); // Set waktu item ke 00:00:00
      hari.setHours(0, 0, 0, 0); // Set waktu hari ini ke 00:00:00

      return tanggalItem.getTime() === hari.getTime(); // Bandingkan timestamp hari ini saja
    });
  } else if (filterOptionValue === "oneWeek") {
    allData = Dataa.filter((item) => {
      const tanggalItem = new Date(item.date);
      return tanggalItem >= seminggu && tanggalItem <= hari; // Bandingkan timestamp hari ini saja
    });
  } else if (filterOptionValue === "oneMonth") {
    allData = Dataa.filter((item) => {
      const tanggalItem = new Date(item.date);
      return tanggalItem >= sebulan && tanggalItem <= hari;
    });
  } else if (filterOptionValue === "oneYear") {
    allData = Dataa.filter((item) => {
      const tanggalItem = new Date(item.date);
      return tanggalItem >= setahun && tanggalItem <= hari;
    });
  }

  const incomeDataFiltered = allData.filter((d) => {
    return d.type == type;
  });

  const expenseDataFiltered = allData.filter((d) => {
    return d.type != type;
  });

  incomeDataFiltered.forEach((e) => {
    numberIncome = numberIncome + parseInt(e.total);
  });

  expenseDataFiltered.forEach((e) => {
    numberExpenses = numberExpenses + parseInt(e.total);
  });

  console.log("Data setelah filter tanggal:", allData);
  console.log("Income Data Filtered:", incomeDataFiltered);
  console.log("Expense Data Filtered:", expenseDataFiltered);

  // --- START: Bagian Baru untuk Menangani Data Kosong ---
  const incomeCanvas = document.getElementById("income");
  const chartContainer = incomeCanvas.parentElement; // Ambil parent div dari canvas

  // Buat atau dapatkan elemen untuk pesan "Tidak ada data"
  let noDataMessage = document.getElementById("noDataMessage");
  if (!noDataMessage) {
    noDataMessage = document.createElement("div");
    noDataMessage.id = "noDataMessage";
    noDataMessage.innerHTML = `
          <div style="text-align: center; padding: 20px; color: #6c757d;">
              <p>Tidak ada data untuk periode ini.</p>
          </div>
`;
    // Masukkan pesan di atas canvas
    chartContainer.insertBefore(noDataMessage, incomeCanvas);
  }

  // Cek apakah ada data income atau expense sama sekali untuk periode yang dipilih
  if (numberIncome === 0 && numberExpenses === 0) {
    // Tidak ada data: sembunyikan canvas dan tampilkan pesan
    incomeCanvas.style.display = "none";
    noDataMessage.style.display = "block";

    // Jika ada chart sebelumnya, hancurkan agar tidak ada sisa-sisa
    const existingChart = Chart.getChart(incomeCanvas);
    if (existingChart) {
      existingChart.destroy();
    }
  } else {
    // Ada data: tampilkan canvas dan sembunyikan pesan
    incomeCanvas.style.display = "block";
    noDataMessage.style.display = "none";

    // Update atau Buat Chart seperti biasa
    const incomeData = {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [numberIncome, numberExpenses],
          backgroundColor: ["#40964d", "#b8645f"],
          borderWidth: 2,
          borderColor: "#525863",
        },
      ],
    };

    if (Chart.getChart(incomeCanvas)) {
      Chart.getChart(incomeCanvas).data = incomeData;
      Chart.getChart(incomeCanvas).update();
    } else {
      const incomeConfig = {
        type: "doughnut",
        data: incomeData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "0%",
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: "Pendapatan",
              padding: 0,
            },
          },
        },
      };
      new Chart(incomeCanvas, incomeConfig);
    }
  }
  // --- END: Bagian Baru untuk Menangani Data Kosong ---
}

// Jalankan saat DOMContentLoaded (pertama kali halaman dimuat)
document.addEventListener("DOMContentLoaded", async () => {
  const filterRadios = document.querySelectorAll('input[name="pilihanA"]');
  filterRadios.forEach((radio) => {
    radio.addEventListener("change", updateChart);
  });

  const defaultRadio = document.getElementById("three");
  if (defaultRadio) {
    // Pastikan ID ini ada di HTML, misalnya: <input id="radioOneMonth" value="oneMonth">
    defaultRadio.checked = true;
  } else {
    // Jika tidak ada default radio, set radio pertama sebagai default atau biarkan null
    if (filterRadios.length > 0) {
      filterRadios[0].checked = true;
    }
  }

  updateChart();
});
