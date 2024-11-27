document.addEventListener("DOMContentLoaded", );

function getAllSalas(){
    fetch("http://localhost:5000/Agenda-Senai/api/v1/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
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
            const lista_salas = document.getElementById("tabela-salas-body");
            lista_salas.innerHTML = "";
            data.sala.forEach((sala) => {
                  //Cria uma nova linha
                const tr = document.createElement("tr");

                //Cria células para nome, cpf e email
                const td_nome = document.createElement("td");
                td_nome.textContent = sala.name;
                tr.appendChild(td_nome);

                const descricao_sala = document.createElement("td");
                descricao_sala.textContent = sala.cpf;
                tr.appendChild(descricao_sala);

                const capacidade = document.createElement("td");
                capacidade.textContent = sala.email;
                tr.appendChild(capacidade);

                const tdData_nascimento = document.createElement("td");
                tdData_nascimento.textContent = sala.data_nascimento;
                tr.appendChild(tdData_nascimento);

                //Adiciona a linha à tabela
                lista_salas.appendChild(tr);
            });
        }).catch((error) => {
            alert("Erro ao obter a lista das salas: " + error.message);
            console.error("Erro: ", error.message);
          });
}