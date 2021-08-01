const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
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

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/ should return concert by :id', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.performer).to.be.equal('Jan Kowalski');
    });

    it('/ should return concert by :performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Jan Kowalski');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.genre).to.be.equal('Pop');
    });

    it('/ should return concert by :genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.performer).to.be.equal('Jan Kowalski');
    });

    it('/ should return concerts by :day', async () => {
        const res = await request(server).get('/api/concerts/price/day/5');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.performer).to.be.equal('Jan Kowalski');
    });

    it('/ should return concert by :price', async () => {
        const res = await request(server).get('/api/concerts/price/6/12');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
        expect(res.body.performer).to.be.equal('Jan Kowalski');
    });

    after(async () => {
        await Concert.deleteMany();
      });
});