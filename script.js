// ===== LISTA INICIAL DE EQUIPAMENTOS =====
let equipamentos = [
  {
    data: "",
    placa: "Caminhão Brook 10 Ton (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Caminhão Pipa - 10.000L C/Ajudante (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Caminhão Pipa - 16.000L (Diurno 2x2 12h)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Caminhão Alto Vácuo C/Ajudante - 1 (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Vassoura Mecânica S/Ajudante (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Trator D 6 R (4x4 24h)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Escavadeira 318 Com Clam Shell (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Pá Carregadeira - CAT 950 (4X4 24h)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Manipulador 4,5 Ton - (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Empilhadeira 2,5 Ton - (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Empilhadeira 7,0 Ton - (Adm)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
  {
    data: "",
    placa: "Retro Escavadeira (Diurno 2x2 12h)",
    status: "Liberado",
    observacoes: "",
    horarioInicio: "",
    horarioChegada: "",
    horarioSaida: "",
    bomDiaTodo: false,
  },
];

let editIndex = null;
const tabela = document.getElementById("tabelaBody");

// Inputs
const dataInput = document.getElementById("data");
const placaInput = document.getElementById("placa");
const statusInput = document.getElementById("status");
const observacoesInput = document.getElementById("observacoes");
const horarioInicioInput = document.getElementById("horarioInicio");
const horarioChegadaInput = document.getElementById("horarioChegada");
const horarioSaidaInput = document.getElementById("horarioSaida");
const bomDiaTodoInput = document.getElementById("bomDiaTodo");

// ===== LOGIN =====
function login() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("senha").value;

  if (user === "pedro" && pass === "pimenta") {
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
  const manutencao = equipamentos.filter(
    (e) => e.status === "Em Manutenção",
  ).length;
  const pendente = equipamentos.filter((e) => e.status === "Pendente").length;

  document.getElementById("total").innerText = totalOperantes;
  document.getElementById("manutencao").innerText = manutencao;
  document.getElementById("pendente").innerText = pendente;
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
      <td data-label="Horário Início">${item.horarioInicio}</td>
      <td data-label="Horário Chegada">${item.horarioChegada}</td>
      <td data-label="Horário Saída">${item.horarioSaida}</td>
      <td data-label="Equipamento OK"><input type="checkbox" disabled ${item.bomDiaTodo ? "checked" : ""}></td>
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
      data: dataInput.value,
      placa: placaInput.value,
      status: statusInput.value,
      observacoes: observacoesInput.value,
      horarioInicio: horarioInicioInput.value,
      horarioChegada: horarioChegadaInput.value,
      horarioSaida: horarioSaidaInput.value,
      bomDiaTodo: bomDiaTodoInput.checked,
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
  dataInput.value = item.data;
  placaInput.value = item.placa;
  statusInput.value = item.status;
  observacoesInput.value = item.observacoes;
  horarioInicioInput.value = item.horarioInicio;
  horarioChegadaInput.value = item.horarioChegada;
  horarioSaidaInput.value = item.horarioSaida;
  bomDiaTodoInput.checked = item.bomDiaTodo;
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

// ===== EXPORTAR CSV =====
function exportarCSV() {
  if (equipamentos.length === 0) {
    alert("Nenhum dado para exportar!");
    return;
  }

  const header = [
    "Data",
    "Placa",
    "Status",
    "Observacoes",
    "Horário Início",
    "Horário Chegada",
    "Horário Saída",
    "Equipamento OK",
  ];
  const csvContent = [
    header.join(";"),
    ...equipamentos.map((e) =>
      [
        e.data,
        e.placa,
        e.status,
        e.observacoes,
        e.horarioInicio,
        e.horarioChegada,
        e.horarioSaida,
        e.bomDiaTodo ? "OK" : "",
      ].join(";"),
    ),
  ].join("\n");

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
window.addEventListener("load", () => {
  if (localStorage.getItem("logado") === "true") {
    iniciarSistema();
  } else {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("app").style.display = "none";
  }
});
