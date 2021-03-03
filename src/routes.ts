import { Router } from 'express';
import { RowDataPacket } from 'mysql2';
import db from './database';
const router = Router();

router.get('/', (_, res) => res.redirect('/companies'));

router.put('/companies/:id_company', (req, res) => {
	const { id_company } = req.params;
	const { cnpj, razaoSocial, nomeFantasia, site, email } = req.body;
	console.log(req.body);
	console.log({ cnpj, razaoSocial, nomeFantasia, site, email });

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

router.get('/companies', (_, res) => {
	db.getConnection().query('SELECT * FROM Empresa;', (err, companies: RowDataPacket[]) => {
		res.render('company', { companies });
	});
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

export default router;