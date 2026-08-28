// ============================================
// REAL-TIME CLOCK
// ============================================
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
    const dateStr = now.toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    
    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock();

// ============================================
// MODAL PIN HANDLER
// ============================================
function openPinModal() {
    const modal = document.getElementById('pin-modal');
    if (modal) {
        modal.style.display = 'flex';
        const input = document.getElementById('input-pin');
        if (input) {
            input.value = '';
            input.focus();
        }
        const errorEl = document.getElementById('modal-error');
        if (errorEl) errorEl.textContent = '';
    }
}

function closePinModal() {
    const modal = document.getElementById('pin-modal');
    if (modal) modal.style.display = 'none';
    const errorEl = document.getElementById('modal-error');
    if (errorEl) errorEl.textContent = '';
}

// ============================================
// SUBMIT PIN - FETCH DATA DARI CLOUDFLARE
// ============================================
async function submitPin() {
    const pinVal = document.getElementById('input-pin').value;
    const errorEl = document.getElementById('modal-error');
    
    if (!pinVal) {
        errorEl.textContent = 'Harap masukkan PIN!';
        return;
    }

    errorEl.textContent = '⏳ Memverifikasi ke Cloudflare...';
    errorEl.style.color = '#856404';

    try {
        const response = await fetch('/api/get-cv-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: pinVal })
        });

        const result = await response.json();

        if (result.success) {
            const data = result.data;
            
            // Email
            const emailEl = document.getElementById('val-email');
            const emailPlaceholder = document.getElementById('email-placeholder');
            if (emailEl) {
                emailEl.textContent = data.email || 'Data tidak tersedia';
                emailEl.style.display = 'inline';
            }
            if (emailPlaceholder) emailPlaceholder.style.display = 'none';
            
            // Phone
            const phoneEl = document.getElementById('val-phone');
            const phonePlaceholder = document.getElementById('phone-placeholder');
            if (phoneEl) {
                phoneEl.textContent = data.phone || 'Data tidak tersedia';
                phoneEl.style.display = 'inline';
            }
            if (phonePlaceholder) phonePlaceholder.style.display = 'none';
            
            // Birthdate
            const birthEl = document.getElementById('val-birthdate');
            const birthPlaceholder = document.getElementById('birth-placeholder');
            if (birthEl) {
                birthEl.textContent = data.birthdate || 'Data tidak tersedia';
                birthEl.style.display = 'inline';
            }
            if (birthPlaceholder) birthPlaceholder.style.display = 'none';
            
            // Address
            const addrEl = document.getElementById('val-address');
            const addrPlaceholder = document.getElementById('addr-placeholder');
            if (addrEl) {
                addrEl.textContent = data.address || 'Data tidak tersedia';
                addrEl.style.display = 'inline';
            }
            if (addrPlaceholder) addrPlaceholder.style.display = 'none';
            
            // Sembunyikan tombol unlock
            const btnUnlock = document.getElementById('btn-unlock');
            if (btnUnlock) btnUnlock.style.display = 'none';
            
            closePinModal();
            alert('✅ Data sensitif berhasil dibuka!');
        } else {
            errorEl.textContent = '❌ ' + (result.message || 'PIN Salah!');
            errorEl.style.color = '#dc3545';
        }
    } catch (err) {
        errorEl.textContent = '❌ Gagal terhubung ke Cloudflare. Coba lagi.';
        errorEl.style.color = '#dc3545';
        console.error('Fetch error:', err);
    }
}

// ============================================
// EVENT LISTENER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const unlockBtn = document.getElementById('btn-unlock');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', openPinModal);
    }
    
    const pinInput = document.getElementById('input-pin');
    if (pinInput) {
        pinInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                submitPin();
            }
        });
    }
});
