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

  it('should allow a POST to /users', async function () {
    const res = await request.post('/users').send(firstUserBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');

    firstUserIdTest = res.body.id;
  });

  after(function (done) {
    app.close(() => {
      mongoose.connection.close(done);
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
