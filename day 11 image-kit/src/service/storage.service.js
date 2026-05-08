const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const response = await imagekit.upload({
    file: file,
    fileName: fileName,
    folder: "AI-social",
  });
  return response;
}

module.exports = uploadFile;
