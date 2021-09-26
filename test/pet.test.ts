import got  from 'got';
import { strict as assert } from 'assert';
import console from 'console';

describe("User can", () => {
  it('can get pet by id', async function () {
    const response = await got('https://petstore.swagger.io/v2/pet/1');
    const body = JSON.parse(response.body);
    console.log(body);

    assert(body.id == 1);
    })
  it('smth', async function () {
    const response = await got('http://localhost:3000/profile');
    const body = JSON.parse(response.body);
    console.log(body);

    assert(body.name == 'typicode');
  })
});
