// ── State ──────────────────────────────────────────────────────────────
let baseUrl = '';
let token = '';
let inspectorHistory = [];
let inspectorIdx = -1;
let currentInspectorTab = 'curl';
let currentHotelId = null;
let currentIsType = 'TRAVEL';
let currentRoomsList = [];
let currentBannersList = [];

// ── Init ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  baseUrl = localStorage.getItem('admin_base_url') || 'http://localhost:3000';
  token = localStorage.getItem('admin_token') || '';
  document.getElementById('baseUrl').value = baseUrl;
  document.getElementById('tokenInput').value = token;
  updateTokenStatus();
  
  document.getElementById('saveBtn').addEventListener('click', saveSettings);
  
  // Hash routing
  window.addEventListener('hashchange', route);
  route();
  
  // Load initial data for active pages
  loadRentacarCompaniesDropdowns();
});

function saveSettings() {
  baseUrl = document.getElementById('baseUrl').value.trim();
  token = document.getElementById('tokenInput').value.trim();
  localStorage.setItem('admin_base_url', baseUrl);
  localStorage.setItem('admin_token', token);
  updateTokenStatus();
  showToast('Settings saved', 'success');
}

function updateTokenStatus() {
  const dot = document.getElementById('tokenDot');
  const status = document.getElementById('tokenStatus');
  if (token) {
    dot.className = 'dot on';
    status.textContent = 'Authenticated';
  } else {
    dot.className = 'dot off';
    status.textContent = 'No token';
  }
}

function useToken(newToken) {
  document.getElementById('tokenInput').value = newToken;
  token = newToken;
  localStorage.setItem('admin_token', token);
  updateTokenStatus();
  showToast('Token set', 'success');
}

// ── Routing ────────────────────────────────────────────────────────────
function route() {
  const hash = window.location.hash.slice(1) || 'auth';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + hash);
  if (page) page.classList.add('active');
  const link = document.querySelector(`.sidebar a[href="#${hash}"]`);
  if (link) link.classList.add('active');
  
  // Load data on navigation
  switch(hash) {
    case 'hotel': loadHotels(); break;
    case 'rentacar': loadRentacarCompanies(); loadRentacarCompaniesDropdowns(); loadRentacarCars(); break;
    case 'travel': loadTravelCompanies(); loadTravelCompaniesDropdowns(); loadTravelTours(); break;
    case 'food': loadFoodCompanies(); loadFoodCompaniesDropdowns(); loadFoodItems(); break;
    case 'included-services': loadIncludedServices(); break;
    case 'reviews': loadReviews(); break;
    case 'orders': loadOrders(); break;
    case 'banner': loadBanners(); break;
    case 'wishlist': loadWishlist(); break;
  }
}

// ── Toast ──────────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── API Helper ─────────────────────────────────────────────────────────
async function api(method, path, body, isMultipart = false) {
  const url = baseUrl.replace(/\/+$/, '') + path;
  const headers = {};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  if (!isMultipart) headers['Content-Type'] = 'application/json';
  
  const opts = { method, headers };
  if (body !== undefined) {
    opts.body = isMultipart ? body : JSON.stringify(body);
  }
  
  const startTime = performance.now();
  let res, data;
  try {
    res = await fetch(url, opts);
    const text = await res.text();
    try { data = JSON.parse(text); } catch { data = text; }
  } catch (err) {
    data = { error: err.message };
    res = { status: 0, headers: new Headers() };
  }
  const duration = ((performance.now() - startTime) / 1000).toFixed(2);
  
  // Log to inspector — use spread on plain object, not .entries()
  const entry = {
    method, url, headers: { ...opts.headers },
    body: isMultipart ? '(multipart)' : body,
    status: res.status,
    response: data,
    responseHeaders: res.headers ? Object.fromEntries([...res.headers]) : {},
    duration,
    multipart: isMultipart,
  };
  inspectorHistory.push(entry);
  if (inspectorHistory.length > 20) inspectorHistory.shift();
  inspectorIdx = inspectorHistory.length - 1;
  updateInspector();
  
  return { status: res.status, data };
}

/**
 * Wraps a mutating api() call: shows a success toast and runs onSuccess
 * only if the response indicates success; otherwise shows the server's
 * real error message (or a generic fallback) and does NOT run onSuccess.
 */
async function apiMutate(method, path, body, isMultipart, successMessage, onSuccess) {
  const { status, data } = await api(method, path, body, isMultipart);
  const ok = status >= 200 && status < 300 && data?.success !== false;
  if (ok) {
    if (onSuccess) onSuccess(data);
    showToast(successMessage, 'success');
  } else {
    const message = data?.message || data?.errorCode || `Request failed (status ${status})`;
    showToast(message, 'error');
  }
  return ok;
}

/**
 * Builds a FormData body for a multipart admin endpoint: every non-file
 * field goes into a single JSON-stringified `data` field, and each entry in
 * `fileFields` becomes its own file part (skipped entirely if no file was
 * chosen, so existing URL-string values already in `jsonFields` pass
 * through untouched on update).
 *
 * fileFields: { fieldName: HTMLInputElement (type=file, single or multiple) }
 */
function buildMultipartBody(jsonFields, fileFields) {
  const formData = new FormData();
  formData.append('data', JSON.stringify(jsonFields));
  for (const [field, input] of Object.entries(fileFields)) {
    if (!input.files || input.files.length === 0) continue;
    if (input.multiple) {
      [...input.files].forEach((file) => formData.append(field, file));
    } else {
      formData.append(field, input.files[0]);
    }
  }
  return formData;
}

/**
 * Wraps a submit-button click handler so the button disables itself (and
 * shows a busy label) for the duration of the async action, re-enabling
 * it afterward regardless of success or failure.
 */
async function withButtonBusy(button, busyLabel, action) {
  const originalLabel = button.textContent;
  const originalDisabled = button.disabled;
  button.disabled = true;
  button.textContent = busyLabel;
  try {
    await action();
  } finally {
    button.disabled = originalDisabled;
    button.textContent = originalLabel;
  }
}

// ── Inspector ──────────────────────────────────────────────────────────
function toggleInspector() {
  const insp = document.getElementById('inspector');
  const body = document.getElementById('inspectorBody');
  const arrow = document.getElementById('inspectorArrow');
  insp.classList.toggle('collapsed');
  body.classList.toggle('hidden');
  arrow.textContent = insp.classList.contains('collapsed') ? '▲' : '▼';
}

function switchInspectorTab(tab) {
  currentInspectorTab = tab;
  document.querySelectorAll('#inspectorTabs button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  updateInspector();
}

function updateInspector() {
  const content = document.getElementById('inspectorContent');
  const history = document.getElementById('inspectorHistory');
  
  // History buttons
  history.innerHTML = '';
  inspectorHistory.forEach((e, i) => {
    const btn = document.createElement('button');
    btn.textContent = `${e.method} ${e.status}`;
    btn.className = i === inspectorIdx ? 'active' : '';
    btn.onclick = () => { inspectorIdx = i; updateInspector(); };
    history.appendChild(btn);
  });
  
  if (inspectorIdx < 0 || inspectorIdx >= inspectorHistory.length) {
    content.textContent = 'No requests yet.';
    return;
  }
  
  const entry = inspectorHistory[inspectorIdx];
  let html = '';
  
  switch(currentInspectorTab) {
    case 'curl': {
      let curl = `curl -X ${entry.method} "${entry.url}"`;
      if (token) curl += ` \\\n  -H "Authorization: Bearer ${token}"`;
      if (!entry.multipart && entry.body && entry.body !== undefined) {
        curl += ` \\\n  -H "Content-Type: application/json"`;
        const bodyStr = typeof entry.body === 'string' ? entry.body : JSON.stringify(entry.body);
        curl += ` \\\n  -d '${bodyStr.replace(/'/g, "\\'")}'`;
      }
      if (entry.multipart) {
        curl += ` \\\n  -F "data=..."`;
        curl += ` \\\n  -F "image=@file.jpg"`;
      }
      html = `<button class="copy-btn" onclick="copyInspector()">Copy</button>`;
      html += `<span class="status-badge s${entry.status < 300 ? '2' : entry.status < 400 ? '3' : '4'}xx">${entry.status} in ${entry.duration}s</span>\n`;
      html += `<span style="color:var(--accent)">${entry.method}</span> ${entry.url}\n\n`;
      html += highlightJson(curl);
      break;
    }
    case 'body': {
      html = `<span class="status-badge s${entry.status < 300 ? '2' : entry.status < 400 ? '3' : '4'}xx">${entry.status} in ${entry.duration}s</span>\n`;
      if (entry.multipart) {
        html += '<em style="color:var(--text-muted)">multipart/form-data — binary body not shown in JSON format</em>';
      } else if (entry.body) {
        html += highlightJson(typeof entry.body === 'string' ? entry.body : JSON.stringify(entry.body, null, 2));
      } else {
        html += '<em style="color:var(--text-muted)">No request body</em>';
      }
      break;
    }
    case 'response': {
      const statusClass = entry.status < 300 ? 's2xx' : entry.status < 400 ? 's3xx' : 's4xx';
      html = `<span class="status-badge ${statusClass}">${entry.status} in ${entry.duration}s</span>\n`;
      html += highlightJson(typeof entry.response === 'string' ? entry.response : JSON.stringify(entry.response, null, 2));
      break;
    }
    case 'headers': {
      html = `<span class="status-badge s${entry.status < 300 ? '2' : entry.status < 400 ? '3' : '4'}xx">${entry.status} in ${entry.duration}s</span>\n`;
      html += '<strong style="color:var(--accent)">Request Headers:</strong>\n';
      for (const [k, v] of Object.entries(entry.headers)) {
        html += `  ${k}: ${v}\n`;
      }
      html += '\n<strong style="color:var(--accent)">Response Headers:</strong>\n';
      for (const [k, v] of Object.entries(entry.responseHeaders)) {
        html += `  ${k}: ${v}\n`;
      }
      break;
    }
  }
  
  content.innerHTML = html;
}

function copyInspector() {
  const text = document.getElementById('inspectorContent').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('Copied!', 'success'));
}

