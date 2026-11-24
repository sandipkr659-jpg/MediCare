// ==========================================================
// 1. DATA: Doctors, Hospitals & Cities Database
// ==========================================================
// Doctor illustration avatars (No real human photos, clean medical avatars)
const AVATAR_FEMALE = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";
const AVATAR_MALE   = "https://cdn-icons-png.flaticon.com/512/3774/3774293.png";

const doctors = [
  {
    id: 1,
    name: "Dr. Anuj Sharma",
    specialty: "Cardiologist",
    city: "Delhi",
    hospital: "AIIMS Hospital",
    experience: "14 Years",
    fee: "₹1000",
    image: AVATAR_MALE
  },
  {
    id: 2,
    name: "Dr. Priya Verma",
    specialty: "Neurologist",
    city: "Delhi",
    hospital: "Max Super Specialty",
    experience: "11 Years",
    fee: "₹1200",
    image: AVATAR_FEMALE
  },
  {
    id: 3,
    name: "Dr. Sneha Patel",
    specialty: "Pediatrician",
    city: "Mumbai",
    hospital: "Apollo Hospital",
    experience: "8 Years",
    fee: "₹800",
    image: AVATAR_FEMALE
  },
  {
    id: 4,
    name: "Dr. Rajesh Kumar",
    specialty: "Orthopedic",
    city: "Mumbai",
    hospital: "Fortis Healthcare",
    experience: "16 Years",
    fee: "₹1100",
    image: AVATAR_MALE
  },
  {
    id: 5,
    name: "Dr. Ananya Iyer",
    specialty: "Dermatologist",
    city: "Bangalore",
    hospital: "Manipal Hospital",
    experience: "9 Years",
    fee: "₹900",
    image: AVATAR_FEMALE
  },
  {
    id: 6,
    name: "Dr. Vikram Malhotra",
    specialty: "General Physician",
    city: "Bangalore",
    hospital: "Apollo Hospital",
    experience: "18 Years",
    fee: "₹600",
    image: AVATAR_MALE
  },
  {
    id: 7,
    name: "Dr. Rohan Mukherjee",
    specialty: "Cardiologist",
    city: "Kolkata",
    hospital: "Fortis Healthcare",
    experience: "12 Years",
    fee: "₹950",
    image: AVATAR_MALE
  },
  {
    id: 8,
    name: "Dr. Kavita Reddy",
    specialty: "General Physician",
    city: "Chennai",
    hospital: "Apollo Hospital",
    experience: "10 Years",
    fee: "₹700",
    image: AVATAR_FEMALE
  },
  {
    id: 9,
    name: "Dr. Sanjay Nair",
    specialty: "Orthopedic",
    city: "Chennai",
    hospital: "Kauvery Hospital",
    experience: "15 Years",
    fee: "₹1000",
    image: AVATAR_MALE
  }
];

// Currently selected doctor in the booking form
let selectedDoctor = null;

// ==========================================================
// 2. CITY & HOSPITAL SEARCH WITH DYNAMIC SUGGESTIONS
// ==========================================================
function updateHospitalSuggestions(cityQuery = "") {
  const datalist = document.getElementById("hospitalSuggestions");
  if (!datalist) return;
  datalist.innerHTML = "";

  const query = (cityQuery || "").toLowerCase().trim();
  const availableHospitals = new Set();

  doctors.forEach(doc => {
    // If no city query or city matches
    if (!query || doc.city.toLowerCase().includes(query)) {
      availableHospitals.add(doc.hospital);
    }
  });

  availableHospitals.forEach(hospName => {
    const opt = document.createElement("option");
    opt.value = hospName;
    datalist.appendChild(opt);
  });
}

function onCitySearch() {
  const cityQuery = document.getElementById("citySearch").value.trim();
  updateHospitalSuggestions(cityQuery);
  filterDoctors();
}

