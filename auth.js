// ===== SISTEM LOGIN/LOGOUT UNIVERSAL =====
// File: auth.js

// Fungsi cek status login dan update navigasi
function updateNavigation() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');
  const navMenu = document.getElementById('nav-menu');
  
  if (!navMenu) return;
  
  // Cari semua link di navigasi
  const links = navMenu.querySelectorAll('a');
  let loginLink = null;
  
  // Cari link login
  links.forEach(link => {
    if (link.getAttribute('href') === 'login.html') {
      loginLink = link;
    }
  });
  
  if (!loginLink) return;
  
  if (isLoggedIn === 'true' && username) {
    // User sudah login - ubah text jadi "Logout (username)" dengan warna beda tipis
    loginLink.textContent = `Logout (${username})`;
    loginLink.href = '#';
    
    loginLink.onclick = function(event) {
      logout(event);
    };
  } else {
    // User belum login - tampilkan "Login" normal
    loginLink.textContent = 'Login';
    loginLink.href = 'login.html';
    loginLink.style.backgroundColor = ''; // Reset background
    loginLink.onclick = null;
  }
}

// Fungsi logout
function logout(event) {
  if (event) event.preventDefault();
  
  const username = localStorage.getItem('username');
  
  // Konfirmasi logout
  const confirmLogout = confirm(`Apakah Anda yakin ingin logout dari akun "${username}"?`);
  
  if (confirmLogout) {
    // Hapus semua data login dari localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    
    // Alert dan redirect ke halaman login
    alert('Logout berhasil! Terima kasih telah menggunakan Golden Coffee House.');
    window.location.href = 'login.html';
  }
}

// Fungsi toggle menu untuk mobile (hamburger)
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  if (menu) {
    menu.classList.toggle('hidden-nav');
  }
}

// Jalankan update navigasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  updateNavigation();
  
  // Auto show menu di desktop
  if (window.innerWidth > 768) {
    const menu = document.getElementById('nav-menu');
    if (menu) {
      menu.classList.remove('hidden-nav');
    }
  }
});

// Update navigasi saat window di-resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const menu = document.getElementById('nav-menu');
    if (menu) {
      menu.classList.remove('hidden-nav');
    }
  }
});