// ── JSON Highlight ─────────────────────────────────────────────────────
function highlightJson(str) {
  if (typeof str !== 'string') str = JSON.stringify(str, null, 2);
  return str.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
    .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
    .replace(/: (null)/g, ': <span class="json-null">$1</span>');
}

// ── File Preview ───────────────────────────────────────────────────────
function previewFile(input, previewId) {
  const preview = document.getElementById(previewId);
  if (input.files && input.files[0]) {
    preview.src = URL.createObjectURL(input.files[0]);
    preview.className = 'file-preview show';
  } else {
    preview.className = 'file-preview';
  }
}

// ── Modal ──────────────────────────────────────────────────────────────
function openModal(title, bodyHtml) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// ── Localized Input Builder ────────────────────────────────────────────
function localizedInputs(id, values = {}) {
  return `<div class="localized-inputs">
    <div style="flex:1"><input id="${id}-az" placeholder="AZ" value="${(values.az || '')}"><div class="lang-label">AZ</div></div>
    <div style="flex:1"><input id="${id}-en" placeholder="EN" value="${(values.en || '')}"><div class="lang-label">EN</div></div>
    <div style="flex:1"><input id="${id}-ru" placeholder="RU" value="${(values.ru || '')}"><div class="lang-label">RU</div></div>
  </div>`;
}

function getLocalized(id) {
  const az = document.getElementById(`${id}-az`)?.value || '';
  const en = document.getElementById(`${id}-en`)?.value || '';
  const ru = document.getElementById(`${id}-ru`)?.value || '';
  if (!az && !en && !ru) return undefined;
  return { az, en, ru };
}

// ── Auth ───────────────────────────────────────────────────────────────
async function authRegister() {
  const body = {
    name: document.getElementById('auth-reg-name').value,
    email: document.getElementById('auth-reg-email').value,
    password: document.getElementById('auth-reg-password').value,
  };
  const { data } = await api('POST', '/api/auth/register', body);
  if (data?.data?.accessToken) {
    showToast('Registered! Use token?', 'success');
    document.getElementById('auth-reg-name').value = '';
    document.getElementById('auth-reg-email').value = '';
    document.getElementById('auth-reg-password').value = '';
  }
}

async function authLogin() {
  const body = {
    email: document.getElementById('auth-login-email').value,
    password: document.getElementById('auth-login-password').value,
  };
  const { data } = await api('POST', '/api/auth/login', body);
  if (data?.data?.accessToken) {
    useToken(data.data.accessToken);
    document.getElementById('auth-login-email').value = '';
    document.getElementById('auth-login-password').value = '';
  }
}

async function authRefresh() {
  const body = { refreshToken: document.getElementById('auth-refresh-token').value };
  const { data } = await api('POST', '/api/auth/refresh', body);
  if (data?.data?.accessToken) useToken(data.data.accessToken);
}

async function authGoogle() {
  const body = { idToken: document.getElementById('auth-google-token').value };
  const { data } = await api('POST', '/api/auth/google', body);
  if (data?.data?.accessToken) useToken(data.data.accessToken);
}

// ── Users ──────────────────────────────────────────────────────────────
async function loadProfile() {
  const { data } = await api('GET', '/api/users/me');
  document.getElementById('profile-display').innerHTML = data?.data ? highlightJson(JSON.stringify(data.data, null, 2)) : 'No data';
}

async function updateProfile() {
  const body = {};
  const name = document.getElementById('user-name').value;
  const phone = document.getElementById('user-phone').value;
  const region = document.getElementById('user-region').value;
  const lang = document.getElementById('user-lang').value;
  if (name) body.name = name;
  if (phone) body.phone = phone;
  if (region) body.region = region;
  if (lang) body.language = lang;
  const { data } = await api('PUT', '/api/users/me', body);
  if (data?.success) showToast('Profile updated', 'success');
}

async function uploadAvatar() {
  const fileInput = document.getElementById('avatar-file');
  if (!fileInput.files[0]) { showToast('Select a file first', 'error'); return; }
  const formData = new FormData();
  formData.append('avatar', fileInput.files[0]);
  const { data } = await api('PUT', '/api/users/me/avatar', formData, true);
  if (data?.success) showToast('Avatar uploaded', 'success');
}

async function disableUser() {
  const id = document.getElementById('disable-user-id').value;
  if (!id || !confirm('Disable user ' + id + '?')) return;
  await apiMutate('PUT', `/api/users/${id}/disable`, undefined, false, 'User disabled', () => {});
}

// ── Wishlist ───────────────────────────────────────────────────────────
async function loadWishlist() {
  const { data } = await api('GET', '/api/user/wishlist');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Data</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const id = item.wishlistItemId || '';
    html += `<tr><td>${id}</td><td>${highlightJson(JSON.stringify(item, null, 2))}</td>
      <td class="actions"><button class="btn-delete" onclick="deleteWishlist('${id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('wishlist-table').innerHTML = html;
}

function showWishlistForm() {
  openModal('Add to Wishlist', `
    <div class="form-group"><label>Service Type</label>
      <select id="wl-type"><option value="HOTEL">HOTEL</option><option value="RENT_A_CAR">RENT_A_CAR</option><option value="TRAVEL">TRAVEL</option><option value="FOOD">FOOD</option></select></div>
    <div class="form-group"><label>Service ID</label><input id="wl-serviceId" placeholder="Service ID"></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Adding…', addWishlist)">Add</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function addWishlist() {
  const body = {
    serviceType: document.getElementById('wl-type').value,
    serviceId: document.getElementById('wl-serviceId').value,
  };
  const { data } = await api('POST', '/api/user/wishlist', body);
  if (data?.success) { closeModal(); loadWishlist(); showToast('Added to wishlist', 'success'); }
}

async function deleteWishlist(id) {
  if (!confirm('Remove from wishlist?')) return;
  await apiMutate('DELETE', `/api/user/wishlist/${id}`, undefined, false, 'Removed', () => {
    loadWishlist();
  });
}

// ── Hotel ──────────────────────────────────────────────────────────────
async function loadHotels() {
  const params = new URLSearchParams();
  ['minPrice','maxPrice','starRating','city','minRating','name'].forEach(f => {
    const v = document.getElementById('hotel-f-' + f)?.value;
    if (v) params.set(f, v);
  });
  const qs = params.toString() ? '?' + params.toString() : '';
  const { data } = await api('GET', '/api/services/hotel' + qs);
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Name</th><th>City</th><th>Price</th><th>Rating</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || item.name?.ru || '';
    html += `<tr>
      <td>${item.id || ''}</td>
      <td>${name}</td>
      <td>${item.city || ''}</td>
      <td>${item.price || ''}</td>
      <td>${item.rating || ''}</td>
      <td class="actions">
        <button class="btn-edit" onclick="editHotel('${item.id}')">Edit</button>
        <button class="btn-edit" onclick="viewHotelRooms('${item.id}')">Rooms</button>
        <button class="btn-delete" onclick="deleteHotel('${item.id}')">Delete</button>
      </td></tr>`;
  });
  html += '</table>';
  document.getElementById('hotel-table').innerHTML = html;
}

