// Select all thumbnail images and the top-right image element
const thumbnails = document.querySelectorAll('.thumbnail');
const topRightImage = document.querySelector('.top-right img');

// Array of image sources for cycling
const imageSources = [
    '/2025_FoodTruckPics/IMG_1214.JPEG',
    '/2025_FoodTruckPics/IMG_1215.JPEG',
    '/2025_FoodTruckPics/IMG_1217.JPEG',
    '/2025_FoodTruckPics/IMG_1216.JPEG',
    '/2025_FoodTruckPics/IMG_1220.JPEG',
    '/2025_FoodTruckPics/IMG_1221.JPEG',
    '/2025_FoodTruckPics/IMG_1222.JPEG',
    '/2025_FoodTruckPics/IMG_1223.JPEG',
    '/2025_FoodTruckPics/IMG_1224.JPEG',
    '/2025_FoodTruckPics/IMG_1225.JPEG',
    '/2025_FoodTruckPics/IMG_1226.JPEG',
    '/2025_FoodTruckPics/IMG_1227.JPEG',
    '/2025_FoodTruckPics/IMG_1228.JPEG',
    '/2025_FoodTruckPics/IMG_1230.JPEG',
    '/2025_FoodTruckPics/IMG_1231.JPEG',
    '/2025_FoodTruckPics/IMG_1233.JPEG',
    '/2025_FoodTruckPics/IMG_1234.JPEG',
    '/2025_FoodTruckPics/IMG_1235.JPEG',
    '/2025_FoodTruckPics/IMG_1236.JPEG',
    
];

// Set the initial image to be shown (same as the first thumbnail initially)
let currentIndex = 0;
topRightImage.src = imageSources[currentIndex];

// Function to change to the next image in the array when clicked
function showNextImage() {
    currentIndex = (currentIndex + 1) % imageSources.length;
    topRightImage.src = imageSources[currentIndex];
}

// Add click event listener to each thumbnail (to set top-right image)
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
        // Change the top-right image src to match the clicked thumbnail
        topRightImage.src = event.target.src;

        // Update the current index based on the clicked thumbnail
        currentIndex = imageSources.indexOf(event.target.src);
    });
});

// Add click event listener to the top-right image (to cycle through images)
topRightImage.addEventListener('click', showNextImage);
