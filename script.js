document.addEventListener('DOMContentLoaded', function () {
    // Handle Navigation Menu for Mobile
    const btn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");
    const menu = document.getElementById("menu");

    btn.addEventListener("click", navToggle)
    closeBtn.addEventListener("click", navToggle)

    function navToggle() {
        menu.classList.toggle("flex");
        menu.classList.toggle("hidden");
    }

    // Handle multiple image upload and display
    const uploadedImages = document.getElementById('uploaded-images');

    document.getElementById("images-upload").addEventListener("click", function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true;
        input.click();

        input.onchange = function (event) {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageSrc = e.target.result;
                    createImageCard(imageSrc, uploadedImages);
                };
                reader.readAsDataURL(file);
            });
        };
    });

    // Create Image Card for each uploaded image
    function createImageCard(imageSrc, container) {
        const uploadCard = document.createElement('div');
        uploadCard.classList.add('relative', 'w-44', 'h-40', 'border', 'rounded-lg', 'pt-0.5', 'px-0.5', 'mb-4');

        const closeButton = document.createElement('button');
        closeButton.classList.add('absolute', 'top-1', 'left-1');
        closeButton.innerHTML = '<i class="fas fa-times text-sm bg-black bg-opacity-10 px-2 py-0.5 rounded-lg text-white text-white-400"></i>';

        const image = document.createElement('img');
        image.src = imageSrc;
        image.classList.add('w-full', 'h-32', 'rounded-lg');

        const progressContainer = document.createElement('div');
        progressContainer.classList.add('flex', 'justify-between', 'items-center', 'space-x-2', 'space-x-reverse', 'mt-1');

        const progress = document.createElement('div');
        progress.classList.add('bg-blue-100', 'rounded-lg', 'flex-grow');

        const progressBar = document.createElement('div');
        progressBar.classList.add('bg-lightBlue2', 'text-xs', 'font-medium', 'text-blue-100', 'rounded-lg');
        progressBar.style.width = '0%';
        progressBar.innerHTML = '&nbsp;';

        const progressBarPercentage = document.createElement('p');
        progressBarPercentage.classList.add('text-xs', 'font-medium');
        progressBarPercentage.textContent = '0%';

        progress.appendChild(progressBar);
        progressContainer.appendChild(progress);
        progressContainer.appendChild(progressBarPercentage);

        uploadCard.appendChild(closeButton);
        uploadCard.appendChild(image);
        uploadCard.appendChild(progressContainer);

        container.appendChild(uploadCard);

        // Simulate upload bar
        simulateUpload(progressBar, progressBarPercentage);

        const closeFun = (event) => {
            event.stopPropagation();
            uploadCard.remove();
        };
        // Close the image card when the close button is clicked
        closeButton.addEventListener('click', (event) => {
            closeFun(event);
        });
    }

    // Handle cover image upload
    const coverUploadCard = document.getElementById('cover-upload-card');
    const coverPreviewImage = document.getElementById('cover-preview-image');
    const coverProgressBar = document.getElementById('cover-progress-bar');
    const coverProgressBarPercentage = document.getElementById('bar-percentage');
    const cancelCoverUpload = document.getElementById('cancel-cover-upload-button');

    document.getElementById("cover-image-upload").addEventListener("click", function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.onchange = function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    coverPreviewImage.src = e.target.result;
                    coverUploadCard.classList.remove('hidden');
                    // Simulate upload bar
                    simulateUpload(coverProgressBar, coverProgressBarPercentage);
                };
                reader.readAsDataURL(file);
            }
        };
    });

    // Cancel cover upload and hide the card
    cancelCoverUpload.addEventListener('click', function (event) {
        event.stopPropagation(); 
        coverUploadCard.classList.toggle('hidden');
        coverProgressBar.style.width = '0%';
        coverProgressBarPercentage.textContent = '0%';
    });

    // Simulate upload progress function using setInterval
    function simulateUpload(progressBar, progressBarPercentage) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + '%';
            progressBarPercentage.textContent = progress + '%';

            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 300);
    }
});