function showHotelForm(data) {
  const d = data || {};
  const n = d.name || {};
  openModal(data ? 'Edit Hotel' : 'Create Hotel', `
    <div class="form-group"><label>Name</label>${localizedInputs('hotel-name', n)}</div>
    <div class="form-group"><label>About</label>${localizedInputs('hotel-about', d.about || {})}</div>
    <div class="form-row">
      <div class="form-group"><label>City</label><input id="hotel-city" value="${d.city || ''}"></div>
      <div class="form-group"><label>Star Rating</label><input id="hotel-star" type="number" min="1" max="5" value="${d.starRating || ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Price</label><input id="hotel-price" type="number" value="${d.price || ''}"></div>
      <div class="form-group"><label>Address</label><input id="hotel-address" value="${d.address || ''}"></div>
    </div>
    <div class="form-group"><label>Logo (file)</label><input id="hotel-logo" type="file" onchange="previewFile(this,'hotel-logo-preview')"><img class="file-preview" id="hotel-logo-preview"></div>
    <div class="form-group"><label>Images (files)</label><input id="hotel-images" type="file" multiple onchange="previewFile(this,'hotel-images-preview')"><img class="file-preview" id="hotel-images-preview"></div>
    <div class="form-group"><label>Amenities (comma-separated)</label><input id="hotel-amenities" value="${(d.amenities||[]).join(', ')}"></div>
    <div class="form-group"><label>Sections Order (comma-separated)</label><input id="hotel-sections" value="${(d.sectionsOrder||[]).join(', ')}"></div>
    <div class="form-group"><label>Status</label>
      <select id="hotel-status"><option value="ACTIVE" ${d.status==='ACTIVE'?'selected':''}>ACTIVE</option><option value="INACTIVE" ${d.status==='INACTIVE'?'selected':''}>INACTIVE</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateHotel('${data.id}')` : 'createHotel'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createHotel() {
  const jsonFields = {
    name: getLocalized('hotel-name'),
    city: document.getElementById('hotel-city').value,
    starRating: parseInt(document.getElementById('hotel-star').value),
    price: parseFloat(document.getElementById('hotel-price').value),
    status: document.getElementById('hotel-status').value,
  };
  const about = getLocalized('hotel-about');
  if (about) jsonFields.about = about;
  const addr = document.getElementById('hotel-address').value;
  if (addr) jsonFields.address = addr;
  const am = document.getElementById('hotel-amenities').value;
  if (am) jsonFields.amenities = am.split(',').map(s => s.trim()).filter(Boolean);
  const sec = document.getElementById('hotel-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    logo: document.getElementById('hotel-logo'),
    images: document.getElementById('hotel-images'),
  });
  
  await apiMutate('POST', '/api/services/hotel', body, true, 'Hotel created', () => {
    closeModal();
    loadHotels();
  });
}

async function editHotel(id) {
  const { data } = await api('GET', `/api/services/hotel/${id}`);
  const d = data?.data || data;
  if (d) showHotelForm({ ...d, id });
}

async function updateHotel(id) {
  const jsonFields = {
    name: getLocalized('hotel-name'),
    city: document.getElementById('hotel-city').value,
    starRating: parseInt(document.getElementById('hotel-star').value),
    price: parseFloat(document.getElementById('hotel-price').value),
    status: document.getElementById('hotel-status').value,
  };
  const about = getLocalized('hotel-about');
  if (about) jsonFields.about = about;
  const addr = document.getElementById('hotel-address').value;
  if (addr) jsonFields.address = addr;
  const am = document.getElementById('hotel-amenities').value;
  if (am) jsonFields.amenities = am.split(',').map(s => s.trim()).filter(Boolean);
  const sec = document.getElementById('hotel-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    logo: document.getElementById('hotel-logo'),
    images: document.getElementById('hotel-images'),
  });
  
  await apiMutate('PUT', `/api/services/hotel/${id}`, body, true, 'Hotel updated', () => {
    closeModal();
    loadHotels();
  });
}

async function deleteHotel(id) {
  if (!confirm('Delete hotel ' + id + '?')) return;
  await apiMutate('DELETE', `/api/services/hotel/${id}`, undefined, false, 'Hotel deleted', () => {
    loadHotels();
  });
}

