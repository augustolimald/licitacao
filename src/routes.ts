import { Router } from 'express';
import { RowDataPacket } from 'mysql2';
import db from './database';
const router = Router();

router.get('/', (_, res) => res.redirect('/companies'));

router.get('/companies', (_, res) => {
	db.getConnection().query('SELECT * FROM Empresa;', (err, companies: RowDataPacket[]) => {
		res.render('company', { companies });
	});
});

router.post('/companies', (req, res) => {
	const { cnpj, razaoSocial, nomeFantasia, site, email } = req.body;

	db.getConnection().query(`INSERT INTO Empresa(cnpj, razaoSocial, nomeFantasia, site, email) VALUES ('${cnpj}', '${razaoSocial}', '${nomeFantasia}', '${site}', '${email}');`, err => {
		if (err) {
			return res.status(400).json();
		}

		db.getConnection().query(`SELECT * FROM Empresa WHERE cnpj = '${cnpj}'`, (_, data) => {
			return res.status(201).json(data[0]);
		});
	})
});

router.put('/companies/:id_company', (req, res) => {
	const { id_company } = req.params;
	const { cnpj, razaoSocial, nomeFantasia, site, email } = req.body;

	db.getConnection().query(`UPDATE Empresa SET cnpj= '${cnpj}', razaoSocial='${razaoSocial}', nomeFantasia='${nomeFantasia}', site='${site}', email='${email}' WHERE idEmpresa = ${id_company};`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/companies/:id_company', (req, res) => {
	const { id_company } = req.params;

	db.getConnection().query(`DELETE FROM Empresa WHERE idEmpresa = ${id_company}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/biddings', (_, res) => {
	db.getConnection().query('SELECT * FROM Licitacao;', (err, biddings: RowDataPacket[]) => {
		biddings.forEach(bidding => {
			bidding.dataAbertura = new Date(bidding.dataAbertura).toLocaleDateString();
			bidding.dataFechamento = new Date(bidding.dataFechamento).toLocaleDateString();
		});

		res.render('bidding', { biddings });
	});
});

router.post('/biddings', (req, res) => {
	const { numPregao, tipo, descricao, dataAbertura, dataFechamento } = req.body;

	db.getConnection().query(`INSERT INTO Licitacao(numPregao, tipo, descricao, dataAbertura, dataFechamento) VALUES ('${numPregao}', '${tipo}', '${descricao}', '${dataAbertura}', '${dataFechamento}');`, err => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(201).json({ numPregao, tipo, descricao, dataAbertura, dataFechamento });
	})
});

router.put('/biddings/:numPregao', (req, res) => {
	const { numPregao } = req.params;
	const { tipo, descricao, dataAbertura, dataFechamento } = req.body;

	db.getConnection().query(`UPDATE Licitacao SET tipo = '${tipo}', descricao='${descricao}', dataAbertura='${dataAbertura}', dataFechamento='${dataFechamento}' WHERE numPregao = ${numPregao};`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/biddings/:numPregao', (req, res) => {
	const { numPregao } = req.params;

	db.getConnection().query(`DELETE FROM Licitacao WHERE numPregao = ${numPregao}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/contracts', (_, res) => {
	db.getConnection().query('SELECT * FROM Contrato;', (err, contracts: RowDataPacket[]) => {
		contracts.forEach(contract => {
			contract.dataAssinatura = new Date(contract.dataAssinatura).toLocaleDateString();
			contract.dataFim = new Date(contract.dataFim).toLocaleDateString();
		});

		res.render('contracts', { contracts });
	});
});

router.post('/contracts', (req, res) => {
	const { idContrato, idEmpresa, idEquipeSupervisao, numPregao, dataAssinatura, dataFim } = req.body;

	db.getConnection().query(`INSERT INTO Licitacao(idContrato, idEmpresa, idEquipeSupervisao, numPregao, dataAssinatura, dataFim) VALUES ('${idContrato}', '${idEmpresa}', '${idEquipeSupervisao}', '${numPregao}', '${dataAssinatura}', '${dataFim}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idContrato, idEmpresa, idEquipeSupervisao, numPregao, dataAssinatura, dataFim });
	})
});

router.put('/contracts/:idContrato', (req, res) => {
	const { idContrato } = req.params;
	const { idEmpresa, idEquipeSupervisao, numPregao, dataAssinatura, dataFim } = req.body;

	db.getConnection().query(`UPDATE Licitacao SET idEmpresa = '${idEmpresa}', idEquipeSupervisao='${idEquipeSupervisao}', dataAssinatura='${dataAssinatura}', dataFim='${dataFim}' WHERE idContrato = ${idContrato};`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/contracts/:idContrato', (req, res) => {
	const { idContrato } = req.params;

	db.getConnection().query(`DELETE FROM Licitacao WHERE idContrato = ${idContrato}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/supervisors', (_, res) => {
	db.getConnection().query('SELECT * FROM Supervisor;', (err, supervisors: RowDataPacket[]) => {
		res.render('supervisors', { supervisors });
	});
});

router.post('/supervisors', (req, res) => {
	const { idSupervisor, cpf, nome, email } = req.body;

	db.getConnection().query(`INSERT INTO Supervisor(idSupervisor, cpf, nome, email) VALUES ('${idSupervisor}', '${cpf}', '${nome}', '${email}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idSupervisor, cpf, nome, email });
	})
});

router.put('/supervisors/:idSupervisor', (req, res) => {
	const { idSupervisor } = req.params;
	const { cpf, nome, email } = req.body;

	db.getConnection().query(`UPDATE Supervisor SET cpf = '${cpf}', nome='${nome}', email='${email}'`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/supervisors/:idSupervisor', (req, res) => {
	const { idSupervisor } = req.params;

	db.getConnection().query(`DELETE FROM Supervisor WHERE idSupervisor = ${idSupervisor}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/billings', (_, res) => {
	db.getConnection().query('SELECT * FROM Cobranca;', (err, billings: RowDataPacket[]) => {
		billings.forEach(billing => {
			billing.dataVencimento = new Date(billing.dataVencimento).toLocaleDateString();
			billing.dataDisponibilizado = new Date(billing.dataDisponibilizado).toLocaleDateString();
			billing.dataPagamento = new Date(billing.dataPagamento).toLocaleDateString();
		});

		res.render('billings', { billings });
	});
});

router.post('/billings', (req, res) => {
	const { idCobranca, idEquipeSupervisao, quantidade, valorUnitario, descricao, dataVencimento, unidadeMedida, dataPagamento, dataDisponibilizado } = req.body;

	db.getConnection().query(`INSERT INTO Cobranca(idCobranca, idEquipeSupervisao, quantidade, valorUnitario, descricao, dataVencimento, unidadeMedida, dataPagamento, dataDisponibilizado) VALUES ('${idCobranca}', '${idEquipeSupervisao}', '${quantidade}', '${valorUnitario}', '${descricao}', '${dataVencimento}', '${unidadeMedida}', '${dataPagamento}', '${dataDisponibilizado}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idCobranca, idEquipeSupervisao, quantidade, valorUnitario, descricao, dataVencimento, unidadeMedida, dataPagamento, dataDisponibilizado });
	})
});

router.put('/billings/:idCobranca', (req, res) => {
	const { idCobranca } = req.params;
	const { idEquipeSupervisao, quantidade, valorUnitario, descricao, dataVencimento, unidadeMedida, dataPagamento, dataDisponibilizado } = req.body;

	db.getConnection().query(`UPDATE Cobranca SET idCobranca = '${idCobranca}', idEquipeSupervisao='${idEquipeSupervisao}', quantidade='${quantidade}', valorUnitario='${valorUnitario}', descricao='${descricao}', dataVencimento='${dataVencimento}', unidadeMedida='${unidadeMedida}', dataPagamento='${dataPagamento}', dataDisponibilizado='${dataDisponibilizado}' WHERE idCobranca = ${idCobranca};`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/billings/:idCobranca', (req, res) => {
	const { idCobranca } = req.params;

	db.getConnection().query(`DELETE FROM Cobranca WHERE idCobranca = ${idCobranca}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/supervisoryteams', (_, res) => {
	db.getConnection().query('SELECT * FROM EquipeSupervisao;', (err, supervisoryteams: RowDataPacket[]) => {
		res.render('supervisoryteams', { supervisoryteams });
	});
});

router.post('/supervisoryteams', (req, res) => {
	const { idEquipeSupervisao, atribuicao } = req.body;

	db.getConnection().query(`INSERT INTO EquipeSupervisao(idEquipeSupervisao, atribuicao) VALUES ('${idEquipeSupervisao}', '${atribuicao}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idEquipeSupervisao, atribuicao });
	})
});

router.put('/supervisoryteams/:idEquipeSupervisao', (req, res) => {
	const { idEquipeSupervisao } = req.params;
	const { atribuicao } = req.body;

	db.getConnection().query(`UPDATE EquipeSupervisao SET atribuicao = '${atribuicao}'`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/supervisoryteams/:idEquipeSupervisao', (req, res) => {
	const { idEquipeSupervisao } = req.params;

	db.getConnection().query(`DELETE FROM EquipeSupervisao WHERE idEquipeSupervisao = ${idEquipeSupervisao}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/companies_biddings', (_, res) => {
	db.getConnection().query('SELECT * FROM Empresa_Licitacao;', (err, companies_biddings: RowDataPacket[]) => {
		res.render('companies_biddings', { companies_biddings });
	});
});

router.post('/companies_biddings', (req, res) => {
	const { idEmpresa, numPregao } = req.body;

	db.getConnection().query(`INSERT INTO Empresa_Licitacao(idEmpresa, numPregao) VALUES ('${idEmpresa}', '${numPregao}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idEmpresa, numPregao });
	})
});

router.put('/companies_biddings/:idEmpresa', (req, res) => {
	const { idEmpresa } = req.params;
	const { numPregao } = req.body;

	db.getConnection().query(`UPDATE Empresa_Licitacao SET numPregao = '${numPregao}'`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/companies_biddings/:idEmpresa', (req, res) => {
	const { idEmpresa } = req.params;

	db.getConnection().query(`DELETE FROM Empresa_Licitacao WHERE idEmpresa = ${idEmpresa}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/supervisors_teams', (_, res) => {
	db.getConnection().query('SELECT * FROM EquipeSupervisao_Supervisor;', (err, supervisors_teams: RowDataPacket[]) => {
		res.render('supervisors_teams', { supervisors_teams });
	});
});

router.post('/supervisors_teams', (req, res) => {
	const { idEquipeSupervisao, idSupervisor } = req.body;

	db.getConnection().query(`INSERT INTO EquipeSupervisao_Supervisor(idEquipeSupervisao, idSupervisor) VALUES ('${idEquipeSupervisao}', '${idSupervisor}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idEquipeSupervisao, idSupervisor });
	})
});

router.put('/supervisors_teams/:idEquipeSupervisao', (req, res) => {
	const { idEquipeSupervisao } = req.params;
	const { idSupervisor } = req.body;

	db.getConnection().query(`UPDATE EquipeSupervisao_Supervisor SET idSupervisor = '${idSupervisor}'`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/supervisors_teams/:idEquipeSupervisao', (req, res) => {
	const { idEquipeSupervisao } = req.params;

	db.getConnection().query(`DELETE FROM EquipeSupervisao_Supervisor WHERE idEquipeSupervisao = ${idEquipeSupervisao}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/addresses', (_, res) => {
	db.getConnection().query('SELECT * FROM Empresa_Endereco;', (err, addresses: RowDataPacket[]) => {
		res.render('addresses', { addresses });
	});
});

router.post('/addresses', (req, res) => {
	const { idEndereco, idEmpresa, logradouro, cep, bairro, complemento, cidade, estado, num } = req.body;

	db.getConnection().query(`INSERT INTO Empresa_Endereco(idEndereco, idEmpresa, logradouro, cep, bairro, complemento, cidade, estado, num) VALUES ('${idEndereco}', '${idEmpresa}', '${logradouro}', '${cep}', '${bairro}', '${complemento}', '${cidade}', '${estado}', '${num}');`, err => {
		if (err) {
			
			return res.status(400).json();
		}

		return res.status(201).json({ idEndereco, idEmpresa, logradouro, cep, bairro, complemento, cidade, estado, num });
	})
});

router.put('/addresses/:idEndereco', (req, res) => {
	const { idEndereco } = req.params;
	const { idEmpresa, logradouro, cep, bairro, complemento, cidade, estado, num } = req.body;

	db.getConnection().query(`UPDATE Empresa_Endereco SET idEndereco = '${idEndereco}', idEmpresa='${idEmpresa}', logradouro='${logradouro}', cep='${cep}', bairro='${bairro}', complemento='${complemento}', cidade='${cidade}', estado='${estado}', num='${num}' WHERE idEndereco = ${idEndereco};`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(200).json();
	})
});

router.delete('/addresses/:idEndereco', (req, res) => {
	const { idEndereco } = req.params;

	db.getConnection().query(`DELETE FROM Empresa_Endereco WHERE idEndereco = ${idEndereco}`, (err, result) => {
		if (err) {
			return res.status(400).json();
		}

		return res.status(204).json();
	})
});

router.get('/companies_phones', (_, res) => {
	db.getConnection().query('SELECT * FROM Empresa_Telefone;', (err, companies_phones: RowDataPacket[]) => {
		res.render('companies_phones', { companies_phones });
	});
});

router.get('/supervisors_phones', (_, res) => {
	db.getConnection().query('SELECT * FROM Supervisor_Telefone;', (err, supervisors_phones: RowDataPacket[]) => {
		res.render('supervisors_phones', { supervisors_phones });
	});
});
export default router;