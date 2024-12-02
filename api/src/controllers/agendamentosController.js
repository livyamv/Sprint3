const connect_database = require("../db/connect_database");

module.exports = class agendamentoController {
  // Criação de um agendamento
  static async createAgend(req, res) {
    //dados de entrada
    const {
      fk_id_usuario,
      fk_id_sala,
      descricao_agend,
      inicio_periodo,
      fim_periodo,
    } = req.body;

    // Varifica se todos campos obrigatórios foram preenchidos
    if (
      !fk_id_usuario ||
      !fk_id_sala ||
      !descricao_agend ||
      !inicio_periodo ||
      !fim_periodo
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    // Converte as datas e horários de início e fim para objetos Date
    const inicio = new Date(inicio_periodo);
    const fim = new Date(fim_periodo);

    // Define os horários de limite (7h00 e 21h00)
    const limiteInicio = new Date(inicio); //criado um objeto Date para cada limite do inicio
    limiteInicio.setHours(7, 0, 0, 0); //limite do inicio
    const limiteFim = new Date(inicio);
    limiteFim.setHours(21, 0, 0, 0); //limite do fim

    // Verifica se o horário de início e fim estão dentro do intervalo permitido (7h - 21h)
    if (inicio < limiteInicio || inicio >= limiteFim) {
      return res
        .status(400)
        .json({ error: "O horário de início deve ser entre 07:00 e 21:00!" });
    }

    //verifica se o fim é menor ou igual ao inicio ou se o fim é maior que o limite dele
    if (fim <= inicio || fim > limiteFim) {
      return res.status(400).json({
        error:
          "O horário de término deve ser entre 07:00 e 21:00 e não pode ser antes do horário de início!",
      });
    }

    // Verifica se já existe agendamento para a sala no horário
    const checkQuery = `SELECT * 
    FROM agendamentos
    WHERE fk_id_sala = ? 
      AND (
        (inicio_periodo < ? AND fim_periodo > ?) OR 
        (inicio_periodo >= ? AND inicio_periodo < ?) OR
        (fim_periodo > ? AND fim_periodo <= ?) 
      )`;

    const checkValues = [
      fk_id_sala,
      inicio_periodo,
      fim_periodo,
      inicio_periodo,
      fim_periodo,
      inicio_periodo,
      fim_periodo,
    ];

    try {
      //erro na execução da consulta do banco de dados
      connect_database.query(checkQuery, checkValues, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao verificar disponibilidade da sala!" });
        }
        //caso a sala já esteja reservada no horário
        if (results.length > 0) {
          return res
            .status(400)
            .json({ error: "A sala já está reservada nesse horário!" });
        }
        //checar se o inicio esta maior que o fim
        if (inicio_periodo > fim_periodo) {
          return res.status(400).json({
            error: "O horário de inicio é maior que o horário de fim!",
          });
        }
        //checar que o inicio é igual a o fim
        if (inicio_periodo === fim_periodo) {
          return res.status(400).json({ error: "Os horários estão iguais!" });
        }
        const limite_hora = 1000 * 60 * 60; //1 hora em milesegundos
        if (new Date(fim_periodo) - new Date(inicio_periodo) > limite_hora) {
          // ve se o fim do periodo e o inicio é maior que o limite da hora em milisegundos
          return res.status(400).json({
            error:
              "A sua reserva excede o tempo máximo de agendamento(1 hora), se necessário faça uma segunda reserva!",
          });
        }

        // Inserir o novo agendamento
        const query = `INSERT INTO agendamentos (fk_id_usuario, fk_id_sala, descricao_agend, inicio_periodo, fim_periodo) 
                       VALUES (?, ?, ?, ?, ?)`;
        const values = [
          fk_id_usuario,
          fk_id_sala,
          descricao_agend,
          inicio_periodo,
          fim_periodo,
        ];
        //se haver erro ao executar a consulta com o banco de dados
        connect_database.query(query, values, (err) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Erro ao criar o agendamento!" });
          }
          return res
            .status(201)
            .json({ message: "Agendamento criado com sucesso!" });
        });
      });
      //erro fora da consulta do banco
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  // Visualizar todos os agendamentos
  static async getAllAgend(req, res) {
    const query = `SELECT * FROM agendamentos`;

    try {
      //se a consulta for executada com erros
      connect_database.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao buscar agendamentos!" });
        }
        return res.status(200).json({
          message: "Agendamentos listados com sucesso!",
          agendamentos: results,
        });
      });
      //erro fora da consulta do banco de dados
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  // Atualizar um agendamento
  static async updateAgend(req, res) {
    const {
      id_agendamentos,
      fk_id_usuario,
      fk_id_sala,
      descricao_agend,
      inicio_periodo,
      fim_periodo,
    } = req.body;

    // Validação dos campos obrigatórios
    if (
      !id_agendamentos ||
      !fk_id_usuario ||
      !fk_id_sala ||
      !descricao_agend ||
      !inicio_periodo ||
      !fim_periodo
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!" });
    }

    // Converte os horários de início e fim para objetos Date
    const inicio = new Date(inicio_periodo);
    const fim = new Date(fim_periodo);

    // Define os horários de limite (7h00 e 21h00)
    const limiteInicio = new Date(inicio); //criado um objeto Date para cada limite do inicio
    limiteInicio.setHours(7, 0, 0, 0); //limite do inicio
    const limiteFim = new Date(inicio); //criado um objeto Date para cada limite do fim
    limiteFim.setHours(21, 0, 0, 0); //limite do fim

    // Verifica se o horário de início e fim estão dentro do intervalo permitido (7h - 21h)
    if (inicio < limiteInicio || inicio >= limiteFim) {
      return res
        .status(400)
        .json({ error: "O horário de início deve ser entre 07:00 e 21:00!" });
    }
    //verifica se o fim é menor ou igual ao inicio ou se o fim é maior que o limite dele
    if (fim <= inicio || fim > limiteFim) {
      return res.status(400).json({
        error:
          "O horário de término deve ser entre 07:00 e 21:00 e não pode ser antes do horário de início!",
      });
    }

    // Verificar a disponibilidade da sala
    const checkQuery = `SELECT * FROM agendamentos WHERE fk_id_sala = ? AND id_agendamentos != ? AND
                        ((inicio_periodo BETWEEN ? AND ?) OR (fim_periodo BETWEEN ? AND ?))`;
    const checkValues = [
      fk_id_sala,
      id_agendamentos,
      inicio_periodo,
      fim_periodo,
      inicio_periodo,
      fim_periodo,
    ];

    try {
      //erro na execução da consulta do banco de dados
      connect_database.query(checkQuery, checkValues, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao verificar disponibilidade da sala!" });
        }
        //caso a sala já esteja reservada no horário
        if (results.length > 0) {
          return res
            .status(400)
            .json({ error: "A sala já está reservada nesse horário!" });
        }
        //checar se o inicio esta maior que o fim
        if (inicio_periodo > fim_periodo) {
          return res.status(400).json({
            error: "O horário de inicio é maior que o horário de fim!",
          });
        }
        //checar que o inicio é igual a o fim
        if (inicio_periodo === fim_periodo) {
          return res.status(400).json({ error: "Os horários estão iguais!" });
        }
        const limite_hora = 1000 * 60 * 60; //1 hora em milesegundos
        if (new Date(fim_periodo) - new Date(inicio_periodo) > limite_hora) {
          // ve se o fim do periodo e o inicio é maior que o limite da hora em milisegundos
          return res.status(400).json({
            error:
              "A sua reserva excede o tempo máximo de agendamento(1 hora), se necessário faça uma segunda reserva!",
          });
        }

        // Atualizar o agendamento
        const query = `UPDATE agendamentos SET fk_id_usuario = ?, fk_id_sala = ?, descricao_agend = ?, inicio_periodo = ?, fim_periodo = ? 
                       WHERE id_agendamentos = ?`;
        const values = [
          fk_id_usuario,
          fk_id_sala,
          descricao_agend,
          inicio_periodo,
          fim_periodo,
          id_agendamentos,
        ];
        //se a consulta com o banco for executada com erros
        connect_database.query(query, values, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Erro ao atualizar o agendamento!" });
          }
          //se alguma linha do código não for encontrada
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ error: "Agendamento não encontrado!" });
          }
          //se der tudo certo o agendamento é atualizado
          return res
            .status(200)
            .json({ message: "Agendamento atualizado com sucesso!" });
        });
      });
      //se ocorrer qualquer outro erro fora da consulta do banco sera capturado
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  // Excluir um agendamento
  static async deleteAgend(req, res) {
    const idAgendamento = req.params.id;

    const query = `DELETE FROM agendamentos WHERE id_agendamentos = ?`;

    try {
      //se a consulta com o banco for executada com erros
      connect_database.query(query, idAgendamento, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao excluir o agendamento!" });
        }
        //se o resultado da consulta não for encontrado
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Agendamento não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Agendamento excluído com sucesso!" });
      });
      //erro fora da consulta do banco
    } catch (error) {
      console.log("Erro ao executar a consulta!", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }
};
