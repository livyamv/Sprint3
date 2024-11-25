//requere a função de se conectar no banco de dados para ser usada neste arquivo
const connect_database = require("../db/connect_database");

//criação e exportação da classe "agendamentoController" contendo as funções que manipulam os agendamentos no banco de dados.
module.exports = class agendamentoController {
  //função que armazena os dados de um novo usuário no banco de dados.
  static async createAgend(req, res) {
    if ( !fk_id_usuario|| !fk_id_sala || !descricao_agend || !inicio_periodo || !fim_periodo ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser prenchidos!" });
    }

    const query = `insert into evento (descricao_agend, inicio_periodo, fim_periodo) values (?,?,?)`;
    const values = [descricao_agend, inicio_periodo, fim_periodo];
    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar o agendamento!" });
        }
        return res.status(201).json({ message: "Agendamento criado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta:", error); //o programador que irá ver está mensagem
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  //   //lista todos os usuários cadastrados.
  //   static async getAllAgend(req, res) {
  //     const query = `SELECT * FROM agendamentos;`;
  //     try {
  //       connect_database.query(query, function (err, results) {
  //         if (err) {
  //           console.error(err);
  //           console.log(err.code);
  //           return res.status(500).json({
  //             error: " Erro interno do servidor :(",
  //           });
  //         } else {
  //           res.status(200).json({
  //             message: " Lista de todos os usuários:",
  //             usuarios: results,
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: " Erro interno do servidor" });
  //     }
  //   }

  // //função que altera a senha do usuário caso o mesmo o desejar.
  // static async updateAgend(req, res) {
  //   const { id_usuario, senha, nova_senha } = req.body;

  //   //filtragem de dados
  //   if ((!id_usuario, !senha, !nova_senha)) {
  //     res.status(400).json({ error: " todos os campos devem ser preenchidos" });
  //   }
  //   //fim da filtragem

  //   let query = `SELECT * FROM usuario WHERE id_usuario = ?;`;

  //   try {
  //     //encontra a senha atual do usuário pelo seu id e descobre se a senha que ele digitou coincide
  //     connect_database.query(query, [id_usuario], function (err, results) {
  //       if (err) {
  //         console.error(err);
  //         console.log(err.code);
  //         return res.status(500).json({
  //           error: " Erro interno do servidor :(",
  //         });
  //       }
  //       if (results[0].senha !== senha) {
  //         return res.status(400).json({
  //           error: " senha incorreta",
  //         });
  //       } else {
  //         //substitui (atualiza) a senha do usuário pela nova senha digitada por ele.
  //         query = `UPDATE usuario SET senha = ? WHERE id_usuario = ?;`;

  //         connect_database.query(
  //           query,
  //           [nova_senha, id_usuario],
  //           function (err, results) {
  //             if (err) {
  //               console.error(err);
  //               console.log(err.code);
  //               return res.status(500).json({
  //                 error: " Erro interno do servidor :(",
  //               });
  //             }
  //             return res
  //               .status(200)
  //               .json({ message: " Senha alterada com sucesso" });
  //           }
  //         );
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: " Erro interno do servidor" });
  //   }
  // }

  // //remove a conta de um usuário através de um id.
  // static async deleteAgend(req, res) {
  //   const id = req.params.id;
  //   const query = `DELETE FROM usuario WHERE id_usuario = ?;`;
  //   try {
  //     connect_database.query(query, [id], function (err, results) {
  //       if (err) {
  //         console.error(err);
  //         console.log(err.code);
  //         return res.status(500).json({
  //           error: " Erro interno do servidor :(",
  //         });
  //       }
  //       if (results.affectedRows === 0) {
  //         return res.status(404).json({
  //           error: " Usuário não encontrado",
  //         });
  //       } else {
  //         return res.status(200).json({
  //           message: " Usuário excluído com sucesso",
  //         });
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: " Erro interno do servidor" });
  //   }
  // }


}