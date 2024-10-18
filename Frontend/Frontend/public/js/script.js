// Handle Form Submit
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginButton = document.querySelector('button[type="button"]');
    const messageElement = document.getElementById('message');
    
    // ตรวจสอบว่า username, password และ role ไม่ว่างเปล่า
    if (!username || !password || !role) {
        messageElement.innerHTML = '<div class="error">กรุณากรอก Username, Password, Role</div>';
        return;
    }

    if (role === 'option2') {
        messageElement.innerHTML = '<div class="error">Invalid role.</div>';
        return;
    }
    
    loginButton.disabled = true;
    loginButton.textContent = 'loading';
    
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-key': 'TU11572fb4fef6178c08c1163f6ae7a73ccebe8bac8b62597457fcd3417a87963362f1d9d1d8ee859931a94c063103079c'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        loginButton.disabled = false;
        loginButton.textContent = 'login';
        if (data.status) {
            displayUserInfo(data, role);
        } else {
            messageElement.innerHTML = '<div class="error">' + data.message + '</div>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loginButton.disabled = false;
        loginButton.textContent = 'login';
        messageElement.innerHTML = '<div class="error">เกิดข้อผิดพลาดในการเชื่อมต่อ</div>';
    });
}

function displayUserInfo(data, role) {
    const userInfoHTML = `
        <div class="user-info">
            <h2>ข้อมูลผู้ใช้</h2>
            
            <p><strong>สถานะ TU:</strong> ${data.tu_status}</p>
            <p><strong>รหัสนักศึกษา:</strong> ${data.username}</p>
            <p><strong>ชื่อ-นามสกุล (ไทย):</strong> ${data.displayname_th}</p>
            <p><strong>ชื่อ-นามสกุล (อังกฤษ):</strong> ${data.displayname_en}</p>
            <p><strong>อีเมล:</strong> ${data.email}</p>
            <p><strong>ประเภท:</strong> ${data.type}</p>
            <p><strong>ภาควิชา:</strong> ${data.department}</p>
            <p><strong>คณะ:</strong> ${data.faculty}</p>
            <p><strong>บทบาท:</strong> ${role === 'option1' ? 'นักศึกษา' : 'อาจารย์'}</p>
        </div>
    `;
    document.getElementById('message').innerHTML = userInfoHTML;
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

// เปิด/ปิดปุ่ม login ตามการป้อนข้อมูล
function checkInputs() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginButton = document.querySelector('button[type="button"]');
    loginButton.disabled = !(username && password && role);
}

// เพิ่ม event listeners
document.getElementById('username').addEventListener('input', checkInputs);
document.getElementById('password').addEventListener('input', checkInputs);
document.getElementById('role').addEventListener('change', checkInputs);