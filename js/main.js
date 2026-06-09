/**
 * ============================================
 * CV Portofolio - Main JavaScript
 * ============================================
 * Fitur:
 * - Real-time clock
 * - Foto profil dinamis
 * - Konfirmasi privasi sebelum print
 * - Interaktivitas halaman
 * ============================================
 */

// ============================================
// REAL-TIME CLOCK
// ============================================

/**
 * Fungsi untuk update jam dan tanggal secara real-time
 */
function updateClock() {
    const now = new Date();
    
    // Format jam: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Format tanggal: "Hari, DD Bulan YYYY"
    const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const namaBulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const dateElement = document.getElementById('live-date');
    if (dateElement) {
        dateElement.textContent = 
            `${namaHari[now.getDay()]}, ${String(now.getDate()).padStart(2, '0')} ${namaBulan[now.getMonth()]} ${now.getFullYear()}`;
    }
}

// Jalankan setiap detik
setInterval(updateClock, 1000);

// Panggil saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    
    // Tambahkan event listener untuk tombol print dengan konfirmasi
    setupPrintButton();
});

// ============================================
// FOTO PROFIL DINAMIS
// ============================================

/**
 * Fungsi untuk mengganti foto profil secara dinamis
 * @param {string} imageUrl - URL gambar foto profil
 */
function setProfilePhoto(imageUrl) {
    const photo = document.getElementById('profilePhoto');
    const placeholder = document.getElementById('photoContainer');
    
    if (photo && imageUrl) {
        photo.src = imageUrl;
        photo.style.display = 'block';
        photo.onerror = function() {
            this.style.display = 'none';
            if (placeholder) {
                placeholder.innerHTML = '👤';
            }
        };
    }
}

// Uncomment dan ganti dengan path foto Anda:
// setProfilePhoto('assets/profile-photo.jpg');

// ============================================
// KONFIRMASI PRIVASI SEBELUM PRINT
// ============================================

/**
 * Setup tombol print dengan konfirmasi privasi
 */
function setupPrintButton() {
    const printBtn = document.querySelector('.print-btn');
    
    if (printBtn) {
        // Override onclick default
        printBtn.onclick = function(e) {
            // Tampilkan konfirmasi
            const userConfirmed = confirm(
                '🖨️ CETAK CV / SIMPAN PDF\n\n' +
                '⚠️ PERHATIAN PRIVASI:\n' +
                'Data sensitif (Alamat, Email, No. HP, Tanggal Lahir)\n' +
                'akan MUNCUL di hasil cetakan/PDF.\n\n' +
                'Pastikan Anda menyimpan file dengan aman.\n\n' +
                'Lanjutkan mencetak?'
            );
            
            if (userConfirmed) {
                window.print();
            }
        };
    }
}

// ============================================
// DETEKSI SEBELUM PRINT (Browser Native)
// ============================================

window.addEventListener('beforeprint', function() {
    console.log('🔓 Data sensitif akan ditampilkan untuk keperluan cetak...');
    // Animasi atau persiapan tambahan bisa ditambahkan di sini
});

window.addEventListener('afterprint', function() {
    console.log('🔒 Kembali ke mode web - data sensitif disembunyikan');
});

// ============================================
// FUNGSI TAMBAHAN
// ============================================

/**
 * Toggle tampilan data sensitif (untuk preview)
 * @param {boolean} show - true untuk tampilkan, false untuk sembunyikan
 */
function toggleSensitiveData(show) {
    const sensitiveRows = document.querySelectorAll('.sensitive-data');
    
    sensitiveRows.forEach(row => {
        const webHidden = row.querySelector('.web-hidden');
        const printOnly = row.querySelector('.print-only');
        
        if (show) {
            // Tampilkan data sensitif
            if (webHidden) webHidden.style.display = 'none';
            if (printOnly) {
                printOnly.style.display = 'inline';
                printOnly.style.color = 'var(--dark-gray)';
                printOnly.style.fontStyle = 'normal';
                printOnly.style.background = 'none';
                printOnly.style.padding = '0';
                printOnly.style.border = 'none';
            }
        } else {
            // Sembunyikan data sensitif
            if (webHidden) webHidden.style.display = 'inline-block';
            if (printOnly) printOnly.style.display = 'none';
        }
    });
}

/**
 * Scroll ke section tertentu
 * @param {string} sectionId - ID section tujuan
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ============================================
// LOG APLIKASI
// ============================================
console.log('✅ CV Portofolio siap!');
console.log('🔒 Mode Privasi: Data sensitif disembunyikan di web');
console.log('🖨️ Data sensitif akan muncul saat dicetak/PDF');
console.log('📅 Jam digital berjalan...');
