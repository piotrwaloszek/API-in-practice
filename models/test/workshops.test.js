const Workshop = require('../workshops.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Workshop', () =>{
    it('should throw an error if "name" and "concertId" is not passed', () =>{
        const workShop = new Workshop({});
        workShop.validate(err =>{
            expect(err.errors.name).to.exist;
            expect(err.errors.concertId).to.exist;
        });
    });
    it('should throw an error if "name" and "concertId" is not a string', () => {
        const workShop = new Workshop({name: [], concertId: {}});
        workShop.validate(err =>{
            expect(err.errors.name).to.exist;
            expect(err.errors.concertId).to.exist;
        });
    });
    it('should throw an error if not all arguments are passed', () => {
        const cases = [
            {name: 'Test'}, 
            {concertId: '123'}
        ];
        for(let ws of cases){
            const workShop = new Workshop(ws);
            workShop.validate(err => {
                expect(err.errors).to.exist;
            });
        }
    });

    it('should not throw an error if "name" and "concertId" are OK', () => {
        const workShop = new Workshop({name: 'Test', concertId: '123'});
        workShop.validate(err =>{
            expect(err).to.not.exist;
        });
    });
    after(() => {
        mongoose.models = {};
    });
});