// ==========================================================
// 3. RENDER DOCTOR CARDS (LEFT COLUMN)
// ==========================================================
function displayDoctors(doctorList) {
  const container = document.getElementById("doctorList");
  const countLabel = document.getElementById("doctorCount");

  countLabel.textContent = doctorList.length;
  container.innerHTML = "";

  if (doctorList.length === 0) {
    container.innerHTML = `
      <div style="background: #fff; padding: 30px; text-align: center; border-radius: 8px; color: #64748b; border: 1px solid #cbd5e1;">
        <i class="fa-solid fa-user-slash" style="font-size: 2rem; margin-bottom: 8px; color: #94a3b8;"></i>
        <p>No doctors match your filter criteria. Try searching another city or hospital.</p>
      </div>
    `;
    return;
  }

  doctorList.forEach((doc, index) => {
    const isSelected = selectedDoctor && selectedDoctor.id === doc.id;
    const card = document.createElement("div");
    card.className = `doctor-item animate-card ${isSelected ? "active-doctor" : ""}`;
    card.id = `doctor-card-${doc.id}`;
    card.style.animationDelay = `${index * 0.07}s`;

    card.innerHTML = `
      <div class="doc-card-left">
        <img src="${doc.image}" alt="${doc.name}" class="doc-avatar" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3774/3774299.png'">
        <div class="doc-info-main">
          <h4>${doc.name}</h4>
          <span class="spec-badge">${doc.specialty}</span>
          <div class="doc-meta">
            <span><i class="fa-solid fa-hospital"></i> ${doc.hospital}</span>
            <span><i class="fa-solid fa-location-dot"></i> City: ${doc.city}</span>
            <span><i class="fa-solid fa-briefcase"></i> Experience: ${doc.experience}</span>
          </div>
        </div>
      </div>

      <div class="doc-action-col">
        <div class="fee-tag">${doc.fee}</div>
        <button class="btn-select-doc" onclick="selectDoctor(${doc.id})">
          <i class="fa-solid ${isSelected ? 'fa-check' : 'fa-calendar-plus'}"></i>
          ${isSelected ? 'Selected' : 'Select Doctor'}
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// ==========================================================
// 4. SEARCH & MULTI-FILTER FUNCTION
// ==========================================================
function filterDoctors() {
  const cityQuery = document.getElementById("citySearch").value.toLowerCase().trim();
  const hospitalQuery = document.getElementById("hospitalSearch").value.toLowerCase().trim();
  const specialty = document.getElementById("specialtyFilter").value;
  const searchName = document.getElementById("doctorSearch").value.toLowerCase().trim();

  const filtered = doctors.filter(doc => {
    // Matches city search (substring match)
    const matchCity = !cityQuery || doc.city.toLowerCase().includes(cityQuery);
    // Matches hospital search (substring match)
    const matchHospital = !hospitalQuery || doc.hospital.toLowerCase().includes(hospitalQuery);
    // Matches specialty filter
    const matchSpecialty = (specialty === "All") || (doc.specialty === specialty);
    // Matches doctor name search
    const matchName = doc.name.toLowerCase().includes(searchName);

    return matchCity && matchHospital && matchSpecialty && matchName;
  });

  displayDoctors(filtered);
}

// ==========================================================
// 5. SELECT DOCTOR (LOADS INTO RIGHT-HAND FORM)
// ==========================================================
function selectDoctor(doctorId) {
  const doc = doctors.find(d => d.id === doctorId);
  if (!doc) return;

  selectedDoctor = doc;

  // Highlight selected card and remove highlight from others
  document.querySelectorAll(".doctor-item").forEach(el => el.classList.remove("active-doctor"));
  const activeCard = document.getElementById(`doctor-card-${doc.id}`);
  if (activeCard) {
    activeCard.classList.add("active-doctor");
  }

  // Update preview box on the right
  const previewBox = document.getElementById("selectedDocBox");
  previewBox.className = "selected-doc-box has-doctor";
  previewBox.innerHTML = `
    <div class="doc-picked-details">
      <img src="${doc.image}" alt="${doc.name}" class="doc-picked-avatar" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3774/3774299.png'">
      <div>
        <h5><i class="fa-solid fa-user-doctor"></i> ${doc.name}</h5>
        <p><strong>Department:</strong> ${doc.specialty}</p>
        <p><strong>Hospital:</strong> ${doc.hospital} (${doc.city})</p>
        <p><strong>Consultation Fee:</strong> <span style="color:#0f172a; font-weight:700;">${doc.fee}</span></p>
      </div>
    </div>
  `;

  // Populate hidden form inputs
  document.getElementById("selectedDocId").value = doc.id;
  document.getElementById("selectedDocName").value = doc.name;
  document.getElementById("selectedHospital").value = doc.hospital;
  document.getElementById("selectedCity").value = doc.city;
  document.getElementById("selectedSpecialty").value = doc.specialty;
  document.getElementById("selectedFee").value = doc.fee;

  // Enable Confirm button
  document.getElementById("btnConfirm").disabled = false;

  // Hide previous success message if any
  document.getElementById("bookingSuccessBox").style.display = "none";

  // If on mobile screen, smoothly bring the form into view
  if (window.innerWidth < 860) {
    document.getElementById("booking-section").scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================================
// 6. APPOINTMENT FORM SUBMISSION & LOCALSTORAGE
// ==========================================================
function submitAppointment(event) {
  event.preventDefault(); // Prevent standard page reload

  if (!selectedDoctor) {
    alert("Please select a doctor from the list first!");
    return;
  }

  const patientName = document.getElementById("patientName").value.trim();
  const patientPhone = document.getElementById("patientPhone").value.trim();
  const patientAge = document.getElementById("patientAge").value.trim();
  const patientGender = document.getElementById("patientGender").value;
  const appointmentDate = document.getElementById("appointmentDate").value;
  const appointmentTime = document.getElementById("appointmentTime").value;

  // Generate unique appointment token (e.g. #APT-342)
  const token = "APT-" + Math.floor(100 + Math.random() * 900);

  // Appointment Object
  const newAppointment = {
    token: token,
    patientName: patientName,
    phone: patientPhone,
    age: patientAge,
    gender: patientGender,
    doctorName: selectedDoctor.name,
    specialty: selectedDoctor.specialty,
    hospital: selectedDoctor.hospital,
    city: selectedDoctor.city,
    fee: selectedDoctor.fee,
    date: appointmentDate,
    time: appointmentTime,
    bookedAt: new Date().toLocaleDateString()
  };

  // Retrieve and save to LocalStorage
  const existingList = JSON.parse(localStorage.getItem("medicare_appointments")) || [];
  existingList.unshift(newAppointment); // Add latest to the top
  localStorage.setItem("medicare_appointments", JSON.stringify(existingList));

  // Display Success Slip in the booking card
  const successBox = document.getElementById("bookingSuccessBox");
  successBox.style.display = "block";
  successBox.innerHTML = `
    <h5><i class="fa-solid fa-circle-check"></i> Booking Confirmed!</h5>
    <div class="token-highlight">TOKEN NUMBER: #${token}</div>
    <p><strong>Patient:</strong> ${patientName} (${patientAge}y, ${patientGender})</p>
    <p><strong>Doctor:</strong> ${selectedDoctor.name} &bull; ${selectedDoctor.hospital}</p>
    <p><strong>Slot:</strong> ${appointmentDate} at ${appointmentTime}</p>
    <p style="margin-top: 6px; font-size: 0.78rem; color: #15803d;">
      <i class="fa-solid fa-info-circle"></i> Added to your appointment records below.
    </p>
  `;

  // Reset patient inputs (keep doctor selected for convenience)
  document.getElementById("patientName").value = "";
  document.getElementById("patientPhone").value = "";
  document.getElementById("patientAge").value = "";

  // Refresh Table
  displayAppointmentsTable();

  // Scroll to view the appointment table
  setTimeout(() => {
    document.getElementById("records-section").scrollIntoView({ behavior: "smooth" });
  }, 400);
}

// ==========================================================
// 7. DISPLAY APPOINTMENTS TABLE (BOTTOM SECTION)
// ==========================================================
function displayAppointmentsTable() {
  const tableBody = document.getElementById("appointmentTableBody");
  const navCount = document.getElementById("nav-count");
  const list = JSON.parse(localStorage.getItem("medicare_appointments")) || [];

  navCount.textContent = list.length;
  tableBody.innerHTML = "";

  if (list.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-row">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 1.5rem; display: block; margin-bottom: 6px;"></i>
          No appointments booked yet. Select a doctor and submit the form above to add a booking.
        </td>
      </tr>
    `;
    return;
  }

  list.forEach((apt, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><span class="token-pill">#${apt.token}</span></td>
      <td>
        <strong>${apt.patientName}</strong><br>
        <span style="font-size: 0.8rem; color: #64748b;">${apt.age}y &bull; ${apt.gender} &bull; ${apt.phone}</span>
      </td>
      <td>
        <strong>${apt.doctorName}</strong><br>
        <span style="font-size: 0.8rem; color: #0284c7;">${apt.specialty}</span>
      </td>
      <td>
        <strong>${apt.hospital}</strong><br>
        <span style="font-size: 0.8rem; color: #64748b;">${apt.city}</span>
      </td>
      <td>
        <strong>${apt.date}</strong><br>
        <span style="font-size: 0.8rem; color: #475569;">${apt.time}</span>
      </td>
      <td><strong>${apt.fee}</strong></td>
      <td><span class="status-confirmed"><i class="fa-solid fa-check"></i> Confirmed</span></td>
      <td>
        <button class="btn-delete" title="Cancel Appointment" onclick="cancelAppointment(${index})">
          <i class="fa-solid fa-trash"></i> Cancel
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ==========================================================
// 8. CANCEL & CLEAR APPOINTMENTS
// ==========================================
function cancelAppointment(index) {
  const list = JSON.parse(localStorage.getItem("medicare_appointments")) || [];
  const apt = list[index];

  if (confirm(`Are you sure you want to cancel the appointment for ${apt.patientName} with ${apt.doctorName}?`)) {
    list.splice(index, 1);
    localStorage.setItem("medicare_appointments", JSON.stringify(list));
    displayAppointmentsTable();
  }
}

function clearAllAppointments() {
  const list = JSON.parse(localStorage.getItem("medicare_appointments")) || [];
  if (list.length === 0) {
    alert("There are no appointment records to clear.");
    return;
  }

  if (confirm("Are you sure you want to delete ALL booked appointment records?")) {
    localStorage.removeItem("medicare_appointments");
    displayAppointmentsTable();
  }
}

// ==========================================================
// 9. INITIALIZE ON WINDOW LOAD
// ==========================================================
window.onload = function () {
  // Set default minimum date in date picker to today
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("appointmentDate");
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today;
  }

  // Populate hospital suggestions for all cities
  updateHospitalSuggestions("");

  // Render initial doctor list
  displayDoctors(doctors);

  // Render booked appointments table from localStorage
  displayAppointmentsTable();
};
