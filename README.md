# 🏥 MediCare - Hospital & Doctor Appointment Portal
### College Continuous Assessment (CA) / Mini Project

A clean, modern, and conventional web application built using **pure HTML, CSS, and Vanilla JavaScript** without any bulky libraries or complex modals.

---

## 💡 How This Design Works (The "Split-View / Direct Form" Way)

Instead of confusing pop-up modals that cover the screen, this project uses a standard, user-friendly **2-column split layout**:

1. **Left Column (Search & Doctor Selection):**
   - **City Search Box:** Search by typing city name (with datalist suggestions for *Delhi, Mumbai, Bangalore, Kolkata, Chennai*).
   - **Hospital Search Box:** Search by typing hospital name (with dynamic datalist suggestions for *AIIMS, Apollo, Fortis, Max, Manipal, Kauvery*).
   - **Specialty Dropdown:** Filters by department (*Cardiologist, Neurologist, Pediatrician, Orthopedic, Dermatologist, General Physician*).
   - **Search Bar:** Real-time search by doctor or hospital name.
   - **Doctor Cards:** Displays illustrated doctor avatar, name, specialty, hospital, city, experience, and fee with a **"Select Doctor"** button.

2. **Right Column (Direct On-Page Booking Form):**
   - Stays conveniently in view as you scroll.
   - When you click **"Select Doctor"** on the left, it instantly highlights the card and loads the doctor's details into the form preview box.
   - Takes Patient Full Name, 10-digit Phone, Age, Gender, Date, and Time Slot.
   - Clicking **"Confirm & Book"** issues an instant digital token (e.g. `TOKEN #APT-482`) and displays a success confirmation slip.

3. **Bottom Section (Booked Appointments Table):**
   - A clean, professional table showing all booked appointments.
   - Displays Token ID, Patient details, Doctor, Hospital & City, Scheduled Date & Time, Consultation Fee, and Confirmed Status.
   - Each row has a **Cancel** button with confirmation.
   - Persisted via `localStorage` so data remains saved on page refresh.

---

## 📁 File Structure (Compact & Clean)

```text
project2/
├── index.html   # Semantic layout: Header, Search & Filter, Doctor Cards, Form & Table
├── style.css    # Clean medical CSS theme, 2-column responsive layout, buttons & table
├── script.js    # Database array, dynamic dropdowns, filter logic, booking & localStorage
└── README.md    # Documentation and explanation guide
```

---

## 🎓 Viva / Presentation Highlights for College CA

- **Why this design over popups?**
  > *"Having the search results on the left and the booking form visible on the right creates a seamless, standard workflow. Users can compare doctors and immediately fill in their details without dealing with disruptive modal overlays."*
- **How does the hospital dropdown update?**
  > *"When the city search query changes, `onCitySearch()` calls `updateHospitalDropdown()`, which collects unique hospitals in that city using JavaScript's `Set()` and rebuilds the dropdown options dynamically."*
- **Where are appointments saved?**
  > *"Appointments are stored as an array of JSON objects inside the browser's `localStorage` using `JSON.stringify()` and retrieved with `JSON.parse()` on page load."*
