
// let token = null;

// document.addEventListener("DOMContentLoaded", () => {
//   // Attach event listeners to buttons
//   document
//     .getElementById("loginButton")
//     .addEventListener("click", () => AdminAccess(false));
//   document
//     .getElementById("registrationButton")
//     .addEventListener("click", () => AdminAccess(true));
//   document.getElementById("logoutButton").addEventListener("click", logout);
//   document.getElementById("saveEditButton").addEventListener("click", saveEdit);
//   document
//     .getElementById("cancelEditButton")
//     .addEventListener("click", cancelEdit);

//   // Check for existing token on page load
//   token = localStorage.getItem("adminToken");
//   if (token) {
//     validateTokenAndLoad();
//   }
// });




// async function validateTokenAndLoad() {
//   try {
//     const response = await fetch("/admin/urls", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (response.ok) {
//       document.getElementById("loginForm").style.display = "none";
//       document.getElementById("adminPanel").style.display = "block";
//       loadUrls();
//     } else {
//       handleInvalidToken("Session expired. Please log in again.");
//       AdminAccess(false);
//     }
//   } catch (err) {
//     handleInvalidToken("Server error. Please log in again.");
//     console.error(err);
//   }
// }





// function handleInvalidToken(message) {
//   localStorage.removeItem("adminToken");
//   token = null;
//   document.getElementById("loginForm").style.display = "block";
//   document.getElementById("adminPanel").style.display = "none";
//   document.getElementById("loginMsg").innerHTML = message;
// };



// async function Submit(formData, path) {
//  console.log(path);
//  console.log(formData);
//   const loginMsg = document.getElementById("loginMsg");
//   try {
//     const response = await fetch(`/admin/${path}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       loginMsg.innerHTML = data.error || `${path} failed`;
//       return;
//     }
//     loginMsg.innerHTML = `${path} Successfull`;
//     if (path === "login") {
//       document.getElementById("form").style.display = "none";
//       document.getElementById("adminPanel").style.display = "block";
//       loadUrls();
//     } else {
//       alert("Login with your credentials.");
//     }
//   } catch (err) {
//     loginMsg.innerHTML = "Server error";
//     console.error(err);
//   }
// }

// async function AdminAccess(isRegistration = false) {
//   // const loginButton = document.getElementById('loginButton');
//   // loginButton.style.display=isRegistration?'none':'block';

//   document.getElementById("loginForm").style.display = "block";
//   const emailField = document.getElementById("email");
//   emailField.style.display = isRegistration ? "block" : "none";

//   const email = emailField.value.trim();
//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value;
//   const loginMsg = document.getElementById("loginMsg");
//   loginMsg.innerHTML = "";

//   if (!username || !password || (isRegistration && !email)) {
//     loginMsg.innerHTML = "Please fill in all required fields.";
//     return;
//   }

//   try {
//     const formData = { username, password };
//     let path = "login";

//     if (isRegistration) {
//       formData.email = email;
//       path = "register";
//     }
//     document
//       .getElementById("submit")
//       .addEventListener("click", Submit(formData, path));

//     // const response = await fetch(`/admin/${path}`, {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(formData),
//     // });

//     // const data = await response.json();

//     // if (!response.ok) {
//     //   loginMsg.innerHTML = data.error || `${path} failed`;
//     //   return;
//     // }
//     // alert(data.message);
//     // // token = data.token;
//     // // localStorage.setItem('adminToken', token);

//     // // document.getElementById('registrationButton').style.display = 'none';
//     // document.getElementById('email').style.display = 'none';
//     // // loginButton.style.display='block';

//     // // document.getElementById('adminPanel').style.display = 'block';
//     // // loadUrls();
//   } catch (err) {
//     loginMsg.innerHTML = "Server error";
//     console.error(err);
//   }
// }

// async function loadUrls() {
//   try {
//     const response = await fetch("/admin/urls", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const urls = await response.json();

//     if (!response.ok) {
//       document.getElementById("adminError").innerHTML =
//         urls.error || "Failed to load URLs";
//       return;
//     }

//     const urlList = document.getElementById("urlList");
//     urlList.innerHTML = "";

