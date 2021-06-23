import { Connection } from "../db";
import { ApiData } from "./types";
import pgPromise from "pg-promise";

export enum Authorities {
  ENS = 1,
  IPFS,
}

export class Api {
  public static async create(apiInfo: ApiData) {
    const connection = await Connection.getInstance();
    try {
      const {
        name,
        subtext,
        description,
        icon,
        locationUri,
        pointerUris,
        ownerId,
      } = apiInfo;
      const insertApi = async (tx: pgPromise.ITask<{}>) => {
        const api = await tx.one(
          "INSERT INTO apis (name, subtext, description, icon, fk_owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [name, subtext, description, icon, ownerId]
        );

        //@TODO: Retrieve authId dynamically
        await tx.none(
          "INSERT INTO api_uris (uri, fk_api_id, fk_uri_type_id) VALUES ($1, $2, $3)",
          [locationUri, api.id, Authorities.IPFS]
        );

        const insertPointers = async (locationUri: string) => {
          await tx.none(
            "INSERT INTO api_uris (uri, fk_api_id, fk_uri_type_id) VALUES ($1, $2, $3)",
            [locationUri, api.id, Authorities.ENS]
          );
        };

        pointerUris.map(insertPointers);
      };

      await connection.tx(insertApi);
      return {
        name,
        subtext,
        description,
        icon,
        locationUri,
        pointerUris,
      };
    } catch (error) {
      console.log("Error on method: Api.create() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getAllActive(): Promise<ApiData[]> {
    const connection = await Connection.getInstance();
    try {
      const apis = await connection.manyOrNone(
        `SELECT 
          apis.id, 
          apis.description, 
          apis.name, 
          apis.subtext,
          apis.icon, 
          uri_types.type as type, 
          api_uris.uri 
        FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        WHERE visible = true`
      );

      return apis.reduce(this.sanitizeApis, []);
    } catch (error) {
      console.log("Error on method: Api.getAllActive() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async deactivate(id: number) {
    const connection = await Connection.getInstance();
    try {
      await connection.none("UPDATE apis SET visible = false WHERE id = $1", [
        id,
      ]);
    } catch (error) {
      console.log("Error on method: Api.deactivate() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async get(name: string, visible = true) {
    const connection = await Connection.getInstance();
    try {
      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
          apis.description, 
          apis.name, 
          apis.subtext,
          apis.icon, 
          uri_types.type as type, 
          api_uris.uri FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        WHERE LOWER(apis.name) LIKE $1 AND apis.visible = $2`,
        [`%${name}%`, visible]
      );

      if (!apisData.length) return null;

      const apis = apisData.reduce(this.sanitizeApis, []);

      return apis;
    } catch (error) {
      console.log("Error on method: Api.get() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getByLocation(location: string, name: string) {
    const connection = await Connection.getInstance();
    try {
      const api = await connection.oneOrNone(
        `SELECT apis.id FROM apis         
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id  
        WHERE api_uris.uri = $1 AND LOWER(uri_types.name) = $2`,
        [name, location]
      );

      if (!api) return null;

      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
          apis.description, 
          apis.name, 
          apis.subtext,
          apis.icon, 
          uri_types.type as type, 
          api_uris.uri FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        WHERE api_uris.fk_api_id = $1`,
        [api.id]
      );

      if (!apisData.length) return null;

      const apiSanitized = apisData.reduce(this.sanitizeApis, []);
      return apiSanitized[0];
    } catch (error) {
      console.log("Error on method: Api.getByLocation() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  public static async getByOwner(id: string) {
    const connection = await Connection.getInstance();
    try {
      const user = await connection.oneOrNone(
        `SELECT * FROM users WHERE id = $1`,
        [id]
      );

      if (!user) return null;

      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
            apis.description, 
            apis.name, 
            apis.subtext,
            apis.icon, 
            uri_types.type as type, 
            api_uris.uri FROM apis 
          INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
          INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
          WHERE apis.fk_owner_id = $1`,
        [id]
      );

      if (!apisData.length) return null;

      const apisSanitized = apisData.reduce(this.sanitizeApis, []);
      return apisSanitized;
    } catch (error) {
      console.log("Error on method: Api.getByLocation() -> ", error.message);
      throw new Error(error);
    } finally {
      connection.done();
    }
  }

  private static sanitizeApis(acc: ApiData[], api: any): ApiData[] {
    const { authority, type, uri, name, ...metadata } = api;

    const apiIndex = acc.findIndex(({ name }) => name === api.name);

    let apiSanitized = {
      ...metadata,
      name,
      pointerUris: [],
      ...(acc[apiIndex] || {}),
    };

    if (api.type === "storage") {
      apiSanitized.locationUri = api.uri;
    } else {
      apiSanitized.pointerUris.push(api.uri);
    }

    if (apiIndex === -1) return [...acc, apiSanitized];
    acc[apiIndex] = apiSanitized;

    return acc;
  }
}
