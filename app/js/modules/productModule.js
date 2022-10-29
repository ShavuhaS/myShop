const previewProductBlock = (item) => {
   const previewProductWrapper = document.createElement('a');
   previewProductWrapper.classList.add("product__preview");
   previewProductWrapper.href = `/product.html?id=${item.id}`;
   const previewProductImage = document.createElement("img");
   previewProductImage.src = item.data ? item.data.images[0] : item.image;
   previewProductImage.classList.add("product__preview-image");
   const previewProductDetails = document.createElement("div");
   previewProductDetails.classList.add("product__preview-details");
   const previewProductTitle = document.createElement("h3");
   previewProductTitle.textContent = item.name;
   const previewProductPrice = document.createElement("p");
   previewProductPrice.textContent = `${item.price} $`;
   previewProductDetails.append(previewProductTitle, previewProductPrice);
   previewProductWrapper.append(previewProductImage, previewProductDetails);

   return previewProductWrapper;
};

export { previewProductBlock };