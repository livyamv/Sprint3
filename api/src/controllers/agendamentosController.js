const connect_database = require("../db/connect_database");

module.exports = class agendamentoController {
  // Criação de um agendamento
  static async createAgend(req, res) {
    const { fk_id_usuario, fk_id_sala, descricao_agend, inicio_periodo, fim_periodo } = req.body;

    // Validação dos campos obrigatórios
    if (!fk_id_usuario || !fk_id_sala || !descricao_agend || !inicio_periodo || !fim_periodo) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    }

    // Verifica se já existe agendamento para a sala no horário
    const checkQuery = `SELECT * FROM agendamentos WHERE fk_id_sala = ? AND 
                        ((inicio_periodo BETWEEN ? AND ?) OR (fim_periodo BETWEEN ? AND ?))`;
    const checkValues = [fk_id_sala, inicio_periodo, fim_periodo, inicio_periodo, fim_periodo];

    try {
      connect.query(checkQuery, checkValues, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao verificar disponibilidade da sala!" });
        }
        if (results.length > 0) {
          return res.status(400).json({ error: "A sala já está reservada nesse horário!" });
        }

        // Inserir o novo agendamento
        const query = `INSERT INTO agendamentos (fk_id_usuario, fk_id_sala, descricao_agend, inicio_periodo, fim_periodo) 
                       VALUES (?, ?, ?, ?, ?)`;
        const values = [fk_id_usuario, fk_id_sala, descricao_agend, inicio_periodo, fim_periodo];

        connect.query(query, values, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Erro ao criar o agendamento!" });
          }
          return res.status(201).json({ message: "Agendamento criado com sucesso!" });
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
      connect.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao buscar agendamentos!" });
        }
        return res.status(200).json({ message: "Agendamentos listados com sucesso!", agendamentos: results });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  // Atualizar um agendamento
  static async updateAgend(req, res) {
    const { id_agendamentos, fk_id_usuario, fk_id_sala, descricao_agend, inicio_periodo, fim_periodo } = req.body;

    // Validação dos campos obrigatórios
    if (!id_agendamentos || !fk_id_usuario || !fk_id_sala || !descricao_agend || !inicio_periodo || !fim_periodo) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    }

    // Verifica se já existe agendamento para a sala no horário
    const checkQuery = `SELECT * FROM agendamentos WHERE fk_id_sala = ? AND id_agendamentos != ? AND
                        ((inicio_periodo BETWEEN ? AND ?) OR (fim_periodo BETWEEN ? AND ?))`;
    const checkValues = [fk_id_sala, id_agendamentos, inicio_periodo, fim_periodo, inicio_periodo, fim_periodo];

    try {
      connect.query(checkQuery, checkValues, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao verificar disponibilidade da sala!" });
        }
        if (results.length > 0) {
          return res.status(400).json({ error: "A sala já está reservada nesse horário!" });
        }

        // Atualizar o agendamento
        const query = `UPDATE agendamentos SET fk_id_usuario = ?, fk_id_sala = ?, descricao_agend = ?, inicio_periodo = ?, fim_periodo = ? 
                       WHERE id_agendamentos = ?`;
        const values = [fk_id_usuario, fk_id_sala, descricao_agend, inicio_periodo, fim_periodo, id_agendamentos];

        connect.query(query, values, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Erro ao atualizar o agendamento!" });
          }
          if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Agendamento não encontrado!" });
          }
          return res.status(200).json({ message: "Agendamento atualizado com sucesso!" });
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
      connect.query(query, idAgendamento, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao excluir o agendamento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Agendamento não encontrado!" });
        }
        return res.status(200).json({ message: "Agendamento excluído com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar a consulta!", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

};