//     urls.forEach((url) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${url.shortCode}</td>
//         <td>${url.longUrl}</td>
//         <td>${new Date(url.createdAt).toLocaleString()}</td>
//         <td>
//           <button class="editButton" data-shortcode="${
//             url.shortCode
//           }" data-longurl="${url.longUrl.replace(/'/g, "\\'")}">Edit</button>
//           <button class="deleteButton" data-shortcode="${
//             url.shortCode
//           }">Delete</button>
//         </td>
//       `;
//       urlList.appendChild(row);
//     });

//     // Attach event listeners to dynamic buttons
//     document.querySelectorAll(".editButton").forEach((button) => {
//       button.addEventListener("click", () =>
//         editUrl(button.dataset.shortcode, button.dataset.longurl)
//       );
//     });
//     document.querySelectorAll(".deleteButton").forEach((button) => {
//       button.addEventListener("click", () =>
//         deleteUrl(button.dataset.shortcode)
//       );
//     });
//   } catch (err) {
//     document.getElementById("adminError").innerHTML = "Server error";
//     console.error(err);
//   }
// }

// function editUrl(shortCode, longUrl) {
//   document.getElementById("editShortCode").value = shortCode;
//   document.getElementById("editLongUrl").value = longUrl;
//   document.getElementById("editForm").style.display = "block";
// }

// async function saveEdit() {
//   const shortCode = document.getElementById("editShortCode").value;
//   const longUrl = document.getElementById("editLongUrl").value;
//   const adminError = document.getElementById("adminError");
//   adminError.innerHTML = "";

//   try {
//     const response = await fetch(`/admin/urls/${shortCode}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ longUrl }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       adminError.innerHTML = data.error || "Failed to update URL";
//       return;
//     }

//     document.getElementById("editForm").style.display = "none";
//     loadUrls();
//   } catch (err) {
//     adminError.innerHTML = "Server error";
//     console.error(err);
//   }
// }

// function cancelEdit() {
//   document.getElementById("editForm").style.display = "none";
//   document.getElementById("adminError").innerHTML = "";
// }

// async function deleteUrl(shortCode) {
//   const adminError = document.getElementById("adminError");
//   adminError.innerHTML = "";

//   try {
//     const response = await fetch(`/admin/urls/${shortCode}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       adminError.innerHTML = data.error || "Failed to delete URL";
//       return;
//     }

//     loadUrls();
//   } catch (err) {
//     adminError.innerHTML = "Server error";
//     console.error(err);
//   }
// }

// function logout() {
//   token = null;
//   localStorage.removeItem("adminToken");
//   document.getElementById("adminPanel").style.display = "none";
//   document.getElementById("loginForm").style.display = "block";
//   document.getElementById("adminError").innerHTML = "";
// }









let token = null;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginButton").addEventListener("click", () => showAuthForm(false));
  document.getElementById("registrationButton").addEventListener("click", () => showAuthForm(true));
  document.getElementById("submit").addEventListener("click", handleAuthSubmit);

  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("saveEditButton").addEventListener("click", saveEdit);
  document.getElementById("cancelEditButton").addEventListener("click", cancelEdit);

  // Auto-login if token exists
  token = localStorage.getItem("adminToken");
  if (token) validateTokenAndLoad();
});

/* ----------------------------- Helpers ----------------------------- */

function showMessage(id, message, isError = true) {
  const el = document.getElementById(id);
  el.style.color = isError ? "red" : "green";
  el.innerHTML = message;
}

function switchView({ login = false, panel = false }) {
  document.getElementById("form").style.display = login ? "block" : "none";
  document.getElementById("loginForm").style.display = login ? "block" : "none";
  document.getElementById("adminPanel").style.display = panel ? "block" : "none";
}

/* ----------------------------- Auth Flow ----------------------------- */

async function validateTokenAndLoad() {
  try {
    const response = await fetch("/admin/urls", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      switchView({ panel: true });
      loadUrls();
    } else {
      handleInvalidToken("Session expired. Please log in again.");
    }
  } catch (err) {
    handleInvalidToken("Server error. Please log in again.");
    console.error(err);
  }
}

