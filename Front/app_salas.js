/*O window é um objeto global no JavaScript que representa a janela ou aba do navegador onde a página está carregada.
Ele é automaticamente criado pelo navegador e está disponível em qualquer script que você escreva em páginas web.
O window serve como o contêiner principal para tudo relacionado à página,
incluindo o documento HTML (representado por document), o histórico de navegação, os timers, o localStorage, e muito mais.*/

/*"window.location.pathname" retorna o nome do caminho do arquivo html da página em forma de string.
Portanto, é utilizado o metódo .split para separar cada parte entre barras na url e colocar cada uma delas em uma posição de um array.
Depois, usa-se o método .pop para criar um array com apenas a última posição do array anterior, que será o nome do arquivo html*/
const pagina_atual = window.location.pathname.split("/").pop();

//esses if's permitem que este arquivo js rode apenas o "addEventListener" necessário para a página em que o usuário estiver.

if (pagina_atual === "blocoA.html") {
  document.addEventListener("DOMContentLoaded", getBlocoA);
} else if (pagina_atual === "blocoB.html") {
  document.addEventListener("DOMContentLoaded", getBlocoB);
} else if (pagina_atual === "blocoC.html") {
  document.addEventListener("DOMContentLoaded", getBlocoC);
} else if (pagina_atual === "blocoD.html") {
  document.addEventListener("DOMContentLoaded", getBlocoD);
}

function getBlocoA() {
  fetch("http://10.89.240.80:5000/Agenda-Senai/api/v1/blocoa", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const lista_salas = document.getElementById("tabela-blocoa");
      lista_salas.innerHTML = "";
      data.sala.forEach((sala) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const td_nome = document.createElement("td");
        td_nome.textContent = sala.nome_sala;
        tr.appendChild(td_nome);

        const descricao_sala = document.createElement("td");
        descricao_sala.textContent = sala.descricao_sala;
        tr.appendChild(descricao_sala);

        const capacidade = document.createElement("td");
        capacidade.textContent = sala.capacidade;
        tr.appendChild(capacidade);

        //Adiciona a linha à tabela
        lista_salas.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter a lista das salas: " + error.message);
      console.error("Erro: ", error.message);
    });
}

function getBlocoB() {
<<<<<<< HEAD
  fetch("http://10.89.240.80:5000/Agenda-Senai/api/v1/blocob", {
=======
  fetch("http://localhost:5000/Agenda-Senai/api/v1/blocob", {
>>>>>>> 5100d94ece309d3f21d0eb66e92fa0beac14e4e6
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const lista_salas = document.getElementById("tabela-blocob");
      lista_salas.innerHTML = "";
      data.sala.forEach((sala) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const td_nome = document.createElement("td");
        td_nome.textContent = sala.nome_sala;
        tr.appendChild(td_nome);

        const descricao_sala = document.createElement("td");
        descricao_sala.textContent = sala.descricao_sala;
        tr.appendChild(descricao_sala);

        const capacidade = document.createElement("td");
        capacidade.textContent = sala.capacidade;
        tr.appendChild(capacidade);

        //Adiciona a linha à tabela
        lista_salas.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter a lista das salas: " + error.message);
      console.error("Erro: ", error.message);
    });
}

function getBlocoC() {
<<<<<<< HEAD
  fetch("http://10.89.240.80:5000/Agenda-Senai/api/v1/blococ", {
=======
  fetch("http://localhost:5000/Agenda-Senai/api/v1/blococ", {
>>>>>>> 5100d94ece309d3f21d0eb66e92fa0beac14e4e6
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const lista_salas = document.getElementById("tabela-blococ");
      lista_salas.innerHTML = "";
      data.sala.forEach((sala) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const td_nome = document.createElement("td");
        td_nome.textContent = sala.nome_sala;
        tr.appendChild(td_nome);

        const descricao_sala = document.createElement("td");
        descricao_sala.textContent = sala.descricao_sala;
        tr.appendChild(descricao_sala);

        const capacidade = document.createElement("td");
        capacidade.textContent = sala.capacidade;
        tr.appendChild(capacidade);

        //Adiciona a linha à tabela
        lista_salas.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter a lista das salas: " + error.message);
      console.error("Erro: ", error.message);
    });
}

function getBlocoD() {
<<<<<<< HEAD
  fetch("http://10.89.240.80:5000/Agenda-Senai/api/v1/blocod", {
=======
  fetch("http://localhost:5000/Agenda-Senai/api/v1/blocod", {
>>>>>>> 5100d94ece309d3f21d0eb66e92fa0beac14e4e6
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const lista_salas = document.getElementById("tabela-blocod");
      lista_salas.innerHTML = "";
      data.sala.forEach((sala) => {
        //Cria uma nova linha
        const tr = document.createElement("tr");

        //Cria células para nome, cpf e email
        const td_nome = document.createElement("td");
        td_nome.textContent = sala.nome_sala;
        tr.appendChild(td_nome);

        const descricao_sala = document.createElement("td");
        descricao_sala.textContent = sala.descricao_sala;
        tr.appendChild(descricao_sala);

        const capacidade = document.createElement("td");
        capacidade.textContent = sala.capacidade;
        tr.appendChild(capacidade);

        //Adiciona a linha à tabela
        lista_salas.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter a lista das salas: " + error.message);
      console.error("Erro: ", error.message);
    });
}

// document.addEventListener("DOMContentLoaded", getAllSalas);

// function getAllSalas(){
//   fetch("http://10.89.240.80:5000/Agenda-Senai/api/v1/sala", {
//       method: "GET",
//       headers: {
//           "Content-Type": "application/json",
//       }
//   })
//     .then((response) => {
//       if (response.ok) {
//           return response.json();
//         }
//         return response.json().then((err) => {
//           throw new Error(err.error);
//         });
//     })
//       .then((data) => {
//           const lista_salas = document.getElementById("tabela-salas-body");
//           lista_salas.innerHTML = "";
//           console.log(data);
//           data.events.forEach((events) => {
//                 //Cria uma nova linha
//               const tr = document.createElement("tr");

//               //Cria células para nome, cpf e email
//               const td_nome = document.createElement("td");
//               td_nome.textContent = events.nome_sala;
//               tr.appendChild(td_nome);

//               const descricao_sala = document.createElement("td");
//               descricao_sala.textContent = events.descricao_sala;
//               tr.appendChild(descricao_sala);

//               const capacidade = document.createElement("td");
//               capacidade.textContent = events.capacidade;
//               tr.appendChild(capacidade);

//               //Adiciona a linha à tabela
//               lista_salas.appendChild(tr);
//           });
//       }).catch((error) => {
//           alert("Erro ao obter a lista das salas: " + error.message);
//           console.error("Erro: ", error.message);
//         });
// }
