document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.classList.remove('d-none');
            document.getElementById('result-container').classList.add('d-none');
        };
        reader.readAsDataURL(file);
    }
});

function removeBackground() {
    const fileInput = document.getElementById('upload');
    if (!fileInput.files.length) {
        alert("Please upload an image first");
        return;
    }

    const button = document.querySelector('.btn-process');
    const spinner = document.querySelector('.loading-spinner');
    const buttonText = document.querySelector('.button-text');

    // Show loading state
    spinner.style.display = 'inline-block';
    buttonText.textContent = 'Processing...';
    button.disabled = true;

    const formData = new FormData();
    formData.append("image_file", fileInput.files[0]);
    formData.append("size", "auto");

    fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
            "X-Api-Key": "ZMmckyUBX9qg7uRRDZYHNh6T"
        },
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const imgUrl = URL.createObjectURL(blob);
        document.getElementById('result').src = imgUrl;
        document.getElementById('result-container').classList.remove('d-none');
        
        // Reset button state
        spinner.style.display = 'none';
        buttonText.textContent = 'Remove Background';
        button.disabled = false;
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while processing the image");
        
        // Reset button state
        spinner.style.display = 'none';
        buttonText.textContent = 'Remove Background';
        button.disabled = false;
    });
}

function downloadResult() {
    const resultImage = document.getElementById('result').src;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'removed-background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}