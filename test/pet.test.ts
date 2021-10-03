import { strict as assert } from "assert";
import { PetController } from "../api/controller/pet.controller";
import console, { Console } from "console";

const pet = new PetController();

describe("User can", () => {
  it("get pet by id", async () => {
    const response = await pet.getById(1);
    assert(response.id == 1, `Error found: ${response.id}, not: 1`);
  });

  it("recive pet by status", async () => {
    let res = await pet.findByStatus("available");
    assert(res.length > 0);

    res = await pet.findByStatus("sold");
    assert(res.length > 0);

    res = await pet.findByStatus("pending");
    assert(res.length > 0);

    res = await pet.findByStatus(["pending", "available"]);

    assert(res.length > 0);
    assert(res.some((pet: any) => pet.status == "available"));
    assert(res.some((pet: any) => pet.status == "pending"));
    assert(!res.some((pet: any) => pet.status == "sold"));
  });

  it("recive pet by tag", async () => {
    const res = await pet.findByTags("tag1");
    const ln = res.length;
    console.log(ln);
    for (let index = 0; index < res.length; index++) {
      console.log(res[index]);
    }
    assert(ln > 0, `respons length: ${ln}`);
    assert(res.every((x: any) => x.tags.some((y: any) => y.name == "tag1")));
  });

  it("create, update, delete pet", async function () {
    const petToCreate = {
      category: {
        id: 0,
        name: "string",
      },
      name: "Cat",
      photoUrls: ["http://test.com/image.jpg"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    const addedPet = await pet.addNew(petToCreate);

    assert.deepEqual(
      addedPet,
      {
        ...petToCreate,
        id: addedPet.id,
      },
      `Expexted added pet to matched creation data`
    );

    const foundAddedPet = await pet.getById(addedPet.id);
    assert.deepEqual(
      foundAddedPet,
      {
        ...petToCreate,
        id: addedPet.id,
      },
      `Expexted added pet to match creation data`
    );

    const newerPet = {
      id: addedPet.id,
      category: {
        id: 1,
        name: "string2",
      },
      name: "Dog",
      photoUrls: ["http://test.com/image2.jpg"],
      tags: [
        {
          id: 1,
          name: "string2",
        },
      ],
      status: "pending",
    };

    const updatedPet = await pet.update(newerPet);

    assert.deepEqual(
      newerPet,
      updatedPet,
      `Expexted updated pet to match updated data`
    );


    //add 404 asset error
    await pet.deletePet(addedPet.id);
  });
});
