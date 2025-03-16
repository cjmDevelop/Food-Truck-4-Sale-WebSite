  // Select all thumbnail images
  const thumbnails = document.querySelectorAll('.thumbnail');

  // Select the top-right image element
  const topRightImage = document.querySelector('.top-right img');
  
  // Add click event listener to each thumbnail
  thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', (event) => {
          // Change the top-right image src to match the clicked thumbnail
          topRightImage.src = event.target.src;
      });
  });