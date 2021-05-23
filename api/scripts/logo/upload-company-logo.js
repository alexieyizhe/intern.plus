const firebase = require("firebase");
const path = require("path");
require("firebase/storage");
const fs = require("fs");
const sharp = require("sharp");
const config = require("../../firebase-credentials--local.json");
global.XMLHttpRequest = require("xhr2");

const FIREBASE_STORAGE_LOGO_IMAGE_PATH_PREFIX = "images/company-logos";
let ARG_IMAGES_DIR_PATH = "";

process.argv.forEach(function (val, index, array) {
  if (val === "--path" && index + 1 < array.length) {
    ARG_IMAGES_DIR_PATH = array[index + 1];
  }
});

if (!fs.existsSync(ARG_IMAGES_DIR_PATH)) {
  console.error(
    "Images directory not specified or does not exist:",
    ARG_IMAGES_DIR_PATH
  );
  process.exit();
}

firebase.initializeApp(config);
const db = firebase.firestore();
const storage = firebase.storage();

async function resizeAndUploadLogos() {
  const dir = await fs.promises.opendir(ARG_IMAGES_DIR_PATH);
  const storageRef = storage.ref();

  for await (const directoryEntry of dir) {
    const companySlug = path.parse(directoryEntry.name).name;
    const imageFullPath = path.join(ARG_IMAGES_DIR_PATH, directoryEntry.name);

    const query = await db
      .collection("companies")
      .where("slug", "==", companySlug)
      .get();
    if (!query.empty) {
      console.log(`✅ Found company with slug ${companySlug}`);
      const companyId = query.docs[0].id;
      const companyRef = db.collection("companies").doc(companyId);

      console.log("Resizing and uploading image...");
      const imageStr = fs.readFileSync(imageFullPath, { encoding: "base64" });
      const imageBlob = Buffer.from(imageStr, "base64");

      const fileName = `${companyId}--${directoryEntry.name}`;
      const companyLogoStorageRef = storageRef.child(
        `${FIREBASE_STORAGE_LOGO_IMAGE_PATH_PREFIX}/${fileName}`
      );
      await companyLogoStorageRef
        .put(imageBlob, {
          contentType: "image/png",
        })
        .then(() =>
          companyLogoStorageRef.getDownloadURL().then((url) => {
            console.log("Updating logoRef field of company...");
            companyRef
              .update({ logoRef: url })
              .then(() =>
                console.log("Successfully linked logoRef to logo image.")
              );
          })
        );
    }
  }
}

resizeAndUploadLogos();
