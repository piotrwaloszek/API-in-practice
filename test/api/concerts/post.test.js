const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/departments', () => {

    it('/ should insert new document to db and return success', async () => {
        const res = await request(server).post('/api/concerts').send({
            performer: 'Jan Kowalski',
            genre: 'Pop',
            price: 10,
            day: 5
        });
        const newConcert = await Concert.findOne({performer: 'Jan Kowalski'});
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(newConcert).to.not.be.null;

    });

    after(async () => {
        await Concert.deleteMany();
    });
});