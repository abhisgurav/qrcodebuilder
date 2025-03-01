document.getElementById("qrType").addEventListener("change", function() {
    let imageInput = document.getElementById("imageInput");
    let generateBtn = document.getElementById("generateBtn");
    imageInput.style.display = this.value === "withImage" ? "inline-block" : "none";
    generateBtn.style.display = "inline-block";
    generateBtn.classList.add("animate-button");
});

function generateQR() {
    let text = document.getElementById("text").value.trim();
    let qrType = document.getElementById("qrType").value;
    let imageInput = document.getElementById("imageInput").files[0];
    let qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    
    if (!qrType) {
        alert("Please select a QR Code method");
        return;
    }
    
    if (!text) {
        alert("Please enter text or URL");
        return;
    }
    
    let qr = new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H
    });
    
    qrContainer.classList.add("show");
    
    if (qrType === "withImage" && imageInput) {
        setTimeout(() => {
            let qrCodeImage = qrContainer.querySelector("img");
            if (qrCodeImage) {
                let reader = new FileReader();
                reader.onload = function(event) {
                    let img = new Image();
                    img.src = event.target.result;
                    img.onload = function() {
                        let canvas = document.createElement("canvas");
                        let ctx = canvas.getContext("2d");
                        canvas.width = 200;
                        canvas.height = 200;
                        ctx.drawImage(qrCodeImage, 0, 0, 200, 200);
                        ctx.drawImage(img, 75, 75, 50, 50);
                        qrContainer.innerHTML = "";
                        let finalImg = new Image();
                        finalImg.src = canvas.toDataURL();
                        qrContainer.appendChild(finalImg);
                    };
                };
                reader.readAsDataURL(imageInput);
            }
        }, 500); 
    }
}