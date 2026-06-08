document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value.trim();
    const message = document.getElementById("message").value.trim();
    const method = document.getElementById("method").value;

    const fullMessage = `
Hello GODNECHEZ CREATIVE SOLUTIONS

Name: ${name}
Email: ${email}
Project: ${project}

Message:
${message}
`;

    // =======================
    // SAVE TO MONGODB
    // =======================
    try {
        await fetch("http://localhost:5000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                project,
                message,
                method
            })
        });
    } catch (err) {
        console.log("MongoDB error:", err);
    }

    // =======================
    // WHATSAPP
    // =======================
    if (method === "whatsapp") {
        const phone = "2349042481206";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
        window.open(url, "_blank");
    }

    // =======================
    // EMAIL
    // =======================
    if (method === "email") {
        const emailAddress = "nwaezeakumicah@gmail.com";
        const subject = encodeURIComponent("Design Request");
        const body = encodeURIComponent(fullMessage);

        const gmailLink =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`;

        window.open(gmailLink, "_blank");
    }

    // RESET FORM
    document.getElementById("contactForm").reset();
});document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value.trim();
    const message = document.getElementById("message").value.trim();
    const method = document.getElementById("method").value;

    const fullMessage = `
Hello GODNECHEZ CREATIVE SOLUTIONS

Name: ${name}
Email: ${email}
Project: ${project}

Message:
${message}
`;

    // =======================
    // SAVE TO MONGODB
    // =======================
    try {
        await fetch("http://localhost:5000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                project,
                message,
                method
            })
        });
    } catch (err) {
        console.log("MongoDB error:", err);
    }

    // =======================
    // WHATSAPP
    // =======================
    if (method === "whatsapp") {
        const phone = "2349042481206";
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
        window.open(url, "_blank");
    }

    // =======================
    // EMAIL
    // =======================
    if (method === "email") {
        const emailAddress = "nwaezeakumicah@gmail.com";
        const subject = encodeURIComponent("Design Request");
        const body = encodeURIComponent(fullMessage);

        const gmailLink =
            `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`;

        window.open(gmailLink, "_blank");
    }

    // RESET FORM
    document.getElementById("contactForm").reset();
});