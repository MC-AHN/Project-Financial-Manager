import { Datas } from "../Model/datas.js";

const datass = new Datas()
const nilai = await datass.getData()

const type = "income"

const nilai2 = nilai.filter((d) => {
    return d.type == type
})

const nilai3 = nilai.filter((d) => {
    return d.type != type
})


let number = 0
nilai2.forEach(e => {
    number += e.total
});

let number2 = 0 
nilai3.forEach(e => {
    number2 += e.total
})
console.log("this type", type, "and this data", nilai)

const incomeData = {
    labels: ['Income', 'Expenses'],
    datasets: [{
        data: [number, number2], // Contoh: 95% pendapatan
        backgroundColor: ['#40964d', '#b8645f'],
        borderWidth: 2,
        borderColor: '#525863'
    }]
};

// Konfigurasi untuk Diagram Pendapatan
const incomeConfig = {
    type: 'doughnut',
    data: incomeData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '0%',
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Pendapatan',
                padding: 0
            }
        }
    }
};

// Buat Diagram Pendapatan
const incomeChart = new Chart(
    document.getElementById('income'),
    incomeConfig
);