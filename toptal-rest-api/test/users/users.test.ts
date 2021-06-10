import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import mongoose from 'mongoose';

import app from '../../app';

let firstUserIdTest = '';

const firstUserBody = {
  email: `erik.brown+${shortid.generate()}@example.com`,
  password: 'Passw0rd!23',
};

let accessToken = '';
let refreshToken = '';
const newFirstName = 'Max';
const newFirstName2 = 'Erik';
const newLastName2 = 'Brown';

describe('Users and Auth Endpoints', function () {
  let request: supertest.SuperAgentTest;

  before(function () {
    request = supertest.agent(app);
  });

  after(function (done) {
    app.close(() => {
      mongoose.connection.close(done);
    });
  });

  it('should allow a POST to /users', async function () {
    const res = await request.post('/users').send(firstUserBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');

    firstUserIdTest = res.body.id;
  });

  it('should allow a POST to /auth', async function () {
    const res = await request.post('/auth').send(firstUserBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.a('string');

    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it('should allow a GET from /users/:userId with an access token', async function () {
    const res = await request
      .get(`/users/${firstUserIdTest}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.be.a('string');
    expect(res.body._id).to.equal(firstUserIdTest);
    expect(res.body.email).to.equal(firstUserBody.email);
  });

  describe('with a valid access token', function () {
    // Effective testing covers not only what we expect to work but also what we expect to fail.
    it('should allow a GET from /users', async function () {
      const res = await request
        .get(`/users`)
        .set({ Authorzation: `Bearer ${accessToken}` })
        .send();

      expect(res.status).to.equal(403);
    });

    it('should disallow a PATCH to /users/:userId', async function () {
      const res = await request
        .patch(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          firstName: newFirstName,
        });

      expect(res.status).to.equal(403);
    });

    it('should disallow a PUT to /users/:userId with a nonexistent ID', async function () {
      const res = await request
        .put(`/users/i-do-not-exist`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Peter',
          lastName: 'Piper',
          permissionFlags: 256,
        });

      expect(res.status).to.equal(404);
    });

    it.skip('should disallow a PUT to /users/:userId tryong to change the permission flags', async function () {
      const res = await request
        .put(`/users/${firstUserIdTest}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Peter',
          lastName: 'Piper',
          permissionFlag: 256,
        });

      expect(res.status).to.equal(400);
      expect(res.body.errors).to.be.an('array');
      expect(res.body.errors).to.have.length(1);
      expect(res.body.errors[0]).to.equal(
        'User cannot change permission flags'
      );
    });

    it.skip('should allow a PUT to /users/:uderId/permissionFlags/2 for testing', async function () {
      const res = await request
        .put(`/users/${firstUserIdTest}/permissionFlags/2`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send({});

      expect(res.status).to.equal(204);
    });

    describe('with a new set of permission flags', function () {
      it('should allow a POST to /auth/refresh-token', async function () {
        const res = await request
          .post('/auth/refresh-token')
          .set({ Authorization: `Bearer ${accessToken}` })
          .send({ refreshToken });

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.accessToken).to.be.a('string');

        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
      });

      it.skip('should allow a PUT to /users/:userId to chagne first and last names', async function () {
        const res = await request
          .put(`/users/${firstUserIdTest}`)
          .set({ Authorization: `Bearer ${accessToken}` })
          .send({
            email: firstUserBody.email,
            password: firstUserBody.password,
            firstName: newFirstName2,
            lastName: newLastName2,
            permissionFlags: 2,
          });

        expect(res.status).to.equal(204);
      });

      it.skip('should allow a GET from /users/:userId and should have a new full name', async function () {
        const res = await request
          .get(`/users/${firstUserIdTest}`)
          .set({ Authorization: `Bearer ${accessToken}` })
          .send();

        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.be.a.a('string');
        expect(res.body.firstName).to.equal(newFirstName2);
        expect(res.body.lastName).to.equal(newLastName2);
        expect(res.body.email).to.equal(firstUserBody.email);
        expect(res.body._id).to.equal(firstUserIdTest);
      });

      it('should allow a DELETE from /users/:userId', async function () {
        const res = await request
          .delete(`/users/${firstUserIdTest}`)
          .set({ AUthorization: `Bearer ${accessToken}` })
          .send();

        expect(res.status).to.equal(204);
      });
    });
  });
});

/*
 * Note: Without our after() tactic, Mocha will hang even after successful test completion.
 * The advice is often to simply always call Mocha with --exit to avoid this, but there’s an
 * (often unmentioned) caveat. If the test suite would hang for other reasons—like a
 * misconstructed Promise in the test suite or the app itself—then with --exit, Mocha won’t
 * wait and will report success anyway, adding a subtle complication to debugging.
 */
