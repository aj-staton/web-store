const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const path = require ('path');
const sharp = require ('sharp');
const uuidv4 = require('uuid/v4');
const uuid = uuidv4();
const gcs = admin.storage();

const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;
// Listens for new produts added to /products/ and creates a
// sanitized version of the product.
// Moderates messages by lowering all uppercase messages and removing swearwords
const Filter = require('bad-words');
const badWordsFilter = new Filter();
badWordsFilter.addWords('ugly', 'messy', 'trash','body');

// Moderates messages by lowering all uppercase messages and removing swearwords.
exports.moderator = functions.firestore.document('products/{id}').onCreate((snapshot, context) => {
  var data = snapshot.data();
  var input = data.name;
  if (input.includes("ugly")) {
    var regex = /ugly/gi;
    input = input.replace(regex,"****");
  } else if (input.includes("messy")) {
    var regex1 = /messy/gi;
    input = input.replace(regex1,"*****");
  } else if (input.includes("trash")) {
    var regex2 = /trash/gi;
    input = input.replace(regex2,"*****");
  } else if (input.includes("body")) {
    var regex3 = /body/gi;
    input = input.replace(regex3,"****");
  } else {
    console.log(input + " was validated.");
  } 
  data.name = input;
  return snapshot.ref.set(data)
});

exports.updateItem = functions.firestore
    .document('products/{productId}')
    .onUpdate((change, context) => {
  
      var newValue = change.after.data();
      //console.log(newValue.price + "NEW PRICE");
      var previousValue = change.before.data();
      
      if (newValue.price < previousValue.price/2) {
        newValue.price = previousValue.price/2;
        console.log("Too low; only halving the price::: " + newValue.price);
      }
      return change.after.ref.set(newValue);
});

exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
  const fileBucket = object.bucket; 
  const filePath = object.name; 
  const contentType = object.contentType; 

  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  const bucket = gcs.bucket(fileBucket);

  const thumbFileName = `thumb${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
  const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({
    metadata : { 
      contentType : contentType,
      metadata : {
      firebaseStorageDownloadTokens: uuid
    }
  }});

  const store = sharp();
  store.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT,{fit: 'inside', withoutEnlargement: true }).pipe(thumbnailUploadStream);

  bucket.file(filePath).createReadStream().pipe(store);

  return new Promise((resolve, reject) =>
      thumbnailUploadStream.on('finish', resolve).on('error', reject));
});
