import got from "got";
import { URLSearchParams } from "url";

export class PetController {
  [x: string]: any;
  async getById(id: number | string) {
    const res = await got(`http://localhost/v2/pet/${id}`);
    return JSON.parse(res.body);
  }

  async findByStatus(status: string | string[]) {
    const res = await got(`http://localhost/v2/pet/findByStatus`, {
      searchParams: new URLSearchParams({ status }),
    });
    return JSON.parse(res.body);
  }

  async findByTags(tags: string | string[]) {
    const res = await got(`http://localhost/v2/pet/findByTags`, {
      searchParams: new URLSearchParams({ tags }),
    });
    return JSON.parse(res.body);
  }
}
