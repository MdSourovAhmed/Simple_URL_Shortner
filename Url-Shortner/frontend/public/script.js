document.getElementById("shortenForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const longUrl = document.getElementById("longUrl").value;
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  resultDiv.innerHTML = "";
  errorDiv.innerHTML = "";

  if (!longUrl) {
    errorDiv.innerHTML = "Please enter a URL";
    return;
  }

  try {
    const response = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorDiv.innerHTML = errorData.errors
        ? errorData.errors[0].msg
        : "Error shortening URL";
      return;
    }

    const data = await response.json();
    resultDiv.innerHTML = `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
  } catch (error) {
    console.error(error);
    errorDiv.innerHTML = "Error shortening URL";
  }
});


// document.getElementById('shortenForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const longUrl = document.getElementById('longUrl').value;
//   const resultDiv = document.getElementById('result');
//   const errorDiv = document.getElementById('error');

//   resultDiv.innerHTML = '';
//   errorDiv.innerHTML = '';

//   if (!longUrl) {
//     errorDiv.innerHTML = 'Please enter a URL';
//     return;
//   }

//   try {
//     const response = await fetch('/shorten', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ url: longUrl }),
//     });
//     const data = await response.json();
//     if (!response.ok) {
//       errorDiv.innerHTML = data.errors ? data.errors[0].msg : data.error || 'Error shortening URL';
//       return;
//     }
//     resultDiv.innerHTML = `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
//   } catch (err) {
//     console.error(err);
//     errorDiv.innerHTML = 'Server error';
//   }
// });