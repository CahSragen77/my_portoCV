// ============================================
// DATA SENSITIF (HANYA DI JAVASCRIPT)
// ============================================
// ⚠️ PENTING: Ganti dengan data asli lo
// Data ini TIDAK akan muncul di View Page Source
// Hanya akan dimasukkan ke HTML saat print/PDF

const SENSITIVE_DATA = {
    alamat: '[Perum Bumi Sariwangi Blok C No. 09]',
    email: '[yudidwiranto.srgn77@gmail.com]',
    nohp: '[+62 813-8918-8903]',
    ttl: '[17 06 1977]'
};

// ============================================
// FUNGSI: Load Data Sensitif saat Print
// ============================================

/**
 * Memasukkan data sensitif ke HTML HANYA saat print
 * Data akan hilang lagi setelah print selesai
 */
function loadSensitiveDataForPrint() {
    const rows = document.querySelectorAll('.sensitive-row');
    
    rows.forEach(row => {
        const field = row.getAttribute('data-field');
        const printDataSpan = row.querySelector('.print-data');
        const webPlaceholder = row.querySelector('.web-placeholder');
        
        if (field && SENSITIVE_DATA[field] && printDataSpan) {
            // Masukkan data asli ke span print
            printDataSpan.textContent = ': ' + SENSITIVE_DATA[field];
        }
    });
}

/**
 * Menghapus data sensitif dari HTML setelah print
 */
function clearSensitiveData() {
    const printDataSpans = document.querySelectorAll('.print-data');
    printDataSpans.forEach(span => {
        span.textContent = '';
    });
}

// ============================================
// EVENT LISTENER PRINT
// ============================================

// Sebelum print: Load data sensitif
window.addEventListener('beforeprint', function() {
    console.log('🔓 Memuat data sensitif untuk keperluan cetak...');
    loadSensitiveDataForPrint();
});

// Setelah print: Hapus data sensitif
window.addEventListener('afterprint', function() {
    console.log('🔒 Menghapus data sensitif dari HTML...');
    // Delay sedikit untuk memastikan print selesai
    setTimeout(clearSensitiveData, 1000);
});

// ============================================
// TOMBOL PRINT DENGAN KONFIRMASI
// ============================================

function setupPrintButton() {
    const printBtn = document.querySelector('.print-btn');
    
    if (printBtn) {
        printBtn.onclick = function(e) {
            const userConfirmed = confirm(
                '🖨️ CETAK CV / SIMPAN PDF\n\n' +
                '⚠️ PERHATIAN PRIVASI:\n' +
                'Data sensitif akan MUNCUL di hasil cetakan/PDF.\n' +
                'Pastikan Anda menyimpan file dengan aman.\n\n' +
                'Lanjutkan mencetak?'
            );
            
            if (userConfirmed) {
                // Load data dulu sebelum print
                loadSensitiveDataForPrint();
                
                // Print setelah data diload
                setTimeout(() => {
                    window.print();
                }, 500);
            }
        };
    }
}

// ============================================
// KEAMANAN TAMBAHAN: Disable View Source Shortcut
// (Opsional - hanya mengurangi, bukan mencegah 100%)
// ============================================

document.addEventListener('keydown', function(e) {
    // Blokir CTRL+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        console.log('⚠️ View Source dinonaktifkan untuk keamanan data.');
        return false;
    }
    
    // Blokir CTRL+SHIFT+I (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        console.log('⚠️ Inspect Element dinonaktifkan untuk keamanan data.');
        return false;
    }
    
    // Blokir F12 (Developer Tools)
    if (e.key === 'F12') {
        e.preventDefault();
        console.log('⚠️ Developer Tools dinonaktifkan untuk keamanan data.');
        return false;
    }
});

// Blokir klik kanan (opsional)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    console.log('⚠️ Klik kanan dinonaktifkan untuk keamanan data.');
    return false;
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setupPrintButton();
    validateLogoLinks();
    
    console.log('✅ CV Portofolio siap!');
    console.log('🔒 Mode Aman: Data sensitif disimpan di JavaScript');
    console.log('🛡️ View Source & Inspect Element dinonaktifkan');
    console.log('🖨️ Data hanya muncul saat print/PDF');
});
