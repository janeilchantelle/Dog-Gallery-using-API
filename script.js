// Fetch the data from the Dog API
fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        handleDogBreeds(data.message);
    })
    .catch(error => {
        console.error('Failed to load dog breeds:', error.message);
    });

function handleDogBreeds(breeds) {
    var selectElement = document.getElementById('dogBreedSelect');

    for (var breed in breeds) {
        if (breeds.hasOwnProperty(breed)) {
            var option = document.createElement('option');
            option.value = breed;
            option.text = breed;
            selectElement.appendChild(option);
        }
    }
}

document.getElementById('submitButton').addEventListener('click', function () {
    var selectedBreed = document.getElementById('dogBreedSelect').value;
    var imageCount = document.getElementById('imageCount').value;

    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageCount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            handleDogImages(data.message);
        })
        .catch(error => {
            console.error('Failed to load dog images:', error.message);
        });
});

function handleDogImages(images) {
    var imagesDiv = document.getElementById('dogImages');

    imagesDiv.innerHTML = '';

    images.forEach(function (imageUrl) {
        var imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Dog Image';
        imgElement.classList.add('img-fluid', 'mr-2', 'mb-2'); 
        imagesDiv.appendChild(imgElement);
    });
}
