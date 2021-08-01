const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/Concerts/:id', async() => {
    before(async () => {
        const testConcert = new Concert({
            _id: '5d9f1140f10a81216cfd4408',
            performer: 'Jan Kowalski',
            genre: 'Pop',
            price: 10,
            day: 5
        });
        await testConcert.save();

        const testConcertTwo = new Concert({
            _id: '5d9f1140f10a81216cfd4410',
            performer: 'Anna Nowak',
            genre: 'Rock',
            price: 30,
            day: 4
        });
        await testConcertTwo.save();
    });

    it('/:id should delete chosen document and return success', async () => {
        const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
        const delConcert = await Concert.findOne({name: 'Concert #1'});
        expect(res.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('OK');
        expect(delConcert).to.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
    })
});