const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Listens for new produts added to /products/ and creates a
// sanitized version of the product.
// Moderates messages by lowering all uppercase messages and removing swearwords
const Filter = require('bad-words');
const badWordsFilter = new Filter();
badWordsFilter.addWords('ugly', 'messy', 'trash','body');

// Moderates messages by lowering all uppercase messages and removing swearwords.
exports.moderator = functions.database.ref('products/{messageId}').onWrite((change) => {
  var message = change.after.val();

  if (message && !message.sanitized) {
    // Retrieved the message values.
    console.log('Retrieved message content: ', message);

    // Run moderation checks on on the message and moderate if needed.
    const moderatedMessage = moderateMessage(message.text);

    // Update the Firebase DB with checked message.
    console.log('Message has been moderated. Saving to DB: ', moderatedMessage);
    return change.after.ref.update({
      text: moderatedMessage,
      sanitized: true,
      moderated: message.text !== moderatedMessage,
    });
  }
  return null;
});

// Moderates the given message if appropriate.
function moderateMessage(message) {

  // Moderate if the user uses SwearWords.
  if (containsSwearwords(message)) {
    console.log('User is swearing. moderating...');
    message = moderateSwearwords(message);
  }

  return message;
}

// Returns true if the string contains swearwords.
function containsSwearwords(message) {
  return message !== badWordsFilter.clean(message);
}

// Hide all swearwords. e.g: Crap => ****.
function moderateSwearwords(message) {
  return badWordsFilter.clean(message);
}




/*
exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  //do thumbnail image generation by 

  // Get the file name.
  const fileName = path.basename(filePath);
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    return console.log('Already a Thumbnail.');
  }
  else{
    // call image manipulation software to generate a thumbnail image
  }
});
*/