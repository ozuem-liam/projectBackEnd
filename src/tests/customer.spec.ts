import request from 'supertest';

describe('Customer Routes', () => {
  it('GET /customers/address --> Array of addresses', () => {});

  it('GET /customers/address/id --> specific address', () => {});

  it('POST /customers/address --> Create an address', () => {
    const response = request('http://127.0.0.1:5000')
      .post('/customers/address')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              number: expect.any(Number),
              street: expect.any(String),
              city: expect.any(String),
              state: expect.any(String),
              customer_id: expect.any(String),
            }),
          ]),
        );
      });
  });
});
