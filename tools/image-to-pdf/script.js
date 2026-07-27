const imageInput = document.getElementById("imageInput");
const browseBtn = document.getElementById("browseBtn");
const previewContainer = document.getElementById("previewContainer");
const convertBtn = document.getElementById("convertBtn");

let images = [];
let sortable = null;

// Open File Picker
browseBtn.addEventListener("click", () => {
    imageInput.click();
});

// When images selected
imageInput.addEventListener("change", (e) => {

    const files = [...e.target.files];

    files.forEach(file => {

        if(file.type.startsWith("image/")){
            images.push(file);
        }

    });

    renderImages();

});
function renderImages() {

    previewContainer.innerHTML = "";

    images.forEach((file, index) => {

        const imageUrl = URL.createObjectURL(file);

        const card = document.createElement("div");
        card.className = "preview-card";

        card.innerHTML = `
            <img src="${imageUrl}">

            <div class="preview-footer">
                <p>${file.name}</p>

                <button class="remove-btn" onclick="removeImage(${index})">
                    Remove
                </button>
            </div>
        `;

        previewContainer.appendChild(card);

    });

    if (sortable) {
        sortable.destroy();
    }

    sortable = Sortable.create(previewContainer, {

        animation: 200,

        ghostClass: "dragging",

        onEnd(evt) {

            const moved = images.splice(evt.oldIndex, 1)[0];

            images.splice(evt.newIndex, 0, moved);

            renderImages();

        }

    });

}


function removeImage(index){

    images.splice(index,1);

    renderImages();

}
const dropArea = document.getElementById("dropArea");

// Prevent browser default behavior
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

// Highlight drop area
["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add("drag-active");
    });
    
});

// Remove highlight
["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove("drag-active");
    });
});
convertBtn.addEventListener("click", convertToPDF)
// Handle dropped files
dropArea.addEventListener("drop", (e) => {

    const files = [...e.dataTransfer.files];

    files.forEach(file => {
        if (file.type.startsWith("image/")) {
            images.push(file);
        }
    });
    renderImages();
    
});
async function convertToPDF() {

    if (images.length === 0) {
        alert("Please select at least one image.");
        return;
    }

    const { PDFDocument } = PDFLib;

    const pdfDoc = await PDFDocument.create();

    for (const file of images) {

        const bytes = await file.arrayBuffer();

        let image;

        if (file.type === "image/png") {

            image = await pdfDoc.embedPng(bytes);

        } else {

            image = await pdfDoc.embedJpg(bytes);

        }

        const page = pdfDoc.addPage([image.width, image.height]);

        page.drawImage(image, {

            x: 0,
            y: 0,
            width: image.width,
            height: image.height

        });

    }

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "XtreamHub-Image-To-PDF.pdf";

    a.click();

    URL.revokeObjectURL(url);

}