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
			console.log(err);
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

export default router;