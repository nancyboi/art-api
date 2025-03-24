// Current page number for pagination
let currentPage = 1;

// Number of artworks to display per page
const limit = 12;

// Function to fetch and display artworks from the API
async function fetchArtworks(page = 1) {
    // Fetch artworks data from the Art Institute of Chicago API
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`);
    const data = await response.json();

    // Get the container element to display artworks
    const artworksContainer = document.getElementById('artworks');
    
    // Clear existing artworks before rendering new ones
    artworksContainer.innerHTML = '';

    // Loop through each artwork object and create HTML elements to display them
    data.data.forEach(artwork => {
        // Create a new div for each artwork
        const artworkElement = document.createElement('div');
        artworkElement.classList.add('artwork');

        // Populate artwork information including title, image, artist, date, and description
        artworkElement.innerHTML = `
            <div class="front">
                <h2>${artwork.title}</h2>
                ${artwork.image_id ? `<img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/!843,843/0/default.jpg" alt="${artwork.title}">` : ''}
                <p><strong>Artist:</strong> ${artwork.artist_title || 'Unknown'}</p>
                <p>${artwork.date_display}</p>
                ${artwork.thumbnail && artwork.thumbnail.alt_text ? `<p>${artwork.thumbnail.alt_text}</p>` : '<p>No description available.</p>'}
            </div>
            <div class="back">
                <h2>${artwork.title}</h2>
                ${artwork.image_id ? `<img src="https://www.artic.edu/iiif/2/${artwork.image_id}/full/!843,843/0/default.jpg" alt="${artwork.title}">` : ''}
            </div>
        `;

        // Append the created artwork element to the container
        artworksContainer.appendChild(artworkElement);
    });

    // Update the displayed page number for pagination
    document.getElementById('page-info').innerText = `Page ${currentPage}`;

    // Scroll to top after loading new artworks
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listener for the "Previous" button click to navigate to the previous page
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchArtworks(currentPage);
    }
});

// Event listener for the "Next" button click to navigate to the next page
document.getElementById('next').addEventListener('click', () => {
    currentPage++;
    fetchArtworks(currentPage);
});

// Initial function call to fetch and display artworks on the first page load
fetchArtworks().catch(error => {
    console.error('Error fetching artworks:', error);
    document.getElementById('artworks').innerText = 'Error loading artworks.';
});
