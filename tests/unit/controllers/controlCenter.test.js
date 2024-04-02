import { describe, it} from 'mocha'
import app from '../../../server.js'
import request from 'supertest'
import * as chai from 'chai'
const expect = chai.expect


describe('API tests for /notify endpoint for an end to end Notify Request', () => {
    it('Should test unsuccess response for invalid whatsapp number.', async () => {
        const response = await request(app).post('/notify').send({
            "userNo":"INVALID_NUMBER"
        })
        expect(response.status).to.equal(400)
    })

    it('Should test success response for no whatsapp number provided in the payload and will sent to TEST_RECEPIENT_NUMBER', async () => {
        const response = await request(app).post('/notify').send({})

        expect(response.status).to.equal(200)
        expect(response._body.status).to.equal(true)
        expect(['sent', 'delivered']).to.include(response._body.deliveryStatus)
    })

    it('Should test success response for valid whatsapp number', async () => {
        const response = await request(app).post('/notify').send({
            "userNo":process.env.TEST_RECEPIENT_NUMBER
        })
        expect(response.status).to.equal(200)
        expect(response._body.status).to.equal(true)
        expect(['sent', 'delivered']).to.include(response._body.deliveryStatus)
    })

    
})



describe('API tests for /cancel-booking endpoint for an end to end Notify Message', () => {
    it('Should test unsuccess response for invalid order Id.', async () => {
        const response = await request(app).post('/cancel-booking').send({
            "orderId":"Abcd"
        })
        expect(response.status).equal(400)
        expect(response._body.status).equal(false)
        expect(response._body.status).equal(false)
    })

    it('Should test unsuccess response for no order Id.', async () => {
        const response = await request(app).post('/cancel-booking').send({})
        expect(response.status).equal(400)
        expect(response._body.status).equal(false)
        expect(response._body.status).equal(false)
    })

   
    it('Should test success response for valid order Id.', async () => {
        const response = await request(app).post('/cancel-booking').send({
            "orderId":"1"
        })
 
        expect(response.status).equal(200)
        expect(response._body.status).equal(true)
        expect(['Notification delivered' , 'Notification sent']).to.include(response._body.message)
    })

    
})

describe('API tests for /update-catalog endpoint for an end to end Notify Message', () => {
    it('Should test success response for invalid whatsapp No.', async () => {
        const response = await request(app).post('/update-catalog').send({
            "userNo":"INVALID_NUMBER"
        })
      
        expect(response.status).equal(400)
        expect(response._body.status).equal(false)
        expect(response._body.message).equal('Notification Failed')
    })

    it('Should test success response for no whatsapp number provided in the payload and will sent to TEST_RECEPIENT_NUMBER', async () => {
        const response = await request(app).post('/update-catalog').send({})
        expect(response.status).equal(200)
        expect(response._body.status).equal(true)
        expect(response._body.message).equal('Catalog Updated')
    })

    it('Should test success response for valid whatsapp number', async () => {
        const response = await request(app).post('/update-catalog').send({
            "userNo":process.env.TEST_RECEPIENT_NUMBER
        })
        expect(response.status).equal(200)
        expect(response._body.status).equal(true)
        expect(response._body.message).equal('Catalog Updated')
    })
})