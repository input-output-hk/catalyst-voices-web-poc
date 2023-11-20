const sharp = require("sharp");

module.exports = {
  async check(ctx) {
    const { files } = ctx.request;

    // Check if the 'files' key is present in the request
    if (!files) {
      return ctx.throw(400, "No image file found.");
    }

    // Getting the file
    const file = files?.file;

    // Maximum file size
    const maxInputSize = 2 * 1024 * 1024; // 2Mb
    const doNotResizeSize = 500 * 1024; // 500kb

    // If image is greater then 2Mb, then throw an error
    if (file?.size > maxInputSize) {
      return ctx.throw(400, "Error resizing the image. Image too big!", {
        code: "IMAGE_TOO_BIG",
      });
    }

    // Creating image buffer
    const fileBuffer = await sharp(file.path).toBuffer();

    // If file size is under 500kb return that image automatically in base64 string
    if (file?.size <= doNotResizeSize) {
      return (ctx.body = {
        data_url: `data:image/jpeg;base64,${fileBuffer.toString("base64")}`,
      });
    } else {
      try {
        // Resize the image to 200x200
        const resizedImageBuffer = await sharp(file.path)
          .resize(200, 200, { fit: "cover" })
          .toBuffer();

        // Convert resized image to base64 string
        const resizedImageBase64 = `data:image/jpeg;base64,${resizedImageBuffer.toString(
          "base64"
        )}`;

        // Return the resized image
        return (ctx.body = {
          data_url: resizedImageBase64,
        });
      } catch (error) {
        // Handle errors, e.g., if the image cannot be resized to 500kb
        ctx.throw(400, "Error resizing the image.", {
          code: "IMAGE_RESIZE_ERROR",
        });
      }
    }
  },
};
