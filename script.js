// ===== LISTA INICIAL DE EQUIPAMENTOS =====
let equipamentos = [
  {
    data: "",
    placa: "Caminhão Brook 10 Ton (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Caminhão Pipa - 10.000L C/Ajudante (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Caminhão Pipa - 16.000L (Diurno 2x2 12h)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Caminhão Alto Vácuo C/Ajudante - 1 (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Vassoura Mecânica S/Ajudante (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Trator D 6 R (4x4 24h)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Escavadeira 318 Com Clam Shell (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Pá Carregadeira - CAT 950 (4X4 24h)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Manipulador 4,5 Ton - (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Empilhadeira 2,5 Ton - (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Empilhadeira 7,0 Ton - (Adm)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
  {
    data: "",
    placa: "Retro Escavadeira (Diurno 2x2 12h)",
    status: "Liberado",
    observacoes: "",
    horario: "",
  },
];

let editIndex = null;

const tabela = document.getElementById("tabelaBody");

// Inputs
const data = document.getElementById("data");
const placa = document.getElementById("placa");
const status = document.getElementById("status");
const observacoes = document.getElementById("observacoes");
const horario = document.getElementById("horario");

// ===== LOGIN =====
function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("senha").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("logado", "true");
    iniciarSistema();
  } else {
    alert("Usuário ou senha incorretos");
  }
}

function logout() {
  localStorage.removeItem("logado");
  location.reload();
}

// ===== SISTEMA =====
function iniciarSistema() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
  carregar();
}

// ===== LOCAL STORAGE =====
function salvar() {
  localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
}

function carregar() {
  const dados = localStorage.getItem("equipamentos");
  if (dados) equipamentos = JSON.parse(dados);
  render();
}

// ===== DASHBOARD =====
function atualizarDashboard() {
  const totalOperantes = equipamentos.filter(
    (e) => e.status === "Liberado",
  ).length;
  document.getElementById("total").innerText = totalOperantes;
  document.getElementById("manutencao").innerText = equipamentos.filter(
    (e) => e.status === "Em Manutenção",
  ).length;
  document.getElementById("pendente").innerText = equipamentos.filter(
    (e) => e.status === "Pendente",
  ).length;
}

// ===== TABELA =====
function render() {
  tabela.innerHTML = "";
  equipamentos.forEach((item, index) => {
    let statusClass = "";
    if (item.status === "Liberado") statusClass = "status-liberado";
    if (item.status === "Em Manutenção") statusClass = "status-manutencao";
    if (item.status === "Pendente") statusClass = "status-pendente";

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td data-label="Data">${item.data}</td>
      <td data-label="Placa">${item.placa}</td>
      <td data-label="Status" class="${statusClass}">${item.status}</td>
      <td data-label="Obs">${item.observacoes}</td>
      <td data-label="Hora">${item.horario}</td>
      <td data-label="Ações">
        <button onclick="editar(${index})">Editar</button>
        <button onclick="excluir(${index})">Excluir</button>
      </td>
    `;
    tabela.appendChild(linha);
  });

  atualizarDashboard();
  atualizarGrafico();
}

// ===== FORMULÁRIO =====
document
  .getElementById("formEquipamento")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const equipamento = {
      data: data.value,
      placa: placa.value,
      status: status.value,
      observacoes: observacoes.value,
      horario: horario.value,
    };

    if (editIndex === null) {
      equipamentos.push(equipamento);
    } else {
      equipamentos[editIndex] = equipamento;
      editIndex = null;
    }

    salvar();
    render();
    this.reset();
  });

// ===== EDITAR / EXCLUIR =====
function editar(index) {
  const item = equipamentos[index];
  data.value = item.data;
  placa.value = item.placa;
  status.value = item.status;
  observacoes.value = item.observacoes;
  horario.value = item.horario;
  editIndex = index;
}

function excluir(index) {
  equipamentos.splice(index, 1);
  salvar();
  render();
}

// ===== GRÁFICO =====
const ctxStatus = document.getElementById("statusChart").getContext("2d");
let statusChart = new Chart(ctxStatus, {
  type: "pie",
  data: {
    labels: ["Liberado", "Em Manutenção", "Pendente"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#28a745", "#fd7e14", "#dc3545"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 12 }, boxWidth: 12, padding: 10 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.parsed + " equipamentos";
          },
        },
      },
    },
  },
});

function atualizarGrafico() {
  const liberado = equipamentos.filter((e) => e.status === "Liberado").length;
  const manutencao = equipamentos.filter(
    (e) => e.status === "Em Manutenção",
  ).length;
  const pendente = equipamentos.filter((e) => e.status === "Pendente").length;

  statusChart.data.datasets[0].data = [liberado, manutencao, pendente];
  statusChart.update();
}

// ===== EXPORTAR CSV COM UTF-8 BOM =====
function exportarCSV() {
  if (equipamentos.length === 0) {
    alert("Nenhum dado para exportar!");
    return;
  }

  const header = ["Data", "Placa", "Status", "Observacoes", "Horario"];
  const csvContent = [
    header.join(";"),
    ...equipamentos.map((e) =>
      [e.data, e.placa, e.status, e.observacoes, e.horario].join(";"),
    ),
  ].join("\n");

  // Adiciona BOM UTF-8 para Excel
  const bom = "\uFEFF";
  const blob = new Blob([bom + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "equipamentos.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ===== LOGIN SALVO =====
if (localStorage.getItem("logado") === "true") {
  iniciarSistema();
}
