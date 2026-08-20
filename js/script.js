// Real-time Clock Function
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
    const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    document.getElementById('live-time').textContent = timeStr;
    document.getElementById('live-date').textContent = dateStr;
}

setInterval(updateClock, 1000);
updateClock();

// Modal Handlers
function openPinModal() {
    document.getElementById('pin-modal').style.display = 'flex';
    document.getElementById('input-pin').focus();
}

function closePinModal() {
    document.getElementById('pin-modal').style.display = 'none';
    document.getElementById('modal-error').textContent = '';
    document.getElementById('input-pin').value = '';
}

// Fetch Sensitive Data from Cloudflare Pages Function
async function submitPin() {
    const pinVal = document.getElementById('input-pin').value;
    const errorEl = document.getElementById('modal-error');
    
    if (!pinVal) {
        errorEl.textContent = 'Harap masukkan PIN!';
        return;
    }

    errorEl.textContent = 'Memverifikasi ke Cloudflare...';

    try {
        const response = await fetch('/api/get-cv-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: pinVal })
        });

        const result = await response.json();

        if (result.success) {
            // Dekripsi tampilan
            document.getElementById('val-email').textContent = result.data.email;
            document.getElementById('val-email').classList.remove('sensitive-blur');

            document.getElementById('val-phone').textContent = result.data.phone;
            document.getElementById('val-phone').classList.remove('sensitive-blur');

            document.getElementById('val-birthdate').textContent = result.data.birthdate;
            document.getElementById('val-birthdate').classList.remove('sensitive-blur');

            document.getElementById('val-address').textContent = result.data.address;
            document.getElementById('val-address').classList.remove('sensitive-blur');

            // Sembunyikan Tombol
            document.getElementById('btn-unlock').style.display = 'none';

            closePinModal();
        } else {
            errorEl.textContent = result.message || 'PIN Salah!';
        }
    } catch (err) {
        errorEl.textContent = 'Gagal terhubung ke Cloudflare Edge.';
    }
}
