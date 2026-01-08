// ===== SISTEM LOGIN/LOGOUT UNIVERSAL =====
// File: auth.js - Versi Debug

// Fungsi cek status login dan update navigasi
function updateNavigation() {
  console.log('=== UPDATE NAVIGATION CALLED ===');
  
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');
  
  console.log('Is Logged In:', isLoggedIn);
  console.log('Username:', username);
  console.log('User Role:', userRole);
  
  const navMenu = document.getElementById('nav-menu');
  console.log('Nav Menu Found:', navMenu);
  
  if (!navMenu) {
    console.error('ERROR: nav-menu tidak ditemukan!');
    return;
  }
  
  // Cari semua link di navigasi
  const links = navMenu.querySelectorAll('a');
  console.log('Total Links:', links.length);
  
  let loginLink = null;
  
  // Cari link login
  links.forEach(link => {
    console.log('Link href:', link.getAttribute('href'));
    if (link.getAttribute('href') === 'login.html') {
      loginLink = link;
    }
  });
  
  console.log('Login Link Found:', loginLink);
  
  if (!loginLink) {
    console.error('ERROR: Link login tidak ditemukan!');
    return;
  }
  
  if (isLoggedIn === 'true' && username) {
    console.log('User sudah login - mengubah jadi logout button');
    
    // User sudah login - ubah jadi tombol logout
    const parentLi = loginLink.parentElement;
    parentLi.innerHTML = `
      <a href="#" onclick="logout(event)" style="background: linear-gradient(135deg, #cd6155, #e74c3c); color: white; padding: 8px 16px; border-radius: 25px; font-size: 14px;">
        Logout (${username})
      </a>
    `;
    
    console.log('Logout button berhasil dibuat!');
  } else {
    console.log('User belum login');
    // User belum login - tampilkan tombol login
    loginLink.textContent = 'Login';
    loginLink.href = 'login.html';
    loginLink.style.background = '';
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
    alert('Logout berhasil! Terima kasih telah menggunakan Coffee House.');
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
  console.log('DOM Loaded - menjalankan updateNavigation()');
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