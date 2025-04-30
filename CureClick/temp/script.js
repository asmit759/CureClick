// Sample doctors data
const doctors = [
    { id: 1, name: "Dr. Hamza", specialization: "neurologist", availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { id: 2, name: "Dr. Krishna", specialization: "dermatologist", availableSlots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
    { id: 3, name: "Dr. Pradeep", specialization: "Dermatologist", availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"] },
    { id: 4, name: "Dr. Sanghamitra", specialization: "physician", availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { id: 2, name: "Dr. Digambar", specialization: "physician", availableSlots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
    { id: 3, name: "Dr. Bindu", specialization: "gastroenterologist", availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"] }
];

// Show register page
function showRegister() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "block";
}

// Show login page
function showLogin() {
    document.getElementById("register-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

// Register user
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
        alert("Username already exists");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    showLogin();
}

// Login user
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        loadDoctors();
        showBookingPage();
    } else {
        alert("Invalid username or password");
    }
}

// Show booking page if logged in
function showBookingPage() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "none";
    document.getElementById("booking-container").style.display = "block";
    displayAppointments();
}

// Load doctors into the dropdown
function loadDoctors() {
    const doctorSelect = document.getElementById("doctorList");
    doctorSelect.innerHTML = ""; 

    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.id;
        option.textContent = `${doctor.name} - ${doctor.specialization}`;
        doctorSelect.appendChild(option);
    });

    loadAvailableSlots();
}

// Load available slots for selected doctor
function loadAvailableSlots() {
    const doctorId = document.getElementById("doctorList").value;
    const doctor = doctors.find(doc => doc.id == doctorId);
    const slotSelect = document.getElementById("slotList");

    slotSelect.innerHTML = "";

    if (doctor && doctor.availableSlots.length > 0) {
        doctor.availableSlots.forEach(slot => {
            const option = document.createElement("option");
            option.value = slot;
            option.textContent = slot;
            slotSelect.appendChild(option);
        });
    } else {
        alert("No available slots for this doctor.");
    }
}

// Book an appointment
function bookAppointment() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Please login first");
        return;
    }

    const doctorId = document.getElementById("doctorList").value;
    const timeSlot = document.getElementById("slotList").value;

    const doctor = doctors.find(doc => doc.id == doctorId);
    
    // Check if the doctor and time slot are valid
    if (!doctor || !timeSlot) {
        alert("Please select a valid doctor and time slot.");
        return;
    }

    // Remove the booked slot
    doctor.availableSlots = doctor.availableSlots.filter(slot => slot !== timeSlot);

    // Save the appointment under the logged-in user's name
    let appointments = JSON.parse(localStorage.getItem("appointments")) || {};
    if (!appointments[loggedInUser]) {
        appointments[loggedInUser] = [];
    }

    appointments[loggedInUser].push({
        doctor: doctor.name,
        specialization: doctor.specialization,
        timeSlot
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment booked successfully!");
    loadAvailableSlots();
    displayAppointments();
}

// Display booked appointments for logged-in user
function displayAppointments() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    const appointmentsList = document.getElementById("appointmentsList");
    appointmentsList.innerHTML = "";

    const appointments = JSON.parse(localStorage.getItem("appointments")) || {};
    const userAppointments = appointments[loggedInUser] || [];

    userAppointments.forEach(app => {
        const li = document.createElement("li");
        li.textContent = `${app.doctor} (${app.specialization}) at ${app.timeSlot}`;
        appointmentsList.appendChild(li);
    });
}

// Logout user
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("booking-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

// Auto login if user was previously logged in
window.onload = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        loadDoctors();
        showBookingPage();
    }
};