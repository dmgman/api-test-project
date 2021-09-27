import { strict as assert } from "assert";
import { PetController } from "../api/controller/pet.controller";
import console, { Console } from "console";

const pet = new PetController();

describe("User can", () => {
  it("get pet by id", async function () {
    const response = await pet.getById(1);
    assert(response.id == 1, `Error found: ${response.id}, not: 1`);
  });

  it("recive by status", async function () {
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

  it("recive by tag", async function () {
    const res = await pet.findByTags("tag1");
    console.log(res)

    assert(res.lenght > 0);
    assert(
      res.every(
        (pet: any) => pet.tags.some(
        (tag: any) => tag.name == "tag1"))
    );
  });
});
