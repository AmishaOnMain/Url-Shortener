const urlInput = document.getElementById("urlInput");
const shortenBtn = document.getElementById("shortenBtn");

const loader = document.getElementById("loader");
const result = document.getElementById("result");

const shortUrlInput = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");

const API = window.location.origin;

shortenBtn.addEventListener("click", shortenURL);

copyBtn.addEventListener("click", copyURL);

async function shortenURL() {
  const url = urlInput.value.trim();

  if (!url) {
    alert("Please enter a URL.");
    return;
  }

  loader.classList.remove("d-none");
  result.classList.add("d-none");

  try {
    const response = await fetch(`${API}/shorten`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        url,
      }),
    });

    const data = await response.json();

    loader.classList.add("d-none");

    if (!response.ok) {
      alert(data.message);
      return;
    }

    const shortLink = `${API}/${data.data.shortCode}`;

    shortUrlInput.value = shortLink;

    result.classList.remove("d-none");
  } catch (error) {
    loader.classList.add("d-none");

    alert("Unable to connect to server.");

    console.error(error);
  }
}

async function copyURL() {
  await navigator.clipboard.writeText(shortUrlInput.value);

  copyBtn.textContent = "Copied!";

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
}
