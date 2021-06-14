import { compile } from "json-schema-to-typescript";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const generateManifest = async () => {
  let types = "";
  const models = JSON.parse(
    readFileSync(__dirname + "/../documentation/swagger/models.json", {
      encoding: "utf8",
    })
  );

  const modelNames = Object.keys(models);

  for (let i = 0; i < modelNames.length; i++) {
    const options = {};
    if (i > 0) {
      options["bannerComment"] = "\n\n";
    }
    const model = modelNames[i];
    const type = await compile(models[model], i.toString(), options);
    types += type;
  }

  const path = join(__dirname, "../src/models/types.d.ts");
  writeFileSync(path, types);
};

generateManifest()
  .then((text) => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.abort();
  });