function handleInvalidToken(message) {
  localStorage.removeItem("adminToken");
  token = null;
  switchView({ login: true });
  showMessage("loginMsg", message);
}

let isRegistrationMode = false;

function showAuthForm(isRegistration) {
  isRegistrationMode = isRegistration;
  switchView({ login: true });
  document.getElementById("email").style.display = isRegistration ? "block" : "none";
  document.getElementById("loginMsg").innerHTML = "";
}

async function handleAuthSubmit() {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password || (isRegistrationMode && !email)) {
    showMessage("loginMsg", "Please fill in all required fields.");
    return;
  }

  const payload = { username, password };
  let path = "login";
  if (isRegistrationMode) {
    payload.email = email;
    path = "register";
  }
  console.log(payload);

  try {
    const response = await fetch(`/admin/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      showMessage("loginMsg", data.error || `${path} failed`);
      return;
    }

    console.log(data);
    console.log(data.token);
    if (path === "login") {
      token = data.token;
      localStorage.setItem("adminToken", token);
      switchView({ panel: true });
      loadUrls();
    } else {
      showMessage("loginMsg", "Registration successful. Please log in.", false);
      showAuthForm(false);
    }
  } catch (err) {
    showMessage("loginMsg", "Server error");
    // console.error(err);
  }
}

/* ----------------------------- URL Management ----------------------------- */

async function loadUrls() {
  try {
    const response = await fetch("/admin/urls", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const urls = await response.json();

    if (!response.ok) {
      showMessage("adminError", urls.error || "Failed to load URLs");
      return;
    }

    const urlList = document.getElementById("urlList");
    urlList.innerHTML = "";

    urls.forEach((url) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${url.shortCode}</td>
        <td>${url.longUrl}</td>
        <td>${new Date(url.createdAt).toLocaleString()}</td>
        <td>
          <button class="editButton" data-shortcode="${url.shortCode}" data-longurl="${url.longUrl.replace(/'/g, "\\'")}">Edit</button>
          <button class="deleteButton" data-shortcode="${url.shortCode}">Delete</button>
        </td>
      `;
      urlList.appendChild(row);
    });

    // Attach listeners
    document.querySelectorAll(".editButton").forEach((btn) =>
      btn.addEventListener("click", () => editUrl(btn.dataset.shortcode, btn.dataset.longurl))
    );
    document.querySelectorAll(".deleteButton").forEach((btn) =>
      btn.addEventListener("click", () => deleteUrl(btn.dataset.shortcode))
    );
  } catch (err) {
    showMessage("adminError", "Server error");
    console.error(err);
  }
}

function editUrl(shortCode, longUrl) {
  document.getElementById("editShortCode").value = shortCode;
  document.getElementById("editLongUrl").value = longUrl;
  document.getElementById("editForm").style.display = "block";
}

async function saveEdit() {
  const shortCode = document.getElementById("editShortCode").value;
  const longUrl = document.getElementById("editLongUrl").value;
  document.getElementById("adminError").innerHTML = "";

  try {
    const response = await fetch(`/admin/urls/${shortCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ longUrl }),
    });
    const data = await response.json();

    if (!response.ok) {
      showMessage("adminError", data.error || "Failed to update URL");
      return;
    }

    document.getElementById("editForm").style.display = "none";
    loadUrls();
  } catch (err) {
    showMessage("adminError", "Server error");
    console.error(err);
  }
}

function cancelEdit() {
  document.getElementById("editForm").style.display = "none";
  document.getElementById("adminError").innerHTML = "";
}

async function deleteUrl(shortCode) {
  document.getElementById("adminError").innerHTML = "";
  try {
    const response = await fetch(`/admin/urls/${shortCode}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (!response.ok) {
      showMessage("adminError", data.error || "Failed to delete URL");
      return;
    }

    loadUrls();
  } catch (err) {
    showMessage("adminError", "Server error");
    console.error(err);
  }
}

function logout() {
  token = null;
  localStorage.removeItem("adminToken");
  switchView({ login: true });
  document.getElementById("adminError").innerHTML = "";
}
