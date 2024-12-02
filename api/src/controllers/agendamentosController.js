const connect_database = require("../db/connect_database");

module.exports = class agendamentoController {
  // Criação de um agendamento
  static async createAgend(req, res) {
    const {
      fk_id_usuario,
      fk_id_sala,
      descricao_agend,
      inicio_periodo,
      fim_periodo,
    } = req.body;

    // Validação dos campos obrigatórios
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

    // Converte os horários de início e fim para objetos Date
    const inicio = new Date(inicio_periodo);
    const fim = new Date(fim_periodo);

    // Define os horários de limite (7h00 e 21h00)
    const limiteInicio = new Date(inicio);
    limiteInicio.setHours(7, 0, 0, 0); //limite do inicio
    const limiteFim = new Date(inicio);
    limiteFim.setHours(21, 0, 0, 0); //limite do fim

    // Verifica se o horário de início e fim estão dentro do intervalo permitido (7h - 21h)
    if (inicio < limiteInicio || inicio >= limiteFim) {
      return res
        .status(400)
        .json({ error: "O horário de início deve ser entre 07:00 e 21:00!" });
    }

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
      connect_database.query(checkQuery, checkValues, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao verificar disponibilidade da sala!" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ error: "A sala já está reservada nesse horário!" });
        }
        if (inicio_periodo > fim_periodo) {
          return res.status(400).json({
            error: "O horário de inicio é maior que o horário de fim!",
          });
        }
        if (inicio_periodo === fim_periodo) {
          return res.status(400).json({ error: "Os horários estão iguais!" });
        }
        const limite_hora = 1000 * 60 * 60; //1 hora em milesegundos
        if (new Date(fim_periodo) - new Date(inicio_periodo) > limite_hora) {
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
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  // Visualizar todos os agendamentos
  static async getAllAgend(req, res) {
    const query = `SELECT * FROM agendamentos`;

    try {
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
    const limiteInicio = new Date(inicio);
    limiteInicio.setHours(7, 0, 0, 0); //limite do inicio
    const limiteFim = new Date(inicio);
    limiteFim.setHours(21, 0, 0, 0); //limite do fim

    // Verifica se o horário de início e fim estão dentro do intervalo permitido (7h - 21h)
    if (inicio < limiteInicio || inicio >= limiteFim) {
      return res
        .status(400)
        .json({ error: "O horário de início deve ser entre 07:00 e 21:00!" });
    }

    if (fim <= inicio || fim > limiteFim) {
      return res.status(400).json({
        error:
          "O horário de término deve ser entre 07:00 e 21:00 e não pode ser antes do horário de início!",
      });
    }

    // Verifica se já existe agendamento para a sala no horário
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
      connect_database.query(checkQuery, checkValues, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao verificar disponibilidade da sala!" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ error: "A sala já está reservada nesse horário!" });
        }

        if (inicio_periodo > fim_periodo) {
          return res.status(400).json({
            error: "O horário de inicio é maior que o horário de fim!",
          });
        }
        if (inicio_periodo === fim_periodo) {
          return res.status(400).json({ error: "Os horários estão iguais!" });
        }
        const limite_hora = 1000 * 60 * 60; //1 hora em milesegundos
        if (new Date(fim_periodo) - new Date(inicio_periodo) > limite_hora) {
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

        connect_database.query(query, values, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Erro ao atualizar o agendamento!" });
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ error: "Agendamento não encontrado!" });
          }
          return res
            .status(200)
            .json({ message: "Agendamento atualizado com sucesso!" });
        });
      });
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
      connect_database.query(query, idAgendamento, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Erro ao excluir o agendamento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Agendamento não encontrado!" });
        }
        return res
          .status(200)
          .json({ message: "Agendamento excluído com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar a consulta!", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }
};