// ── Hotel Rooms ────────────────────────────────────────────────────────
async function viewHotelRooms(hotelId) {
  currentHotelId = hotelId;
  document.getElementById('hotel-rooms-section').style.display = 'block';
  document.getElementById('hotel-rooms-title').textContent = `Rooms for Hotel ${hotelId}`;
  const { data } = await api('GET', `/api/services/hotel/${hotelId}/rooms`);
  const items = data?.data || data || [];
  currentRoomsList = Array.isArray(items) ? items : [];
  const arr = currentRoomsList;
  let html = '<table><tr><th>ID</th><th>Name</th><th>Type</th><th>Price</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || '';
    html += `<tr><td>${item.id}</td><td>${name}</td><td>${item.roomType||''}</td><td>${item.price||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editRoom('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteRoom('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('hotel-rooms-table').innerHTML = html;
}

function showRoomForm(data) {
  const d = data || {};
  openModal(data ? 'Edit Room' : 'Create Room', `
    <div class="form-group"><label>Name</label>${localizedInputs('room-name', d.name || {})}</div>
    <div class="form-group"><label>Description</label>${localizedInputs('room-desc', d.description || {})}</div>
    <div class="form-row">
      <div class="form-group"><label>Room Type</label><input id="room-type" value="${d.roomType || ''}"></div>
      <div class="form-group"><label>Price</label><input id="room-price" type="number" value="${d.price || ''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Capacity</label><input id="room-capacity" type="number" value="${d.capacity || ''}"></div>
      <div class="form-group"><label>Status</label>
        <select id="room-status"><option value="AVAILABLE" ${d.status==='AVAILABLE'?'selected':''}>AVAILABLE</option><option value="UNAVAILABLE" ${d.status==='UNAVAILABLE'?'selected':''}>UNAVAILABLE</option></select></div>
    </div>
    <div class="form-group"><label>Images (files)</label><input id="room-images" type="file" multiple onchange="previewFile(this,'room-images-preview')"><img class="file-preview" id="room-images-preview"></div>
    <div class="form-group"><label>Amenities (comma-separated)</label><input id="room-amenities" value="${(d.amenities||[]).join(', ')}"></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateRoom('${data.id}')` : 'createRoom'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createRoom() {
  if (!currentHotelId) { showToast('Select a hotel first', 'error'); return; }
  const jsonFields = {
    hotelId: currentHotelId,
    name: getLocalized('room-name'),
    roomType: document.getElementById('room-type').value,
    price: parseFloat(document.getElementById('room-price').value),
    capacity: parseInt(document.getElementById('room-capacity').value),
    status: document.getElementById('room-status').value,
  };
  const desc = getLocalized('room-desc');
  if (desc) jsonFields.description = desc;
  const am = document.getElementById('room-amenities').value;
  if (am) jsonFields.amenities = am.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('room-images'),
  });
  
  await apiMutate('POST', '/api/services/hotel/rooms', body, true, 'Room created', () => {
    closeModal();
    viewHotelRooms(currentHotelId);
  });
}

async function editRoom(id) {
  const room = currentRoomsList.find((r) => r.id === id);
  showRoomForm(room || { id });
}

async function updateRoom(id) {
  const jsonFields = {
    name: getLocalized('room-name'),
    roomType: document.getElementById('room-type').value,
    price: parseFloat(document.getElementById('room-price').value),
    capacity: parseInt(document.getElementById('room-capacity').value),
    status: document.getElementById('room-status').value,
  };
  const desc = getLocalized('room-desc');
  if (desc) jsonFields.description = desc;
  const am = document.getElementById('room-amenities').value;
  if (am) jsonFields.amenities = am.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('room-images'),
  });
  
  await apiMutate('PUT', `/api/services/hotel/rooms/${id}`, body, true, 'Room updated', () => {
    closeModal();
    viewHotelRooms(currentHotelId);
  });
}

async function deleteRoom(id) {
  if (!confirm('Delete room?')) return;
  await apiMutate('DELETE', `/api/services/hotel/rooms/${id}`, undefined, false, 'Room deleted', () => {
    viewHotelRooms(currentHotelId);
  });
}

// ── RentACar ───────────────────────────────────────────────────────────
async function loadRentacarCompanies() {
  const { data } = await api('GET', '/api/services/rentacar/companies');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Name</th><th>Rating</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || '';
    html += `<tr><td>${item.id||''}</td><td>${name}</td><td>${item.rating||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editRentacarCompany('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteRentacarCompany('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('rentacar-companies-table').innerHTML = html;
}

async function loadRentacarCompaniesDropdowns() {
  const { data } = await api('GET', '/api/services/rentacar/companies');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let opts = '<option value="">All Companies</option>';
  arr.forEach(c => {
    const name = c.name?.en || c.name?.az || c.id;
    opts += `<option value="${c.id}">${name}</option>`;
  });
  document.getElementById('car-f-companyId').innerHTML = opts;
}

function showRentacarCompanyForm(data) {
  const d = data || {};
  const n = d.name || {};
  openModal(data ? 'Edit Company' : 'Create Company', `
    <div class="form-group"><label>Name</label>${localizedInputs('rc-name', n)}</div>
    <div class="form-group"><label>About</label>${localizedInputs('rc-about', d.about || {})}</div>
    <div class="form-group"><label>Sections Order (comma-separated)</label><input id="rc-sections" value="${(d.sectionsOrder||[]).join(', ')}"></div>
    <div class="form-group"><label>Profile Image (file)</label>
      <input id="rc-profileImage" type="file" onchange="previewFile(this,'rc-profileImage-preview')">
      <img class="file-preview" id="rc-profileImage-preview">
      ${data && d.profileImage ? `<p style="color:var(--text-muted);font-size:11px;margin-top:4px">Current: ${d.profileImage}</p>` : ''}</div>
    <div class="form-group"><label>Banner Image (file)</label>
      <input id="rc-bannerImage" type="file" onchange="previewFile(this,'rc-bannerImage-preview')">
      <img class="file-preview" id="rc-bannerImage-preview">
      ${data && d.bannerImage ? `<p style="color:var(--text-muted);font-size:11px;margin-top:4px">Current: ${d.bannerImage}</p>` : ''}</div>
    <div class="form-group"><label>Images (files)</label>
      <input id="rc-images" type="file" multiple onchange="previewFile(this,'rc-images-preview')">
      <img class="file-preview" id="rc-images-preview"></div>
    <div class="form-group"><label>Status</label>
      <select id="rc-status"><option value="ACTIVE" ${d.status==='ACTIVE'?'selected':''}>ACTIVE</option><option value="INACTIVE" ${d.status==='INACTIVE'?'selected':''}>INACTIVE</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateRentacarCompany('${data.id}')` : 'createRentacarCompany'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createRentacarCompany() {
  const jsonFields = { name: getLocalized('rc-name'), status: document.getElementById('rc-status').value };
  const about = getLocalized('rc-about');
  if (about) jsonFields.about = about;
  const sec = document.getElementById('rc-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    profileImage: document.getElementById('rc-profileImage'),
    bannerImage: document.getElementById('rc-bannerImage'),
    images: document.getElementById('rc-images'),
  });
  
  await apiMutate('POST', '/api/services/rentacar/companies', body, true, 'Company created', () => {
    closeModal();
    loadRentacarCompanies();
    loadRentacarCompaniesDropdowns();
  });
}

async function editRentacarCompany(id) {
  const { data } = await api('GET', `/api/services/rentacar/companies/${id}`);
  const d = data?.data || data;
  if (d) showRentacarCompanyForm({ ...d, id });
}

async function updateRentacarCompany(id) {
  const jsonFields = { name: getLocalized('rc-name'), status: document.getElementById('rc-status').value };
  const about = getLocalized('rc-about');
  if (about) jsonFields.about = about;
  const sec = document.getElementById('rc-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    profileImage: document.getElementById('rc-profileImage'),
    bannerImage: document.getElementById('rc-bannerImage'),
    images: document.getElementById('rc-images'),
  });
  
  await apiMutate('PUT', `/api/services/rentacar/companies/${id}`, body, true, 'Company updated', () => {
    closeModal();
    loadRentacarCompanies();
  });
}

async function deleteRentacarCompany(id) {
  if (!confirm('Delete company?')) return;
  await apiMutate('DELETE', `/api/services/rentacar/companies/${id}`, undefined, false, 'Deleted', () => {
    loadRentacarCompanies();
    loadRentacarCompaniesDropdowns();
  });
}

// ── RentACar Cars ──────────────────────────────────────────────────────
async function loadRentacarCars() {
  const params = new URLSearchParams();
  ['companyId','minPrice','maxPrice','brand','model','category','transmission','fuelType'].forEach(f => {
    const v = document.getElementById('car-f-' + f)?.value;
    if (v) params.set(f, v);
  });
  const qs = params.toString() ? '?' + params.toString() : '';
  const { data } = await api('GET', '/api/services/rentacar/cars' + qs);
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Brand</th><th>Model</th><th>Price</th><th>Actions</th></tr>';
  arr.forEach(item => {
    html += `<tr><td>${item.id||''}</td><td>${item.brand||''}</td><td>${item.model||''}</td><td>${item.price||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editRentacarCar('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteRentacarCar('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('rentacar-cars-table').innerHTML = html;
}

function showRentacarCarForm(data) {
  const d = data || {};
  const companyOpts = document.getElementById('car-f-companyId').innerHTML.replace('All Companies', 'Select Company');
  openModal(data ? 'Edit Car' : 'Create Car', `
    <div class="form-group"><label>Company</label><select id="car-companyId">${companyOpts}</select></div>
    <div class="form-row">
      <div class="form-group"><label>Brand</label><input id="car-brand" value="${d.brand||''}"></div>
      <div class="form-group"><label>Model</label><input id="car-model" value="${d.model||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Year</label><input id="car-year" type="number" value="${d.year||''}"></div>
      <div class="form-group"><label>Price</label><input id="car-price" type="number" value="${d.price||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Category</label><input id="car-category" value="${d.category||''}"></div>
      <div class="form-group"><label>Seats</label><input id="car-seats" type="number" value="${d.seats||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Transmission</label>
        <select id="car-transmission"><option value="AUTOMATIC" ${d.transmission==='AUTOMATIC'?'selected':''}>AUTOMATIC</option><option value="MANUAL" ${d.transmission==='MANUAL'?'selected':''}>MANUAL</option></select></div>
      <div class="form-group"><label>Fuel Type</label>
        <select id="car-fuelType"><option value="PETROL" ${d.fuelType==='PETROL'?'selected':''}>PETROL</option><option value="DIESEL" ${d.fuelType==='DIESEL'?'selected':''}>DIESEL</option><option value="ELECTRIC" ${d.fuelType==='ELECTRIC'?'selected':''}>ELECTRIC</option><option value="HYBRID" ${d.fuelType==='HYBRID'?'selected':''}>HYBRID</option></select></div>
    </div>
    <div class="form-group"><label>Features (comma-separated)</label><input id="car-features" value="${(d.features||[]).join(', ')}"></div>
    <div class="form-group"><label>Images (files, at least one required)</label>
      <input id="car-images" type="file" multiple onchange="previewFile(this,'car-images-preview')">
      <img class="file-preview" id="car-images-preview"></div>
    <div class="form-group"><label>Status</label>
      <select id="car-status"><option value="AVAILABLE" ${d.status==='AVAILABLE'?'selected':''}>AVAILABLE</option><option value="UNAVAILABLE" ${d.status==='UNAVAILABLE'?'selected':''}>UNAVAILABLE</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateRentacarCar('${data.id}')` : 'createRentacarCar'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
  document.getElementById('car-companyId').value = d.companyId || '';
}

async function createRentacarCar() {
  const jsonFields = {
    companyId: document.getElementById('car-companyId').value,
    brand: document.getElementById('car-brand').value,
    model: document.getElementById('car-model').value,
    year: parseInt(document.getElementById('car-year').value),
    price: parseFloat(document.getElementById('car-price').value),
    category: document.getElementById('car-category').value,
    seats: parseInt(document.getElementById('car-seats').value),
    transmission: document.getElementById('car-transmission').value,
    fuelType: document.getElementById('car-fuelType').value,
    status: document.getElementById('car-status').value,
  };
  const feat = document.getElementById('car-features').value;
  if (feat) jsonFields.features = feat.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('car-images'),
  });
  
  await apiMutate('POST', '/api/services/rentacar/cars', body, true, 'Car created', () => {
    closeModal();
    loadRentacarCars();
  });
}

async function editRentacarCar(id) {
  const { data } = await api('GET', `/api/services/rentacar/cars/${id}`);
  const d = data?.data || data;
  if (d) showRentacarCarForm({ ...d, id });
}

async function updateRentacarCar(id) {
  const jsonFields = {
    companyId: document.getElementById('car-companyId').value,
    brand: document.getElementById('car-brand').value,
    model: document.getElementById('car-model').value,
    year: parseInt(document.getElementById('car-year').value),
    price: parseFloat(document.getElementById('car-price').value),
    category: document.getElementById('car-category').value,
    seats: parseInt(document.getElementById('car-seats').value),
    transmission: document.getElementById('car-transmission').value,
    fuelType: document.getElementById('car-fuelType').value,
    status: document.getElementById('car-status').value,
  };
  const feat = document.getElementById('car-features').value;
  if (feat) jsonFields.features = feat.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('car-images'),
  });
  
  await apiMutate('PUT', `/api/services/rentacar/cars/${id}`, body, true, 'Car updated', () => {
    closeModal();
    loadRentacarCars();
  });
}

async function deleteRentacarCar(id) {
  if (!confirm('Delete car?')) return;
  await apiMutate('DELETE', `/api/services/rentacar/cars/${id}`, undefined, false, 'Deleted', () => {
    loadRentacarCars();
  });
}

// ── Travel ─────────────────────────────────────────────────────────────
async function loadTravelCompanies() {
  const { data } = await api('GET', '/api/services/travel/companies');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Name</th><th>Rating</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || '';
    html += `<tr><td>${item.id||''}</td><td>${name}</td><td>${item.rating||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editTravelCompany('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteTravelCompany('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('travel-companies-table').innerHTML = html;
}

async function loadTravelCompaniesDropdowns() {
  const { data } = await api('GET', '/api/services/travel/companies');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let opts = '<option value="">All Companies</option>';
  arr.forEach(c => {
    const name = c.name?.en || c.name?.az || c.id;
    opts += `<option value="${c.id}">${name}</option>`;
  });
  document.getElementById('tour-f-companyId').innerHTML = opts;
}

function showTravelCompanyForm(data) {
  const d = data || {};
  const n = d.name || {};
  openModal(data ? 'Edit Company' : 'Create Company', `
    <div class="form-group"><label>Name</label>${localizedInputs('tvc-name', n)}</div>
    <div class="form-group"><label>About</label>${localizedInputs('tvc-about', d.about || {})}</div>
    <div class="form-group"><label>Sections Order (comma-separated)</label><input id="tvc-sections" value="${(d.sectionsOrder||[]).join(', ')}"></div>
    <div class="form-group"><label>Profile Image (file)</label>
      <input id="tvc-profileImage" type="file" onchange="previewFile(this,'tvc-profileImage-preview')">
      <img class="file-preview" id="tvc-profileImage-preview">
      ${data && d.profileImage ? `<p style="color:var(--text-muted);font-size:11px;margin-top:4px">Current: ${d.profileImage}</p>` : ''}</div>
    <div class="form-group"><label>Banner Image (file)</label>
      <input id="tvc-bannerImage" type="file" onchange="previewFile(this,'tvc-bannerImage-preview')">
      <img class="file-preview" id="tvc-bannerImage-preview">
      ${data && d.bannerImage ? `<p style="color:var(--text-muted);font-size:11px;margin-top:4px">Current: ${d.bannerImage}</p>` : ''}</div>
    <div class="form-group"><label>Images (files)</label>
      <input id="tvc-images" type="file" multiple onchange="previewFile(this,'tvc-images-preview')">
      <img class="file-preview" id="tvc-images-preview"></div>
    <div class="form-group"><label>Status</label>
      <select id="tvc-status"><option value="ACTIVE" ${d.status==='ACTIVE'?'selected':''}>ACTIVE</option><option value="INACTIVE" ${d.status==='INACTIVE'?'selected':''}>INACTIVE</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateTravelCompany('${data.id}')` : 'createTravelCompany'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createTravelCompany() {
  const jsonFields = { name: getLocalized('tvc-name'), status: document.getElementById('tvc-status').value };
  const about = getLocalized('tvc-about');
  if (about) jsonFields.about = about;
  const sec = document.getElementById('tvc-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    profileImage: document.getElementById('tvc-profileImage'),
    bannerImage: document.getElementById('tvc-bannerImage'),
    images: document.getElementById('tvc-images'),
  });
  
  await apiMutate('POST', '/api/services/travel/companies', body, true, 'Created', () => {
    closeModal();
    loadTravelCompanies();
    loadTravelCompaniesDropdowns();
  });
}

async function editTravelCompany(id) {
  const { data } = await api('GET', `/api/services/travel/companies/${id}`);
  const d = data?.data || data;
  if (d) showTravelCompanyForm({ ...d, id });
}

async function updateTravelCompany(id) {
  const jsonFields = { name: getLocalized('tvc-name'), status: document.getElementById('tvc-status').value };
  const about = getLocalized('tvc-about');
  if (about) jsonFields.about = about;
  const sec = document.getElementById('tvc-sections').value;
  if (sec) jsonFields.sectionsOrder = sec.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    profileImage: document.getElementById('tvc-profileImage'),
    bannerImage: document.getElementById('tvc-bannerImage'),
    images: document.getElementById('tvc-images'),
  });
  
  await apiMutate('PUT', `/api/services/travel/companies/${id}`, body, true, 'Updated', () => {
    closeModal();
    loadTravelCompanies();
  });
}

async function deleteTravelCompany(id) {
  if (!confirm('Delete company?')) return;
  await apiMutate('DELETE', `/api/services/travel/companies/${id}`, undefined, false, 'Deleted', () => {
    loadTravelCompanies();
    loadTravelCompaniesDropdowns();
  });
}

// ── Travel Tours ───────────────────────────────────────────────────────
async function loadTravelTours() {
  const params = new URLSearchParams();
  ['companyId','category','minRating','startDate','endDate','name'].forEach(f => {
    const v = document.getElementById('tour-f-' + f)?.value;
    if (v) params.set(f, v);
  });
  const qs = params.toString() ? '?' + params.toString() : '';
  const { data } = await api('GET', '/api/services/travel/tours' + qs);
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Title</th><th>Price</th><th>Duration</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const title = item.title?.en || item.title?.az || '';
    html += `<tr><td>${item.id||''}</td><td>${title}</td><td>${item.price||''}</td><td>${item.duration||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editTravelTour('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteTravelTour('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('travel-tours-table').innerHTML = html;
}

function showTravelTourForm(data) {
  const d = data || {};
  const companyOpts = document.getElementById('tour-f-companyId').innerHTML.replace('All Companies', 'Select Company');
  const roadmap = d.roadmap || [];
  let roadmapRows = roadmap.map((r, i) => `
    <div class="repeatable-row">
      <input placeholder="Lat" class="rm-lat" value="${r.lat||''}">
      <input placeholder="Long" class="rm-long" value="${r.long||''}">
      <input placeholder="Order" class="rm-order" type="number" value="${r.order||''}">
      <button class="btn-remove-row" onclick="this.parentElement.remove()">×</button>
    </div>`).join('');
  
  openModal(data ? 'Edit Tour' : 'Create Tour', `
    <div class="form-group"><label>Company</label><select id="tour-companyId">${companyOpts}</select></div>
    <div class="form-group"><label>Title</label>${localizedInputs('tour-title', d.title || {})}</div>
    <div class="form-row">
      <div class="form-group"><label>Price</label><input id="tour-price" type="number" value="${d.price||''}"></div>
      <div class="form-group"><label>Duration</label><input id="tour-duration" value="${d.duration||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Start Date</label><input id="tour-startDate" type="date" value="${d.startDate||''}"></div>
      <div class="form-group"><label>End Date</label><input id="tour-endDate" type="date" value="${d.endDate||''}"></div>
    </div>
    <div class="form-group"><label>Categories (comma-separated)</label><input id="tour-categories" value="${(d.categories||[]).join(', ')}"></div>
    <div class="form-group"><label>Images (files, at least one required)</label>
      <input id="tour-images" type="file" multiple onchange="previewFile(this,'tour-images-preview')">
      <img class="file-preview" id="tour-images-preview"></div>
    <div class="form-group"><label>Roadmap</label>
      <div class="repeatable-rows" id="roadmap-rows">${roadmapRows}</div>
      <button class="btn-add-row" onclick="addRoadmapRow()">+ Add Row</button></div>
    <div class="form-group"><label>Status</label>
      <select id="tour-status"><option value="ACTIVE" ${d.status==='ACTIVE'?'selected':''}>ACTIVE</option><option value="INACTIVE" ${d.status==='INACTIVE'?'selected':''}>INACTIVE</option><option value="SOLD_OUT" ${d.status==='SOLD_OUT'?'selected':''}>SOLD_OUT</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateTravelTour('${data.id}')` : 'createTravelTour'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
  document.getElementById('tour-companyId').value = d.companyId || '';
}

function addRoadmapRow() {
  const container = document.getElementById('roadmap-rows');
  const div = document.createElement('div');
  div.className = 'repeatable-row';
  div.innerHTML = `<input placeholder="Lat" class="rm-lat"><input placeholder="Long" class="rm-long"><input placeholder="Order" class="rm-order" type="number"><button class="btn-remove-row" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(div);
}

async function createTravelTour() {
  const jsonFields = {
    companyId: document.getElementById('tour-companyId').value,
    title: getLocalized('tour-title'),
    price: parseFloat(document.getElementById('tour-price').value),
    duration: document.getElementById('tour-duration').value,
    startDate: document.getElementById('tour-startDate').value,
    endDate: document.getElementById('tour-endDate').value,
    status: document.getElementById('tour-status').value,
  };
  const cats = document.getElementById('tour-categories').value;
  if (cats) jsonFields.categories = cats.split(',').map(s => s.trim()).filter(Boolean);
  const rmRows = document.querySelectorAll('#roadmap-rows .repeatable-row');
  if (rmRows.length > 0) {
    jsonFields.roadmap = [...rmRows].map(row => ({
      lat: parseFloat(row.querySelector('.rm-lat').value) || 0,
      long: parseFloat(row.querySelector('.rm-long').value) || 0,
      order: parseInt(row.querySelector('.rm-order').value) || 0,
    }));
  }
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('tour-images'),
  });
  
  await apiMutate('POST', '/api/services/travel/tours', body, true, 'Tour created', () => {
    closeModal();
    loadTravelTours();
  });
}

async function editTravelTour(id) {
  const { data } = await api('GET', `/api/services/travel/tours/${id}`);
  const d = data?.data || data;
  if (d) showTravelTourForm({ ...d, id });
}

async function updateTravelTour(id) {
  const jsonFields = {
    companyId: document.getElementById('tour-companyId').value,
    title: getLocalized('tour-title'),
    price: parseFloat(document.getElementById('tour-price').value),
    duration: document.getElementById('tour-duration').value,
    startDate: document.getElementById('tour-startDate').value,
    endDate: document.getElementById('tour-endDate').value,
    status: document.getElementById('tour-status').value,
  };
  const cats = document.getElementById('tour-categories').value;
  if (cats) jsonFields.categories = cats.split(',').map(s => s.trim()).filter(Boolean);
  const rmRows = document.querySelectorAll('#roadmap-rows .repeatable-row');
  if (rmRows.length > 0) {
    jsonFields.roadmap = [...rmRows].map(row => ({
      lat: parseFloat(row.querySelector('.rm-lat').value) || 0,
      long: parseFloat(row.querySelector('.rm-long').value) || 0,
      order: parseInt(row.querySelector('.rm-order').value) || 0,
    }));
  }
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('tour-images'),
  });
  
  await apiMutate('PUT', `/api/services/travel/tours/${id}`, body, true, 'Tour updated', () => {
    closeModal();
    loadTravelTours();
  });
}

async function deleteTravelTour(id) {
  if (!confirm('Delete tour?')) return;
  await apiMutate('DELETE', `/api/services/travel/tours/${id}`, undefined, false, 'Deleted', () => {
    loadTravelTours();
  });
}

// ── Food ───────────────────────────────────────────────────────────────
async function loadFoodCompanies() {
  const { data } = await api('GET', '/api/services/food/companies');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Name</th><th>Rating</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || '';
    html += `<tr><td>${item.id||''}</td><td>${name}</td><td>${item.rating||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editFoodCompany('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteFoodCompany('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('food-companies-table').innerHTML = html;
}

async function loadFoodCompaniesDropdowns() {
  const { data } = await api('GET', '/api/services/food/companies');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let opts = '<option value="">All Companies</option>';
  arr.forEach(c => {
    const name = c.name?.en || c.name?.az || c.id;
    opts += `<option value="${c.id}">${name}</option>`;
  });
  document.getElementById('item-f-companyId').innerHTML = opts;
}

function showFoodCompanyForm(data) {
  const d = data || {};
  const n = d.name || {};
  openModal(data ? 'Edit Company' : 'Create Company', `
    <div class="form-group"><label>Name</label>${localizedInputs('fc-name', n)}</div>
    <div class="form-group"><label>About</label>${localizedInputs('fc-about', d.about || {})}</div>
    <div class="form-group"><label>Address</label><input id="fc-address" value="${d.address||''}"></div>
    <div class="form-group"><label>Cuisine Types (comma-separated)</label><input id="fc-cuisine" value="${(d.cuisineTypes||[]).join(', ')}"></div>
    <div class="form-group"><label>Logo (file)</label>
      <input id="fc-logo" type="file" onchange="previewFile(this,'fc-logo-preview')">
      <img class="file-preview" id="fc-logo-preview">
      ${data && d.logo ? `<p style="color:var(--text-muted);font-size:11px;margin-top:4px">Current: ${d.logo}</p>` : ''}</div>
    <div class="form-group"><label>Images (files)</label>
      <input id="fc-images" type="file" multiple onchange="previewFile(this,'fc-images-preview')">
      <img class="file-preview" id="fc-images-preview"></div>
    <div class="form-group"><label>Status</label>
      <select id="fc-status"><option value="ACTIVE" ${d.status==='ACTIVE'?'selected':''}>ACTIVE</option><option value="INACTIVE" ${d.status==='INACTIVE'?'selected':''}>INACTIVE</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateFoodCompany('${data.id}')` : 'createFoodCompany'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createFoodCompany() {
  const jsonFields = { name: getLocalized('fc-name'), status: document.getElementById('fc-status').value };
  const about = getLocalized('fc-about');
  if (about) jsonFields.about = about;
  const addr = document.getElementById('fc-address').value;
  if (addr) jsonFields.address = addr;
  const cui = document.getElementById('fc-cuisine').value;
  if (cui) jsonFields.cuisineTypes = cui.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    logo: document.getElementById('fc-logo'),
    images: document.getElementById('fc-images'),
  });
  
  await apiMutate('POST', '/api/services/food/companies', body, true, 'Created', () => {
    closeModal();
    loadFoodCompanies();
    loadFoodCompaniesDropdowns();
  });
}

async function editFoodCompany(id) {
  const { data } = await api('GET', `/api/services/food/companies/${id}`);
  const d = data?.data || data;
  if (d) showFoodCompanyForm({ ...d, id });
}

async function updateFoodCompany(id) {
  const jsonFields = { name: getLocalized('fc-name'), status: document.getElementById('fc-status').value };
  const about = getLocalized('fc-about');
  if (about) jsonFields.about = about;
  const addr = document.getElementById('fc-address').value;
  if (addr) jsonFields.address = addr;
  const cui = document.getElementById('fc-cuisine').value;
  if (cui) jsonFields.cuisineTypes = cui.split(',').map(s => s.trim()).filter(Boolean);
  
  const body = buildMultipartBody(jsonFields, {
    logo: document.getElementById('fc-logo'),
    images: document.getElementById('fc-images'),
  });
  
  await apiMutate('PUT', `/api/services/food/companies/${id}`, body, true, 'Updated', () => {
    closeModal();
    loadFoodCompanies();
  });
}

async function deleteFoodCompany(id) {
  if (!confirm('Delete company?')) return;
  await apiMutate('DELETE', `/api/services/food/companies/${id}`, undefined, false, 'Deleted', () => {
    loadFoodCompanies();
    loadFoodCompaniesDropdowns();
  });
}

// ── Food Items ─────────────────────────────────────────────────────────
async function loadFoodItems() {
  const params = new URLSearchParams();
  ['companyId','category','minPrice','maxPrice','name'].forEach(f => {
    const v = document.getElementById('item-f-' + f)?.value;
    if (v) params.set(f, v);
  });
  const qs = params.toString() ? '?' + params.toString() : '';
  const { data } = await api('GET', '/api/services/food/items' + qs);
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || '';
    html += `<tr><td>${item.id||''}</td><td>${name}</td><td>${item.category||''}</td><td>${item.price||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editFoodItem('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteFoodItem('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('food-items-table').innerHTML = html;
}

function showFoodItemForm(data) {
  const d = data || {};
  const companyOpts = document.getElementById('item-f-companyId').innerHTML.replace('All Companies', 'Select Company');
  openModal(data ? 'Edit Item' : 'Create Item', `
    <div class="form-group"><label>Company</label><select id="item-companyId">${companyOpts}</select></div>
    <div class="form-group"><label>Name</label>${localizedInputs('item-name', d.name || {})}</div>
    <div class="form-group"><label>Description</label>${localizedInputs('item-desc', d.description || {})}</div>
    <div class="form-row">
      <div class="form-group"><label>Category</label><input id="item-category" value="${d.category||''}"></div>
      <div class="form-group"><label>Price</label><input id="item-price" type="number" value="${d.price||''}"></div>
    </div>
    <div class="form-group"><label>Ingredients (comma-separated)</label><input id="item-ingredients" value="${(d.ingredients||[]).join(', ')}"></div>
    <div class="form-row">
      <div class="form-group"><label>Calories</label><input id="item-calories" type="number" value="${d.calories||''}"></div>
      <div class="form-group"><label>Protein</label><input id="item-protein" type="number" value="${d.protein||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Fat</label><input id="item-fat" type="number" value="${d.fat||''}"></div>
      <div class="form-group"><label>Carbs</label><input id="item-carb" type="number" value="${d.carb||''}"></div>
    </div>
    <div class="form-group"><label>Images (files)</label>
      <input id="item-images" type="file" multiple onchange="previewFile(this,'item-images-preview')">
      <img class="file-preview" id="item-images-preview"></div>
    <div class="form-group"><label>Status</label>
      <select id="item-status"><option value="AVAILABLE" ${d.status==='AVAILABLE'?'selected':''}>AVAILABLE</option><option value="OUT_OF_STOCK" ${d.status==='OUT_OF_STOCK'?'selected':''}>OUT_OF_STOCK</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateFoodItem('${data.id}')` : 'createFoodItem'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
  document.getElementById('item-companyId').value = d.companyId || '';
}

async function createFoodItem() {
  const jsonFields = {
    companyId: document.getElementById('item-companyId').value,
    name: getLocalized('item-name'),
    category: document.getElementById('item-category').value,
    price: parseFloat(document.getElementById('item-price').value),
    status: document.getElementById('item-status').value,
  };
  const desc = getLocalized('item-desc');
  if (desc) jsonFields.description = desc;
  const ing = document.getElementById('item-ingredients').value;
  if (ing) jsonFields.ingredients = ing.split(',').map(s => s.trim()).filter(Boolean);
  const cal = document.getElementById('item-calories').value;
  if (cal) jsonFields.calories = parseFloat(cal);
  const pro = document.getElementById('item-protein').value;
  if (pro) jsonFields.protein = parseFloat(pro);
  const fat = document.getElementById('item-fat').value;
  if (fat) jsonFields.fat = parseFloat(fat);
  const carb = document.getElementById('item-carb').value;
  if (carb) jsonFields.carb = parseFloat(carb);
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('item-images'),
  });
  
  await apiMutate('POST', '/api/services/food/items', body, true, 'Item created', () => {
    closeModal();
    loadFoodItems();
  });
}

async function editFoodItem(id) {
  const { data } = await api('GET', `/api/services/food/items/${id}`);
  const d = data?.data || data;
  if (d) showFoodItemForm({ ...d, id });
}

async function updateFoodItem(id) {
  const jsonFields = {
    companyId: document.getElementById('item-companyId').value,
    name: getLocalized('item-name'),
    category: document.getElementById('item-category').value,
    price: parseFloat(document.getElementById('item-price').value),
    status: document.getElementById('item-status').value,
  };
  const desc = getLocalized('item-desc');
  if (desc) jsonFields.description = desc;
  const ing = document.getElementById('item-ingredients').value;
  if (ing) jsonFields.ingredients = ing.split(',').map(s => s.trim()).filter(Boolean);
  const cal = document.getElementById('item-calories').value;
  if (cal) jsonFields.calories = parseFloat(cal);
  const pro = document.getElementById('item-protein').value;
  if (pro) jsonFields.protein = parseFloat(pro);
  const fat = document.getElementById('item-fat').value;
  if (fat) jsonFields.fat = parseFloat(fat);
  const carb = document.getElementById('item-carb').value;
  if (carb) jsonFields.carb = parseFloat(carb);
  
  const body = buildMultipartBody(jsonFields, {
    images: document.getElementById('item-images'),
  });
  
  await apiMutate('PUT', `/api/services/food/items/${id}`, body, true, 'Item updated', () => {
    closeModal();
    loadFoodItems();
  });
}

async function deleteFoodItem(id) {
  if (!confirm('Delete item?')) return;
  await apiMutate('DELETE', `/api/services/food/items/${id}`, undefined, false, 'Deleted', () => {
    loadFoodItems();
  });
}

// ── Included Services ──────────────────────────────────────────────────
function switchIncludedServiceType(type) {
  currentIsType = type;
  document.querySelectorAll('#is-toggle button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  loadIncludedServices();
}

async function loadIncludedServices() {
  const { data } = await api('GET', `/api/services/included-services/${currentIsType}`);
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>Name</th><th>Icon</th><th>Actions</th></tr>';
  arr.forEach(item => {
    const name = item.name?.en || item.name?.az || '';
    html += `<tr><td>${item.id||''}</td><td>${name}</td><td>${item.icon||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editIncludedService('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteIncludedService('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('included-services-table').innerHTML = html;
}

function showIncludedServiceForm(data) {
  const d = data || {};
  openModal(data ? 'Edit Service' : 'Create Service', `
    <div class="form-group"><label>Name</label>${localizedInputs('is-name', d.name || {})}</div>
    <div class="form-group"><label>Icon</label><input id="is-icon" value="${d.icon||''}"></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateIncludedService('${data.id}')` : 'createIncludedService'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createIncludedService() {
  const body = { name: getLocalized('is-name'), serviceType: currentIsType };
  const icon = document.getElementById('is-icon').value;
  if (icon) body.icon = icon;
  
  await apiMutate('POST', `/api/services/included-services/${currentIsType}`, body, false, 'Created', () => {
    closeModal();
    loadIncludedServices();
  });
}

async function editIncludedService(id) {
  showIncludedServiceForm({ id });
}

async function updateIncludedService(id) {
  const body = { name: getLocalized('is-name') };
  const icon = document.getElementById('is-icon').value;
  if (icon) body.icon = icon;
  
  await apiMutate('PUT', `/api/services/included-services/${id}`, body, false, 'Updated', () => {
    closeModal();
    loadIncludedServices();
  });
}

async function deleteIncludedService(id) {
  if (!confirm('Delete service?')) return;
  await apiMutate('DELETE', `/api/services/included-services/${id}`, undefined, false, 'Deleted', () => {
    loadIncludedServices();
  });
}

// ── Reviews ────────────────────────────────────────────────────────────
async function loadReviews() {
  const params = new URLSearchParams();
  const tt = document.getElementById('review-f-targetType').value;
  const ti = document.getElementById('review-f-targetId').value;
  if (tt) params.set('targetType', tt);
  if (ti) params.set('targetId', ti);
  const qs = params.toString() ? '?' + params.toString() : '';
  const { data } = await api('GET', '/api/reviews' + qs);
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>User</th><th>Target</th><th>Rating</th><th>Actions</th></tr>';
  arr.forEach(item => {
    html += `<tr><td>${item.id||''}</td><td>${item.userId||''}</td><td>${item.targetType||''}:${(item.targetId||'').slice(0,12)}</td><td>${item.rating||''}</td>
      <td class="actions"><button class="btn-edit" onclick="editReview('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteReview('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('reviews-table').innerHTML = html;
}

function showReviewForm(data) {
  const d = data || {};
  openModal(data ? 'Edit Review' : 'Create Review', `
    <div class="form-group"><label>Target Type</label>
      <select id="review-targetType"><option value="RENT_A_CAR" ${d.targetType==='RENT_A_CAR'?'selected':''}>RENT_A_CAR</option><option value="TRAVEL" ${d.targetType==='TRAVEL'?'selected':''}>TRAVEL</option><option value="HOTEL" ${d.targetType==='HOTEL'?'selected':''}>HOTEL</option><option value="FOOD" ${d.targetType==='FOOD'?'selected':''}>FOOD</option><option value="COMPANY" ${d.targetType==='COMPANY'?'selected':''}>COMPANY</option></select></div>
    <div class="form-group"><label>Target ID</label><input id="review-targetId" value="${d.targetId||''}"></div>
    <div class="form-group"><label>Rating (1-5)</label><input id="review-rating" type="number" min="1" max="5" step="1" value="${d.rating||''}"></div>
    <div class="form-group"><label>Comment</label><textarea id="review-comment">${d.comment||''}</textarea></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateReview('${data.id}')` : 'createReview'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createReview() {
  const body = {
    targetType: document.getElementById('review-targetType').value,
    targetId: document.getElementById('review-targetId').value,
    rating: parseInt(document.getElementById('review-rating').value),
  };
  const comment = document.getElementById('review-comment').value;
  if (comment) body.comment = comment;
  
  await apiMutate('POST', '/api/reviews', body, false, 'Review created', () => {
    closeModal();
    loadReviews();
  });
}

async function editReview(id) {
  const { data } = await api('GET', `/api/reviews/${id}`);
  const d = data?.data || data;
  if (d) showReviewForm({ ...d, id });
}

async function updateReview(id) {
  const body = {};
  const rating = document.getElementById('review-rating').value;
  if (rating) body.rating = parseInt(rating);
  const comment = document.getElementById('review-comment').value;
  if (comment) body.comment = comment;
  
  await apiMutate('PUT', `/api/reviews/${id}`, body, false, 'Review updated', () => {
    closeModal();
    loadReviews();
  });
}

async function deleteReview(id) {
  if (!confirm('Delete review?')) return;
  await apiMutate('DELETE', `/api/reviews/${id}`, undefined, false, 'Deleted', () => {
    loadReviews();
  });
}

// ── Orders ─────────────────────────────────────────────────────────────
async function loadOrders() {
  const { data } = await api('GET', '/api/orders');
  const items = data?.data || data || [];
  const arr = Array.isArray(items) ? items : [];
  let html = '<table><tr><th>ID</th><th>User</th><th>Status</th><th>Total</th><th>Actions</th></tr>';
  arr.forEach(item => {
    html += `<tr class="expandable" onclick="toggleOrderDetail(this, '${item.id}')">
      <td>${item.id||''}</td><td>${(item.userId||'').slice(0,12)}</td><td>${item.status||''}</td><td>${item.total||item.price||''}</td>
      <td class="actions">
        <button class="btn-edit" onclick="event.stopPropagation();showOrderStepForm('${item.id}')">Step</button>
        <button class="btn-edit" onclick="event.stopPropagation();showOrderStatusForm('${item.id}')">Status</button>
        <button class="btn-delete" onclick="event.stopPropagation();cancelOrder('${item.id}')">Cancel</button>
      </td></tr>
      <tr class="expanded-row" style="display:none" id="order-detail-${item.id}"><td colspan="5"><pre>${highlightJson(JSON.stringify(item, null, 2))}</pre></td></tr>`;
  });
  html += '</table>';
  document.getElementById('orders-table').innerHTML = html;
}

function toggleOrderDetail(row, id) {
  const detail = document.getElementById('order-detail-' + id);
  detail.style.display = detail.style.display === 'none' ? 'table-row' : 'none';
}

function showOrderForm() {
  openModal('Create Order', `
    <div class="form-group"><label>Service Type</label>
      <select id="order-serviceType"><option value="RENT_A_CAR">RENT_A_CAR</option><option value="TRAVEL">TRAVEL</option><option value="HOTEL_ROOM">HOTEL_ROOM</option><option value="FOOD">FOOD</option></select></div>
    <div class="form-group"><label>Service ID (for HOTEL_ROOM, this is the Room ID, not the Hotel ID)</label><input id="order-serviceId" placeholder="Service ID"></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Creating…', createOrder)">Create</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createOrder() {
  const body = {
    serviceType: document.getElementById('order-serviceType').value,
    serviceId: document.getElementById('order-serviceId').value,
  };
  await apiMutate('POST', '/api/orders', body, false, 'Order created', () => {
    closeModal();
    loadOrders();
  });
}

function showOrderStepForm(id) {
  openModal('Advance Order Step', `
    <p style="color:var(--text-muted);margin-bottom:12px">Order: ${id}</p>
    <div class="form-group"><label>Screen</label>
      <select id="step-screen">
        <option value="AUTH_SCREEN">AUTH_SCREEN</option>
        <option value="PERSONAL_INFO_SCREEN">PERSONAL_INFO_SCREEN</option>
        <option value="DRIVER_LICENSE_SCREEN">DRIVER_LICENSE_SCREEN</option>
        <option value="PASSPORT_INFO_SCREEN">PASSPORT_INFO_SCREEN</option>
        <option value="ADDRESS_SCREEN">ADDRESS_SCREEN</option>
        <option value="DELIVERY_ADDRESS_SCREEN">DELIVERY_ADDRESS_SCREEN</option>
        <option value="PAYMENT_SCREEN">PAYMENT_SCREEN</option>
        <option value="CONFIRM_SCREEN">CONFIRM_SCREEN</option>
      </select></div>
    <div class="form-group"><label>Data (raw JSON object)</label>
      <textarea id="step-data" placeholder='{"key":"value"}'>{}</textarea></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Advancing…', () => advanceOrderStep('${id}'))">Advance Step</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function advanceOrderStep(id) {
  const screen = document.getElementById('step-screen').value;
  let data;
  try {
    data = JSON.parse(document.getElementById('step-data').value || '{}');
  } catch {
    showToast('Data must be valid JSON', 'error');
    return;
  }
  await apiMutate('PUT', `/api/orders/${id}/step`, { screen, data }, false, 'Step advanced', () => {
    closeModal();
    loadOrders();
  });
}

function showOrderStatusForm(id) {
  openModal('Update Order Status', `
    <p style="color:var(--text-muted);margin-bottom:12px">Order: ${id}</p>
    <div class="form-group"><label>New Status</label>
      <select id="order-new-status"><option value="PENDING">PENDING</option><option value="CONFIRMED">CONFIRMED</option><option value="PROCESSING">PROCESSING</option><option value="COMPLETED">COMPLETED</option><option value="CANCELLED">CANCELLED</option></select></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Updating…', () => updateOrderStatus('${id}'))">Update</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function updateOrderStatus(id) {
  const body = { status: document.getElementById('order-new-status').value };
  await apiMutate('PUT', `/api/orders/${id}/status`, body, false, 'Status updated', () => {
    closeModal();
    loadOrders();
  });
}

async function cancelOrder(id) {
  if (!confirm('Cancel order?')) return;
  await apiMutate('PUT', `/api/orders/${id}/cancel`, undefined, false, 'Order cancelled', () => {
    loadOrders();
  });
}

// ── Payment ────────────────────────────────────────────────────────────
async function loadCards() {
  const { data } = await api('GET', '/api/payment/all-cards');
  document.getElementById('cards-display').innerHTML = data?.data ? highlightJson(JSON.stringify(data.data, null, 2)) : 'No cards';
}

async function addCard() {
  const body = {
    cardNumber: document.getElementById('card-number').value,
    expiryMonth: parseInt(document.getElementById('card-expiry-month').value),
    expiryYear: parseInt(document.getElementById('card-expiry-year').value),
    cvv: document.getElementById('card-cvv').value,
    cardholderName: document.getElementById('card-holder').value,
  };
  await apiMutate('POST', '/api/payment/add-card', body, false, 'Card added', () => {
    loadCards();
  });
}

async function payOrder() {
  const id = document.getElementById('pay-order-id').value;
  const paymentMethodId = document.getElementById('pay-method-id').value;
  if (!id || !paymentMethodId) { showToast('Enter both order ID and payment method ID', 'error'); return; }
  await apiMutate('POST', `/api/payment/pay/${id}`, { paymentMethodId }, false, 'Payment initiated', () => {});
}

// ── Banner ─────────────────────────────────────────────────────────────
async function loadBanners() {
  const { data } = await api('GET', '/api/home/banner');
  const items = data?.data || data || [];
  currentBannersList = Array.isArray(items) ? items : [];
  const arr = currentBannersList;
  let html = '<table><tr><th>ID</th><th>Link</th><th>Order</th><th>Active</th><th>Actions</th></tr>';
  arr.forEach(item => {
    html += `<tr><td>${item.id||''}</td><td>${(item.link||'').slice(0,30)}</td><td>${item.order||''}</td><td>${item.isActive?'✅':'❌'}</td>
      <td class="actions"><button class="btn-edit" onclick="editBanner('${item.id}')">Edit</button>
      <button class="btn-delete" onclick="deleteBanner('${item.id}')">Delete</button></td></tr>`;
  });
  html += '</table>';
  document.getElementById('banner-table').innerHTML = html;
}

function showBannerForm(data) {
  const d = data || {};
  openModal(data ? 'Edit Banner' : 'Create Banner', `
    <div class="form-group"><label>Link</label><input id="banner-link" value="${d.link||''}"></div>
    <div class="form-row">
      <div class="form-group"><label>Order</label><input id="banner-order" type="number" value="${d.order||''}"></div>
      <div class="form-group"><label>Active</label>
        <select id="banner-active"><option value="true" ${d.isActive!==false?'selected':''}>Yes</option><option value="false" ${d.isActive===false?'selected':''}>No</option></select></div>
    </div>
    <div class="form-group"><label>Image (file)</label><input id="banner-image" type="file" onchange="previewFile(this,'banner-preview')"><img class="file-preview" id="banner-preview"></div>
    <div class="form-actions">
      <button class="btn-submit" onclick="withButtonBusy(this, 'Saving…', ${data ? `() => updateBanner('${data.id}')` : 'createBanner'})">${data ? 'Update' : 'Create'}</button>
      <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    </div>`);
}

async function createBanner() {
  const formData = new FormData();
  const data = {
    link: document.getElementById('banner-link').value,
    order: parseInt(document.getElementById('banner-order').value) || 0,
    isActive: document.getElementById('banner-active').value === 'true',
  };
  formData.append('data', JSON.stringify(data));
  const fileInput = document.getElementById('banner-image');
  if (fileInput.files[0]) formData.append('image', fileInput.files[0]);
  
  await apiMutate('POST', '/api/home/banner', formData, true, 'Banner created', () => {
    closeModal();
    loadBanners();
  });
}

async function editBanner(id) {
  const banner = currentBannersList.find((b) => b.id === id);
  showBannerForm(banner || { id });
}

async function updateBanner(id) {
  const formData = new FormData();
  const data = {};
  const link = document.getElementById('banner-link').value;
  if (link) data.link = link;
  const order = document.getElementById('banner-order').value;
  if (order) data.order = parseInt(order);
  data.isActive = document.getElementById('banner-active').value === 'true';
  formData.append('data', JSON.stringify(data));
  const fileInput = document.getElementById('banner-image');
  if (fileInput.files[0]) formData.append('image', fileInput.files[0]);
  
  await apiMutate('PUT', `/api/home/banner/${id}`, formData, true, 'Banner updated', () => {
    closeModal();
    loadBanners();
  });
}

async function deleteBanner(id) {
  if (!confirm('Delete banner?')) return;
  await apiMutate('DELETE', `/api/home/banner/${id}`, undefined, false, 'Deleted', () => {
    loadBanners();
  });
}

// ── App Config ─────────────────────────────────────────────────────────
async function loadAppConfig() {
  const { data } = await api('GET', '/api/app/config');
  document.getElementById('appconfig-display').innerHTML = data?.data ? highlightJson(JSON.stringify(data.data, null, 2)) : 'No config';
}

async function updateAppConfig() {
  const json = document.getElementById('appconfig-json').value;
  try { JSON.parse(json); } catch { showToast('Invalid JSON', 'error'); return; }
  const body = JSON.parse(json);
  await api('PUT', '/api/app/config', body);
  showToast('Config updated', 'success');
}

// ── Admin ──────────────────────────────────────────────────────────────
async function addAdmin() {
  const userId = document.getElementById('admin-userId').value;
  if (!userId) { showToast('Enter a user ID', 'error'); return; }
  await apiMutate('POST', '/api/admin/users/add-admin', { userId }, false, 'Admin added', () => {});
}

async function loadTransactions() {
  const params = new URLSearchParams();
  const status = document.getElementById('tx-status').value;
  const userId = document.getElementById('tx-userId').value;
  if (status) params.set('status', status);
  if (userId) params.set('userId', userId);
  const qs = params.toString() ? '?' + params.toString() : '';
  const { data } = await api('GET', '/api/admin/transactions' + qs);
  document.getElementById('transactions-display').innerHTML = data?.data ? highlightJson(JSON.stringify(data.data, null, 2)) : 'No transactions';
}