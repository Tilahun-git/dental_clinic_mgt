// ==================== TYPES ====================

export type Role = 'ADMIN' | 'RECEPTIONIST' | 'DENTIST' | 'CASHIER' | 'INVENTORY_MANAGER' | 'PATIENT';

export type AppointmentStatus = 'REQUESTED' | 'CONFIRMED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type InvoiceStatus = 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';
export type PayrollStatus = 'DRAFT' | 'CALCULATED' | 'APPROVED' | 'PAID' | 'FAILED';
export type TreatmentStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ToothCondition = 'HEALTHY' | 'CARIES' | 'MISSING' | 'FILLED' | 'CROWN' | 'ROOT_CANAL' | 'EXTRACTION' | 'IMPLANT' | 'FRACTURE';

// ==================== SERVICES ====================

export const services = [
  { id: 's1', name: 'General Consultation', description: 'Comprehensive oral examination and diagnosis', duration: 30, price: 500, category: 'General', icon: '🦷' },
  { id: 's2', name: 'Teeth Cleaning', description: 'Professional dental cleaning and scaling', duration: 45, price: 800, category: 'Preventive', icon: '✨' },
  { id: 's3', name: 'Root Canal Treatment', description: 'Complete root canal therapy for infected teeth', duration: 90, price: 4500, category: 'Endodontic', icon: '🔬' },
  { id: 's4', name: 'Dental Implant', description: 'Permanent tooth replacement with titanium implant', duration: 120, price: 25000, category: 'Surgical', icon: '🔩' },
  { id: 's5', name: 'Teeth Whitening', description: 'Professional in-office whitening treatment', duration: 60, price: 3500, category: 'Cosmetic', icon: '⭐' },
  { id: 's6', name: 'Orthodontics', description: 'Braces and clear aligners for teeth alignment', duration: 60, price: 35000, category: 'Orthodontic', icon: '😁' },
  { id: 's7', name: 'Tooth Extraction', description: 'Safe removal of damaged or impacted teeth', duration: 45, price: 1200, category: 'Surgical', icon: '🦺' },
  { id: 's8', name: 'Dental Filling', description: 'Composite or amalgam filling for cavities', duration: 45, price: 1500, category: 'Restorative', icon: '🔧' },
  { id: 's9', name: 'Dental Crown', description: 'Porcelain or metal crown for damaged teeth', duration: 90, price: 8000, category: 'Restorative', icon: '👑' },
];

// ==================== DENTISTS ====================

export const dentists = [
  {
    id: 'd1',
    name: 'Dr. Yohannes Tesfaye',
    specialization: 'General Dentistry & Cosmetic',
    experience: 12,
    bio: 'Dr. Yohannes has over 12 years of experience in general and cosmetic dentistry. He completed his training at Addis Ababa University and has additional certification in cosmetic procedures.',
    available: true,
    avatar: 'YT',
  },
  {
    id: 'd2',
    name: 'Dr. Marta Bekele',
    specialization: 'Orthodontics & Pediatric',
    experience: 8,
    bio: 'Dr. Marta specializes in orthodontic treatment for both children and adults. She has a passion for creating beautiful, confident smiles using the latest techniques.',
    available: true,
    avatar: 'MB',
  },
  {
    id: 'd3',
    name: 'Dr. Dawit Girma',
    specialization: 'Oral Surgery & Implantology',
    experience: 15,
    bio: 'With 15 years in oral surgery, Dr. Dawit is our lead implantologist. He has successfully placed over 800 implants and performs complex extractions with precision.',
    available: true,
    avatar: 'DG',
  },
  {
    id: 'd4',
    name: 'Dr. Tigist Haile',
    specialization: 'Endodontics & Restorative',
    experience: 10,
    bio: 'Dr. Tigist is an expert in root canal therapy and restorative dentistry. She uses the latest rotary endodontic technology to ensure painless, efficient treatments.',
    available: false,
    avatar: 'TH',
  },
];

// ==================== PATIENTS ====================

export const patients = [
  { id: 'p1', patientId: 'PT-001', firstName: 'Abebe', lastName: 'Kebede', phone: '+251 911 234567', email: 'abebe.kebede@email.com', dob: '1985-03-15', gender: 'Male', address: 'Bole, Addis Ababa', bloodType: 'O+', allergies: 'Penicillin', status: 'Active', registeredAt: '2022-01-10' },
  { id: 'p2', patientId: 'PT-002', firstName: 'Selamawit', lastName: 'Alemu', phone: '+251 912 345678', email: 'selam.alemu@email.com', dob: '1992-07-22', gender: 'Female', address: 'Kazanchis, Addis Ababa', bloodType: 'A+', allergies: 'None', status: 'Active', registeredAt: '2022-03-05' },
  { id: 'p3', patientId: 'PT-003', firstName: 'Girma', lastName: 'Tadesse', phone: '+251 913 456789', email: 'girma.tadesse@email.com', dob: '1978-11-08', gender: 'Male', address: 'Piassa, Addis Ababa', bloodType: 'B+', allergies: 'Latex', status: 'Active', registeredAt: '2022-05-18' },
  { id: 'p4', patientId: 'PT-004', firstName: 'Hiwot', lastName: 'Mekonnen', phone: '+251 914 567890', email: 'hiwot.meko@email.com', dob: '1995-02-14', gender: 'Female', address: 'Sarbet, Addis Ababa', bloodType: 'AB+', allergies: 'Aspirin', status: 'Active', registeredAt: '2022-08-30' },
  { id: 'p5', patientId: 'PT-005', firstName: 'Biruk', lastName: 'Hailu', phone: '+251 915 678901', email: 'biruk.hailu@email.com', dob: '1988-09-03', gender: 'Male', address: 'Megenagna, Addis Ababa', bloodType: 'O-', allergies: 'None', status: 'Inactive', registeredAt: '2022-10-12' },
  { id: 'p6', patientId: 'PT-006', firstName: 'Tigist', lastName: 'Worku', phone: '+251 916 789012', email: 'tigist.worku@email.com', dob: '2001-05-27', gender: 'Female', address: 'Gerji, Addis Ababa', bloodType: 'A-', allergies: 'None', status: 'Active', registeredAt: '2023-01-20' },
  { id: 'p7', patientId: 'PT-007', firstName: 'Solomon', lastName: 'Desta', phone: '+251 917 890123', email: 'solomon.desta@email.com', dob: '1975-12-19', gender: 'Male', address: 'Lebu, Addis Ababa', bloodType: 'B-', allergies: 'Codeine', status: 'Active', registeredAt: '2023-03-08' },
  { id: 'p8', patientId: 'PT-008', firstName: 'Meron', lastName: 'Fekadu', phone: '+251 918 901234', email: 'meron.fekadu@email.com', dob: '1990-08-11', gender: 'Female', address: 'Ayat, Addis Ababa', bloodType: 'O+', allergies: 'None', status: 'Active', registeredAt: '2023-05-14' },
  { id: 'p9', patientId: 'PT-009', firstName: 'Yonas', lastName: 'Girma', phone: '+251 919 012345', email: 'yonas.girma@email.com', dob: '1983-04-30', gender: 'Male', address: 'Jemo, Addis Ababa', bloodType: 'A+', allergies: 'Ibuprofen', status: 'Active', registeredAt: '2023-07-22' },
  { id: 'p10', patientId: 'PT-010', firstName: 'Bethlehem', lastName: 'Tsegaye', phone: '+251 910 123456', email: 'beth.tsegaye@email.com', dob: '1997-01-06', gender: 'Female', address: 'Summit, Addis Ababa', bloodType: 'AB-', allergies: 'None', status: 'Active', registeredAt: '2023-09-05' },
];

// ==================== APPOINTMENTS ====================

export const appointments = [
  { id: 'a1', patientId: 'p1', patientName: 'Abebe Kebede', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's1', serviceName: 'General Consultation', date: '2025-07-14', time: '09:00', status: 'COMPLETED' as AppointmentStatus, notes: 'Regular checkup', room: 'Room 1' },
  { id: 'a2', patientId: 'p2', patientName: 'Selamawit Alemu', dentistId: 'd2', dentistName: 'Dr. Marta Bekele', serviceId: 's6', serviceName: 'Orthodontics', date: '2025-07-14', time: '09:30', status: 'IN_PROGRESS' as AppointmentStatus, notes: 'Follow-up for braces', room: 'Room 2' },
  { id: 'a3', patientId: 'p3', patientName: 'Girma Tadesse', dentistId: 'd3', dentistName: 'Dr. Dawit Girma', serviceId: 's4', serviceName: 'Dental Implant', date: '2025-07-14', time: '10:00', status: 'CHECKED_IN' as AppointmentStatus, notes: 'Implant consultation', room: 'Room 3' },
  { id: 'a4', patientId: 'p4', patientName: 'Hiwot Mekonnen', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's5', serviceName: 'Teeth Whitening', date: '2025-07-14', time: '10:30', status: 'CONFIRMED' as AppointmentStatus, notes: '', room: 'Room 1' },
  { id: 'a5', patientId: 'p5', patientName: 'Biruk Hailu', dentistId: 'd4', dentistName: 'Dr. Tigist Haile', serviceId: 's3', serviceName: 'Root Canal Treatment', date: '2025-07-14', time: '11:00', status: 'CONFIRMED' as AppointmentStatus, notes: 'Tooth #14', room: 'Room 4' },
  { id: 'a6', patientId: 'p6', patientName: 'Tigist Worku', dentistId: 'd2', dentistName: 'Dr. Marta Bekele', serviceId: 's2', serviceName: 'Teeth Cleaning', date: '2025-07-14', time: '11:30', status: 'REQUESTED' as AppointmentStatus, notes: '', room: '' },
  { id: 'a7', patientId: 'p7', patientName: 'Solomon Desta', dentistId: 'd3', dentistName: 'Dr. Dawit Girma', serviceId: 's7', serviceName: 'Tooth Extraction', date: '2025-07-14', time: '13:00', status: 'CONFIRMED' as AppointmentStatus, notes: 'Wisdom tooth', room: 'Room 3' },
  { id: 'a8', patientId: 'p8', patientName: 'Meron Fekadu', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's8', serviceName: 'Dental Filling', date: '2025-07-14', time: '13:30', status: 'CONFIRMED' as AppointmentStatus, notes: 'Two cavities', room: 'Room 1' },
  { id: 'a9', patientId: 'p9', patientName: 'Yonas Girma', dentistId: 'd4', dentistName: 'Dr. Tigist Haile', serviceId: 's9', serviceName: 'Dental Crown', date: '2025-07-15', time: '09:00', status: 'CONFIRMED' as AppointmentStatus, notes: 'Crown placement', room: 'Room 4' },
  { id: 'a10', patientId: 'p10', patientName: 'Bethlehem Tsegaye', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's1', serviceName: 'General Consultation', date: '2025-07-15', time: '09:30', status: 'CONFIRMED' as AppointmentStatus, notes: 'First visit', room: 'Room 1' },
  { id: 'a11', patientId: 'p1', patientName: 'Abebe Kebede', dentistId: 'd3', dentistName: 'Dr. Dawit Girma', serviceId: 's4', serviceName: 'Dental Implant', date: '2025-07-13', time: '10:00', status: 'COMPLETED' as AppointmentStatus, notes: 'Implant surgery', room: 'Room 3' },
  { id: 'a12', patientId: 'p2', patientName: 'Selamawit Alemu', dentistId: 'd2', dentistName: 'Dr. Marta Bekele', serviceId: 's6', serviceName: 'Orthodontics', date: '2025-07-12', time: '14:00', status: 'COMPLETED' as AppointmentStatus, notes: 'Wire adjustment', room: 'Room 2' },
  { id: 'a13', patientId: 'p3', patientName: 'Girma Tadesse', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's2', serviceName: 'Teeth Cleaning', date: '2025-07-10', time: '11:00', status: 'CANCELLED' as AppointmentStatus, notes: 'Patient cancelled', room: '' },
  { id: 'a14', patientId: 'p4', patientName: 'Hiwot Mekonnen', dentistId: 'd4', dentistName: 'Dr. Tigist Haile', serviceId: 's3', serviceName: 'Root Canal Treatment', date: '2025-07-09', time: '10:00', status: 'NO_SHOW' as AppointmentStatus, notes: '', room: 'Room 4' },
  { id: 'a15', patientId: 'p6', patientName: 'Tigist Worku', dentistId: 'd2', dentistName: 'Dr. Marta Bekele', serviceId: 's6', serviceName: 'Orthodontics', date: '2025-07-16', time: '15:00', status: 'REQUESTED' as AppointmentStatus, notes: 'Initial consultation', room: '' },
  { id: 'a16', patientId: 'p7', patientName: 'Solomon Desta', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's5', serviceName: 'Teeth Whitening', date: '2025-07-17', time: '14:00', status: 'CONFIRMED' as AppointmentStatus, notes: '', room: 'Room 1' },
  { id: 'a17', patientId: 'p8', patientName: 'Meron Fekadu', dentistId: 'd3', dentistName: 'Dr. Dawit Girma', serviceId: 's7', serviceName: 'Tooth Extraction', date: '2025-07-08', time: '09:00', status: 'COMPLETED' as AppointmentStatus, notes: 'Lower molar', room: 'Room 3' },
  { id: 'a18', patientId: 'p9', patientName: 'Yonas Girma', dentistId: 'd4', dentistName: 'Dr. Tigist Haile', serviceId: 's3', serviceName: 'Root Canal Treatment', date: '2025-07-07', time: '10:30', status: 'COMPLETED' as AppointmentStatus, notes: 'Successful', room: 'Room 4' },
  { id: 'a19', patientId: 'p5', patientName: 'Biruk Hailu', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', serviceId: 's8', serviceName: 'Dental Filling', date: '2025-07-18', time: '13:00', status: 'CONFIRMED' as AppointmentStatus, notes: '', room: 'Room 1' },
  { id: 'a20', patientId: 'p10', patientName: 'Bethlehem Tsegaye', dentistId: 'd2', dentistName: 'Dr. Marta Bekele', serviceId: 's1', serviceName: 'General Consultation', date: '2025-07-05', time: '11:00', status: 'COMPLETED' as AppointmentStatus, notes: 'New patient exam', room: 'Room 2' },
];

// ==================== WAITING QUEUE ====================

export const waitingQueue = [
  { id: 'q1', patientId: 'p2', patientName: 'Selamawit Alemu', checkInTime: '08:45', waitMinutes: 45, dentistId: 'd2', dentistName: 'Dr. Marta Bekele', service: 'Orthodontics', room: 'Room 2', status: 'IN_PROGRESS' },
  { id: 'q2', patientId: 'p3', patientName: 'Girma Tadesse', checkInTime: '09:15', waitMinutes: 25, dentistId: 'd3', dentistName: 'Dr. Dawit Girma', service: 'Dental Implant', room: 'Room 3', status: 'WAITING' },
  { id: 'q3', patientId: 'p1', patientName: 'Abebe Kebede', checkInTime: '09:45', waitMinutes: 15, dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', service: 'Consultation', room: 'Room 1', status: 'WAITING' },
  { id: 'q4', patientId: 'p6', patientName: 'Tigist Worku', checkInTime: '10:00', waitMinutes: 5, dentistId: 'd2', dentistName: 'Dr. Marta Bekele', service: 'Teeth Cleaning', room: '', status: 'WAITING' },
  { id: 'q5', patientId: 'p8', patientName: 'Meron Fekadu', checkInTime: '10:10', waitMinutes: 0, dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye', service: 'Dental Filling', room: '', status: 'JUST_ARRIVED' },
];

// ==================== TREATMENT PLANS ====================

export const treatmentPlans = [
  {
    id: 'tp1', patientId: 'p1', patientName: 'Abebe Kebede', dentistId: 'd3', dentistName: 'Dr. Dawit Girma',
    diagnosis: 'Missing lower molar, requires implant placement',
    items: [
      { id: 'ti1', service: 'Consultation', quantity: 1, unitPrice: 500, status: 'COMPLETED' },
      { id: 'ti2', service: 'Dental Implant (Surgery)', quantity: 1, unitPrice: 25000, status: 'COMPLETED' },
      { id: 'ti3', service: 'Crown Placement', quantity: 1, unitPrice: 8000, status: 'IN_PROGRESS' },
    ],
    totalCost: 33500, status: 'IN_PROGRESS' as TreatmentStatus, createdAt: '2025-06-15', notes: 'Patient responding well to implant'
  },
  {
    id: 'tp2', patientId: 'p2', patientName: 'Selamawit Alemu', dentistId: 'd2', dentistName: 'Dr. Marta Bekele',
    diagnosis: 'Moderate crowding, braces treatment required',
    items: [
      { id: 'ti4', service: 'Consultation', quantity: 1, unitPrice: 500, status: 'COMPLETED' },
      { id: 'ti5', service: 'X-Ray & Study Models', quantity: 1, unitPrice: 1500, status: 'COMPLETED' },
      { id: 'ti6', service: 'Braces Placement', quantity: 1, unitPrice: 35000, status: 'COMPLETED' },
      { id: 'ti7', service: 'Monthly Adjustments (12)', quantity: 12, unitPrice: 800, status: 'IN_PROGRESS' },
    ],
    totalCost: 46600, status: 'IN_PROGRESS' as TreatmentStatus, createdAt: '2025-02-10', notes: '4 months into 18-month treatment'
  },
  {
    id: 'tp3', patientId: 'p4', patientName: 'Hiwot Mekonnen', dentistId: 'd4', dentistName: 'Dr. Tigist Haile',
    diagnosis: 'Root canal needed on tooth #14',
    items: [
      { id: 'ti8', service: 'Root Canal Treatment', quantity: 1, unitPrice: 4500, status: 'PLANNED' },
      { id: 'ti9', service: 'Temporary Crown', quantity: 1, unitPrice: 2000, status: 'PLANNED' },
      { id: 'ti10', service: 'Permanent Crown', quantity: 1, unitPrice: 8000, status: 'PLANNED' },
    ],
    totalCost: 14500, status: 'PLANNED' as TreatmentStatus, createdAt: '2025-07-05', notes: 'Schedule root canal ASAP'
  },
  {
    id: 'tp4', patientId: 'p9', patientName: 'Yonas Girma', dentistId: 'd4', dentistName: 'Dr. Tigist Haile',
    diagnosis: 'Tooth decay on multiple teeth, root canal and fillings',
    items: [
      { id: 'ti11', service: 'Root Canal Treatment', quantity: 2, unitPrice: 4500, status: 'COMPLETED' },
      { id: 'ti12', service: 'Composite Filling', quantity: 3, unitPrice: 1500, status: 'COMPLETED' },
    ],
    totalCost: 13500, status: 'COMPLETED' as TreatmentStatus, createdAt: '2025-05-01', notes: 'All treatment completed successfully'
  },
  {
    id: 'tp5', patientId: 'p7', patientName: 'Solomon Desta', dentistId: 'd3', dentistName: 'Dr. Dawit Girma',
    diagnosis: 'Impacted wisdom teeth bilateral lower',
    items: [
      { id: 'ti13', service: 'X-Ray (Panoramic)', quantity: 1, unitPrice: 1200, status: 'COMPLETED' },
      { id: 'ti14', service: 'Wisdom Tooth Extraction (x2)', quantity: 2, unitPrice: 2500, status: 'IN_PROGRESS' },
    ],
    totalCost: 6200, status: 'IN_PROGRESS' as TreatmentStatus, createdAt: '2025-07-01', notes: 'First extraction done, second scheduled'
  },
];

// ==================== PRESCRIPTIONS ====================

export const prescriptions = [
  {
    id: 'rx1', patientId: 'p1', patientName: 'Abebe Kebede', dentistId: 'd3', dentistName: 'Dr. Dawit Girma',
    date: '2025-07-13', appointmentId: 'a11',
    medications: [
      { name: 'Amoxicillin 500mg', dosage: '1 capsule', frequency: '3x daily', duration: '7 days', instructions: 'Take with food' },
      { name: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'Every 6 hours as needed', duration: '3 days', instructions: 'For pain relief' },
    ],
    notes: 'Post-implant surgery prescription. Avoid hard foods.',
  },
  {
    id: 'rx2', patientId: 'p9', patientName: 'Yonas Girma', dentistId: 'd4', dentistName: 'Dr. Tigist Haile',
    date: '2025-07-07', appointmentId: 'a18',
    medications: [
      { name: 'Metronidazole 400mg', dosage: '1 tablet', frequency: '2x daily', duration: '5 days', instructions: 'Take after meals' },
      { name: 'Paracetamol 500mg', dosage: '2 tablets', frequency: 'Every 8 hours', duration: '3 days', instructions: 'For pain' },
    ],
    notes: 'Post root canal treatment.',
  },
  {
    id: 'rx3', patientId: 'p8', patientName: 'Meron Fekadu', dentistId: 'd3', dentistName: 'Dr. Dawit Girma',
    date: '2025-07-08', appointmentId: 'a17',
    medications: [
      { name: 'Clindamycin 300mg', dosage: '1 capsule', frequency: '4x daily', duration: '7 days', instructions: 'Complete full course' },
    ],
    notes: 'Post extraction antibiotic prophylaxis.',
  },
  {
    id: 'rx4', patientId: 'p4', patientName: 'Hiwot Mekonnen', dentistId: 'd4', dentistName: 'Dr. Tigist Haile',
    date: '2025-07-05', appointmentId: 'a5',
    medications: [
      { name: 'Chlorhexidine Mouthwash', dosage: '10ml', frequency: '2x daily', duration: '14 days', instructions: 'Do not swallow' },
      { name: 'Naproxen 500mg', dosage: '1 tablet', frequency: '2x daily', duration: '5 days', instructions: 'Take with food' },
    ],
    notes: 'Pre-root canal medication.',
  },
  {
    id: 'rx5', patientId: 'p3', patientName: 'Girma Tadesse', dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye',
    date: '2025-06-20', appointmentId: 'a3',
    medications: [
      { name: 'Fluoride Toothpaste Prescription', dosage: 'Pea-sized amount', frequency: '2x daily', duration: '30 days', instructions: 'Do not rinse immediately' },
    ],
    notes: 'High caries risk prevention protocol.',
  },
  {
    id: 'rx6', patientId: 'p7', patientName: 'Solomon Desta', dentistId: 'd3', dentistName: 'Dr. Dawit Girma',
    date: '2025-07-13', appointmentId: 'a7',
    medications: [
      { name: 'Amoxicillin 500mg', dosage: '1 capsule', frequency: '3x daily', duration: '5 days', instructions: 'Start 1hr before procedure' },
      { name: 'Ibuprofen 600mg', dosage: '1 tablet', frequency: 'Every 8 hours', duration: '3 days', instructions: 'Take after eating' },
    ],
    notes: 'Pre/post extraction for wisdom tooth.',
  },
  {
    id: 'rx7', patientId: 'p2', patientName: 'Selamawit Alemu', dentistId: 'd2', dentistName: 'Dr. Marta Bekele',
    date: '2025-07-12', appointmentId: 'a12',
    medications: [
      { name: 'Orthodontic Wax', dosage: 'As needed', frequency: 'As needed', duration: 'Until next visit', instructions: 'Apply over bracket if irritating' },
      { name: 'Fluoride Rinse', dosage: '10ml', frequency: 'Once daily', duration: '30 days', instructions: 'Use before bedtime' },
    ],
    notes: 'Post wire adjustment discomfort management.',
  },
  {
    id: 'rx8', patientId: 'p10', patientName: 'Bethlehem Tsegaye', dentistId: 'd2', dentistName: 'Dr. Marta Bekele',
    date: '2025-07-05', appointmentId: 'a20',
    medications: [
      { name: 'Sensodyne Toothpaste', dosage: 'Regular brushing amount', frequency: '2x daily', duration: '60 days', instructions: 'For sensitive teeth' },
    ],
    notes: 'Patient has dentinal hypersensitivity.',
  },
];

// ==================== INVOICES ====================

export const invoices = [
  {
    id: 'inv1', invoiceNumber: 'INV-2025-0041', patientId: 'p1', patientName: 'Abebe Kebede',
    dentistName: 'Dr. Dawit Girma', date: '2025-07-13', dueDate: '2025-07-20',
    items: [
      { description: 'Dental Implant Surgery', quantity: 1, unitPrice: 25000, total: 25000 },
      { description: 'Consultation Fee', quantity: 1, unitPrice: 500, total: 500 },
    ],
    subtotal: 25500, discount: 0, tax: 1275, total: 26775,
    status: 'PARTIALLY_PAID' as InvoiceStatus,
    payments: [
      { id: 'pay1', date: '2025-07-13', amount: 10000, method: 'Cash', reference: 'RCP-001' },
    ],
    balance: 16775,
  },
  {
    id: 'inv2', invoiceNumber: 'INV-2025-0040', patientId: 'p9', patientName: 'Yonas Girma',
    dentistName: 'Dr. Tigist Haile', date: '2025-07-07', dueDate: '2025-07-14',
    items: [
      { description: 'Root Canal Treatment x2', quantity: 2, unitPrice: 4500, total: 9000 },
      { description: 'Composite Filling x3', quantity: 3, unitPrice: 1500, total: 4500 },
    ],
    subtotal: 13500, discount: 500, tax: 650, total: 13650,
    status: 'PAID' as InvoiceStatus,
    payments: [
      { id: 'pay2', date: '2025-07-07', amount: 13650, method: 'Bank Transfer', reference: 'TXN-887234' },
    ],
    balance: 0,
  },
  {
    id: 'inv3', invoiceNumber: 'INV-2025-0039', patientId: 'p2', patientName: 'Selamawit Alemu',
    dentistName: 'Dr. Marta Bekele', date: '2025-07-12', dueDate: '2025-07-19',
    items: [
      { description: 'Orthodontic Adjustment', quantity: 1, unitPrice: 800, total: 800 },
    ],
    subtotal: 800, discount: 0, tax: 40, total: 840,
    status: 'UNPAID' as InvoiceStatus,
    payments: [],
    balance: 840,
  },
  {
    id: 'inv4', invoiceNumber: 'INV-2025-0038', patientId: 'p8', patientName: 'Meron Fekadu',
    dentistName: 'Dr. Dawit Girma', date: '2025-07-08', dueDate: '2025-07-15',
    items: [
      { description: 'Tooth Extraction (Lower Molar)', quantity: 1, unitPrice: 1200, total: 1200 },
    ],
    subtotal: 1200, discount: 0, tax: 60, total: 1260,
    status: 'PAID' as InvoiceStatus,
    payments: [
      { id: 'pay3', date: '2025-07-08', amount: 1260, method: 'Cash', reference: 'RCP-089' },
    ],
    balance: 0,
  },
  {
    id: 'inv5', invoiceNumber: 'INV-2025-0037', patientId: 'p3', patientName: 'Girma Tadesse',
    dentistName: 'Dr. Dawit Girma', date: '2025-07-01', dueDate: '2025-07-08',
    items: [
      { description: 'Implant Consultation & X-Ray', quantity: 1, unitPrice: 1700, total: 1700 },
    ],
    subtotal: 1700, discount: 200, tax: 75, total: 1575,
    status: 'UNPAID' as InvoiceStatus,
    payments: [],
    balance: 1575,
  },
  {
    id: 'inv6', invoiceNumber: 'INV-2025-0036', patientId: 'p7', patientName: 'Solomon Desta',
    dentistName: 'Dr. Dawit Girma', date: '2025-07-13', dueDate: '2025-07-20',
    items: [
      { description: 'Wisdom Tooth Extraction', quantity: 1, unitPrice: 2500, total: 2500 },
      { description: 'Panoramic X-Ray', quantity: 1, unitPrice: 1200, total: 1200 },
    ],
    subtotal: 3700, discount: 0, tax: 185, total: 3885,
    status: 'PARTIALLY_PAID' as InvoiceStatus,
    payments: [
      { id: 'pay4', date: '2025-07-13', amount: 2000, method: 'Mobile Banking', reference: 'CBE-443211' },
    ],
    balance: 1885,
  },
];

// ==================== PAYROLL ====================

export type PayrollEntry = {
  id: string;
  payrollNumber: string;
  employeeId: string;
  employeeName: string;
  position: string;
  payPeriod: string;
  basicSalary: number;
  overtime: number;
  bonus: number;
  allowance: number;
  grossSalary: number;
  tax: number;
  pension: number;
  otherDeductions: number;
  totalDeductions: number;
  netSalary: number;
  status: PayrollStatus;
  paymentDate?: string;
  paymentMethod?: string;
  paymentReference?: string;
  bankAccount?: string;
};

export const payrollRecords: PayrollEntry[] = [
  {
    id: 'pr1', payrollNumber: 'PR-2026-09-001', employeeId: 'st1', employeeName: 'Dr. Yohannes Tesfaye', position: 'Dentist',
    payPeriod: '2026-09', basicSalary: 40000, overtime: 2000, bonus: 3000, allowance: 1000,
    grossSalary: 46000, tax: 6000, pension: 2300, otherDeductions: 500, totalDeductions: 8800, netSalary: 37200,
    status: 'PAID', paymentDate: '2026-09-30', paymentMethod: 'Bank Transfer', paymentReference: 'BANK-PR-001', bankAccount: 'CBE 1002345678',
  },
  {
    id: 'pr2', payrollNumber: 'PR-2026-09-002', employeeId: 'st5', employeeName: 'Sara Mengistu', position: 'Receptionist',
    payPeriod: '2026-09', basicSalary: 15000, overtime: 1000, bonus: 0, allowance: 800,
    grossSalary: 16800, tax: 1800, pension: 850, otherDeductions: 250, totalDeductions: 2900, netSalary: 13900,
    status: 'APPROVED', paymentDate: '2026-09-30', paymentMethod: 'Bank Transfer', paymentReference: 'BANK-PR-002', bankAccount: 'Awash 2034567890',
  },
  {
    id: 'pr3', payrollNumber: 'PR-2026-09-003', employeeId: 'st7', employeeName: 'Liya Ayalew', position: 'Inventory Manager',
    payPeriod: '2026-09', basicSalary: 18000, overtime: 1500, bonus: 2000, allowance: 1200,
    grossSalary: 22700, tax: 2200, pension: 1100, otherDeductions: 400, totalDeductions: 3700, netSalary: 19000,
    status: 'PAID', paymentDate: '2026-09-30', paymentMethod: 'Bank Transfer', paymentReference: 'BANK-PR-003', bankAccount: 'Dashen 3087654321',
  },
  {
    id: 'pr4', payrollNumber: 'PR-2026-09-004', employeeId: 'st6', employeeName: 'Tadesse Worku', position: 'Cashier',
    payPeriod: '2026-09', basicSalary: 18000, overtime: 800, bonus: 1200, allowance: 900,
    grossSalary: 20900, tax: 2100, pension: 1000, otherDeductions: 300, totalDeductions: 3400, netSalary: 17500,
    status: 'CALCULATED', paymentDate: undefined, paymentMethod: undefined, paymentReference: undefined, bankAccount: 'CBE 1987654321',
  },
];

// ==================== INVENTORY ====================

export const inventory = [
  { id: 'inv_i1', name: 'Composite Resin (A2 Shade)', category: 'Restorative', quantity: 5, minQuantity: 10, unit: 'Syringe', unitCost: 850, supplier: 'DentSupply Co', expiryDate: '2026-03-01', location: 'Cabinet A' },
  { id: 'inv_i2', name: 'Local Anesthetic (Lidocaine 2%)', category: 'Anesthesia', quantity: 3, minQuantity: 20, unit: 'Cartridge', unitCost: 45, supplier: 'MedPharma Ethiopia', expiryDate: '2025-12-15', location: 'Fridge 1' },
  { id: 'inv_i3', name: 'Dental Gloves (Medium)', category: 'PPE', quantity: 8, minQuantity: 10, unit: 'Box', unitCost: 120, supplier: 'SafeGuard Supplies', expiryDate: '2027-01-01', location: 'Supply Room' },
  { id: 'inv_i4', name: 'Disposable Masks', category: 'PPE', quantity: 15, minQuantity: 10, unit: 'Box', unitCost: 90, supplier: 'SafeGuard Supplies', expiryDate: '2027-01-01', location: 'Supply Room' },
  { id: 'inv_i5', name: 'Dental Burs (Round, Assorted)', category: 'Instruments', quantity: 45, minQuantity: 20, unit: 'Piece', unitCost: 35, supplier: 'DentSupply Co', expiryDate: '2028-01-01', location: 'Cabinet B' },
  { id: 'inv_i6', name: 'Alginate Impression Material', category: 'Impressions', quantity: 12, minQuantity: 8, unit: 'Pouch', unitCost: 320, supplier: 'OrthoMaterials Ltd', expiryDate: '2025-11-20', location: 'Cabinet C' },
  { id: 'inv_i7', name: 'Dental X-Ray Films', category: 'Radiography', quantity: 200, minQuantity: 50, unit: 'Piece', unitCost: 18, supplier: 'ImagingPro', expiryDate: '2026-06-01', location: 'Dark Room' },
  { id: 'inv_i8', name: 'Stainless Steel Crowns (Assorted)', category: 'Restorative', quantity: 30, minQuantity: 15, unit: 'Piece', unitCost: 450, supplier: 'DentSupply Co', expiryDate: '2029-01-01', location: 'Cabinet A' },
  { id: 'inv_i9', name: 'Calcium Hydroxide Paste', category: 'Endodontic', quantity: 7, minQuantity: 5, unit: 'Tube', unitCost: 280, supplier: 'Endo Solutions', expiryDate: '2026-08-01', location: 'Cabinet D' },
  { id: 'inv_i10', name: 'Orthodontic Wire (Nickel-Titanium)', category: 'Orthodontic', quantity: 25, minQuantity: 10, unit: 'Pack', unitCost: 650, supplier: 'OrthoMaterials Ltd', expiryDate: '2028-05-01', location: 'Ortho Cabinet' },
  { id: 'inv_i11', name: 'Sutures (3-0 Silk)', category: 'Surgical', quantity: 40, minQuantity: 20, unit: 'Pack', unitCost: 95, supplier: 'MedPharma Ethiopia', expiryDate: '2026-09-15', location: 'Surgery Cabinet' },
  { id: 'inv_i12', name: 'Dental Cement (Glass Ionomer)', category: 'Restorative', quantity: 18, minQuantity: 10, unit: 'Pack', unitCost: 420, supplier: 'DentSupply Co', expiryDate: '2026-04-01', location: 'Cabinet A' },
  { id: 'inv_i13', name: 'Hydrogen Peroxide 35% (Whitening)', category: 'Cosmetic', quantity: 6, minQuantity: 5, unit: 'Bottle', unitCost: 1200, supplier: 'WhitePro Supplies', expiryDate: '2025-10-01', location: 'Cold Storage' },
  { id: 'inv_i14', name: 'Sterile Gauze Pads', category: 'Consumables', quantity: 500, minQuantity: 100, unit: 'Piece', unitCost: 3, supplier: 'MedPharma Ethiopia', expiryDate: '2027-03-01', location: 'Supply Room' },
  { id: 'inv_i15', name: 'Topical Anesthetic Gel', category: 'Anesthesia', quantity: 8, minQuantity: 5, unit: 'Tube', unitCost: 350, supplier: 'MedPharma Ethiopia', expiryDate: '2026-07-01', location: 'Cabinet B' },
  { id: 'inv_i16', name: 'Prophy Paste (Mint)', category: 'Preventive', quantity: 24, minQuantity: 10, unit: 'Cup', unitCost: 45, supplier: 'DentSupply Co', expiryDate: '2026-05-01', location: 'Cabinet C' },
  { id: 'inv_i17', name: 'Disposable Patient Bibs', category: 'Consumables', quantity: 200, minQuantity: 50, unit: 'Piece', unitCost: 5, supplier: 'SafeGuard Supplies', expiryDate: '2028-01-01', location: 'Supply Room' },
  { id: 'inv_i18', name: 'Endodontic Files (K-File Assorted)', category: 'Endodontic', quantity: 15, minQuantity: 10, unit: 'Pack', unitCost: 780, supplier: 'Endo Solutions', expiryDate: '2028-01-01', location: 'Cabinet D' },
  { id: 'inv_i19', name: 'Dental Floss (Waxed)', category: 'Preventive', quantity: 30, minQuantity: 10, unit: 'Roll', unitCost: 25, supplier: 'DentSupply Co', expiryDate: '2027-01-01', location: 'Reception' },
  { id: 'inv_i20', name: 'Implant Titanium Screws (3.5mm)', category: 'Implants', quantity: 4, minQuantity: 8, unit: 'Piece', unitCost: 3500, supplier: 'ImplantPro Systems', expiryDate: '2030-01-01', location: 'Implant Cabinet' },
];

// Low stock items: inv_i1 (qty 5, min 10), inv_i2 (qty 3, min 20), inv_i20 (qty 4, min 8)

// ==================== STAFF ====================

export const staff = [
  { id: 'st1', name: 'Dr. Yohannes Tesfaye', role: 'DENTIST', email: 'dr.yohannes@smilecare.et', phone: '+251 911 111111', department: 'General Dentistry', hireDate: '2013-06-01', status: 'Active' },
  { id: 'st2', name: 'Dr. Marta Bekele', role: 'DENTIST', email: 'dr.marta@smilecare.et', phone: '+251 912 222222', department: 'Orthodontics', hireDate: '2017-09-15', status: 'Active' },
  { id: 'st3', name: 'Dr. Dawit Girma', role: 'DENTIST', email: 'dr.dawit@smilecare.et', phone: '+251 913 333333', department: 'Oral Surgery', hireDate: '2010-03-01', status: 'Active' },
  { id: 'st4', name: 'Dr. Tigist Haile', role: 'DENTIST', email: 'dr.tigist@smilecare.et', phone: '+251 914 444444', department: 'Endodontics', hireDate: '2015-01-20', status: 'On Leave' },
  { id: 'st5', name: 'Sara Mengistu', role: 'RECEPTIONIST', email: 'sara.m@smilecare.et', phone: '+251 915 555555', department: 'Front Desk', hireDate: '2020-04-10', status: 'Active' },
  { id: 'st6', name: 'Tadesse Worku', role: 'CASHIER', email: 'tadesse.w@smilecare.et', phone: '+251 916 666666', department: 'Billing', hireDate: '2021-08-01', status: 'Active' },
  { id: 'st7', name: 'Liya Ayalew', role: 'INVENTORY_MANAGER', email: 'liya.a@smilecare.et', phone: '+251 917 777777', department: 'Supply Chain', hireDate: '2022-02-15', status: 'Active' },
  { id: 'st8', name: 'Admin User', role: 'ADMIN', email: 'admin@smilecare.et', phone: '+251 918 888888', department: 'Management', hireDate: '2010-01-01', status: 'Active' },
];

// ==================== AUDIT LOGS ====================

export const auditLogs = [
  { id: 'al1', userId: 'st8', userName: 'Admin User', action: 'CREATE', entity: 'Patient', entityId: 'PT-010', description: 'Registered new patient: Bethlehem Tsegaye', timestamp: '2025-07-14T08:05:23', previousValue: null, newValue: '{ patientId: "PT-010", status: "Active" }' },
  { id: 'al2', userId: 'st5', userName: 'Sara Mengistu', action: 'UPDATE', entity: 'Appointment', entityId: 'a3', description: 'Updated appointment status: CONFIRMED → CHECKED_IN', timestamp: '2025-07-14T09:12:45', previousValue: 'CONFIRMED', newValue: 'CHECKED_IN' },
  { id: 'al3', userId: 'st1', userName: 'Dr. Yohannes Tesfaye', action: 'CREATE', entity: 'Prescription', entityId: 'rx3', description: 'Created prescription for Meron Fekadu', timestamp: '2025-07-14T09:45:10', previousValue: null, newValue: '{ medications: ["Amoxicillin", "Ibuprofen"] }' },
  { id: 'al4', userId: 'st6', userName: 'Tadesse Worku', action: 'CREATE', entity: 'Payment', entityId: 'pay1', description: 'Recorded payment of 10,000 ETB for INV-2025-0041', timestamp: '2025-07-13T14:30:00', previousValue: 'Balance: 26,775', newValue: 'Balance: 16,775' },
  { id: 'al5', userId: 'st5', userName: 'Sara Mengistu', action: 'CREATE', entity: 'Appointment', entityId: 'a15', description: 'Created new appointment for Tigist Worku', timestamp: '2025-07-13T11:20:33', previousValue: null, newValue: '{ patient: "Tigist Worku", date: "2025-07-16", status: "REQUESTED" }' },
  { id: 'al6', userId: 'st7', userName: 'Liya Ayalew', action: 'UPDATE', entity: 'Inventory', entityId: 'inv_i2', description: 'Updated stock for Lidocaine 2%: 25 → 3 cartridges', timestamp: '2025-07-13T10:15:00', previousValue: '25 Cartridges', newValue: '3 Cartridges' },
  { id: 'al7', userId: 'st3', userName: 'Dr. Dawit Girma', action: 'CREATE', entity: 'TreatmentPlan', entityId: 'tp5', description: 'Created treatment plan for Solomon Desta', timestamp: '2025-07-13T09:00:00', previousValue: null, newValue: '{ diagnosis: "Impacted wisdom teeth", cost: 6200 }' },
  { id: 'al8', userId: 'st8', userName: 'Admin User', action: 'UPDATE', entity: 'Staff', entityId: 'st4', description: 'Updated staff status: Active → On Leave', timestamp: '2025-07-12T17:00:00', previousValue: 'Active', newValue: 'On Leave' },
  { id: 'al9', userId: 'st6', userName: 'Tadesse Worku', action: 'CREATE', entity: 'Invoice', entityId: 'inv6', description: 'Created invoice INV-2025-0036 for Solomon Desta', timestamp: '2025-07-13T14:00:00', previousValue: null, newValue: '{ total: 3885, status: "UNPAID" }' },
  { id: 'al10', userId: 'st5', userName: 'Sara Mengistu', action: 'UPDATE', entity: 'Appointment', entityId: 'a2', description: 'Updated appointment status: CONFIRMED → IN_PROGRESS', timestamp: '2025-07-14T09:30:00', previousValue: 'CONFIRMED', newValue: 'IN_PROGRESS' },
  { id: 'al11', userId: 'st2', userName: 'Dr. Marta Bekele', action: 'CREATE', entity: 'Prescription', entityId: 'rx7', description: 'Created prescription for Selamawit Alemu post-adjustment', timestamp: '2025-07-12T15:00:00', previousValue: null, newValue: '{ medications: ["Orthodontic Wax", "Fluoride Rinse"] }' },
  { id: 'al12', userId: 'st8', userName: 'Admin User', action: 'DELETE', entity: 'Service', entityId: 'old-s1', description: 'Removed deprecated service: Dental Cleaning (Old)', timestamp: '2025-07-11T10:00:00', previousValue: '{ name: "Dental Cleaning (Old)", price: 600 }', newValue: null },
  { id: 'al13', userId: 'st7', userName: 'Liya Ayalew', action: 'CREATE', entity: 'InventoryOrder', entityId: 'ord1', description: 'Created purchase order for low-stock items', timestamp: '2025-07-11T09:00:00', previousValue: null, newValue: '{ items: ["Composite Resin", "Lidocaine"], total: 5200 }' },
  { id: 'al14', userId: 'st5', userName: 'Sara Mengistu', action: 'UPDATE', entity: 'Patient', entityId: 'p5', description: 'Updated patient status: Active → Inactive', timestamp: '2025-07-10T14:00:00', previousValue: 'Active', newValue: 'Inactive' },
  { id: 'al15', userId: 'st6', userName: 'Tadesse Worku', action: 'UPDATE', entity: 'Invoice', entityId: 'inv2', description: 'Invoice INV-2025-0040 marked as PAID', timestamp: '2025-07-07T16:00:00', previousValue: 'UNPAID', newValue: 'PAID' },
  { id: 'al16', userId: 'st3', userName: 'Dr. Dawit Girma', action: 'UPDATE', entity: 'TreatmentPlan', entityId: 'tp1', description: 'Updated treatment item: Crown Placement → IN_PROGRESS', timestamp: '2025-07-13T11:00:00', previousValue: 'PLANNED', newValue: 'IN_PROGRESS' },
  { id: 'al17', userId: 'st8', userName: 'Admin User', action: 'CREATE', entity: 'Staff', entityId: 'st7', description: 'Added new staff member: Liya Ayalew (Inventory Manager)', timestamp: '2025-07-01T09:00:00', previousValue: null, newValue: '{ name: "Liya Ayalew", role: "INVENTORY_MANAGER" }' },
  { id: 'al18', userId: 'st5', userName: 'Sara Mengistu', action: 'UPDATE', entity: 'Appointment', entityId: 'a13', description: 'Appointment cancelled by patient: Girma Tadesse', timestamp: '2025-07-10T08:00:00', previousValue: 'CONFIRMED', newValue: 'CANCELLED' },
  { id: 'al19', userId: 'st6', userName: 'Tadesse Worku', action: 'CREATE', entity: 'Payment', entityId: 'pay4', description: 'Recorded partial payment of 2,000 ETB for INV-2025-0036', timestamp: '2025-07-13T14:35:00', previousValue: 'Balance: 3,885', newValue: 'Balance: 1,885' },
  { id: 'al20', userId: 'st1', userName: 'Dr. Yohannes Tesfaye', action: 'UPDATE', entity: 'DentalChart', entityId: 'chart-p1-14', description: 'Updated tooth #14 condition: CARIES → ROOT_CANAL', timestamp: '2025-07-13T10:30:00', previousValue: 'CARIES', newValue: 'ROOT_CANAL' },
];

// ==================== DENTAL CHART (for patient p1) ====================

export const dentalChartP1: Record<number, { condition: ToothCondition; notes: string }> = {
  1: { condition: 'HEALTHY', notes: '' },
  2: { condition: 'HEALTHY', notes: '' },
  3: { condition: 'CROWN', notes: 'PFM Crown placed 2023' },
  4: { condition: 'HEALTHY', notes: '' },
  5: { condition: 'FILLED', notes: 'Composite filling 2022' },
  6: { condition: 'HEALTHY', notes: '' },
  7: { condition: 'HEALTHY', notes: '' },
  8: { condition: 'HEALTHY', notes: '' },
  9: { condition: 'HEALTHY', notes: '' },
  10: { condition: 'HEALTHY', notes: '' },
  11: { condition: 'HEALTHY', notes: '' },
  12: { condition: 'CARIES', notes: 'Moderate cavity detected' },
  13: { condition: 'HEALTHY', notes: '' },
  14: { condition: 'ROOT_CANAL', notes: 'Root canal completed 2025-07-13' },
  15: { condition: 'HEALTHY', notes: '' },
  16: { condition: 'MISSING', notes: 'Extracted 2020' },
  17: { condition: 'MISSING', notes: 'Extracted 2020' },
  18: { condition: 'HEALTHY', notes: '' },
  19: { condition: 'HEALTHY', notes: '' },
  20: { condition: 'FILLED', notes: 'Amalgam filling 2019' },
  21: { condition: 'HEALTHY', notes: '' },
  22: { condition: 'HEALTHY', notes: '' },
  23: { condition: 'HEALTHY', notes: '' },
  24: { condition: 'HEALTHY', notes: '' },
  25: { condition: 'HEALTHY', notes: '' },
  26: { condition: 'HEALTHY', notes: '' },
  27: { condition: 'HEALTHY', notes: '' },
  28: { condition: 'IMPLANT', notes: 'Implant placed 2025-07-13' },
  29: { condition: 'HEALTHY', notes: '' },
  30: { condition: 'EXTRACTION', notes: 'Scheduled for extraction' },
  31: { condition: 'HEALTHY', notes: '' },
  32: { condition: 'FRACTURE', notes: 'Vertical fracture detected' },
};

// ==================== DEMO USERS ====================

export const demoUsers = [
  { id: 'u1', name: 'Admin User', email: 'admin@smilecare.et', role: 'ADMIN' as Role, staffId: 'st8' },
  { id: 'u2', name: 'Sara Mengistu', email: 'sara@smilecare.et', role: 'RECEPTIONIST' as Role, staffId: 'st5' },
  { id: 'u3', name: 'Dr. Yohannes Tesfaye', email: 'dr.yohannes@smilecare.et', role: 'DENTIST' as Role, staffId: 'st1' },
  { id: 'u4', name: 'Tadesse Worku', email: 'tadesse@smilecare.et', role: 'CASHIER' as Role, staffId: 'st6' },
  { id: 'u5', name: 'Liya Ayalew', email: 'liya@smilecare.et', role: 'INVENTORY_MANAGER' as Role, staffId: 'st7' },
  { id: 'u6', name: 'Abebe Kebede', email: 'abebe.kebede@email.com', role: 'PATIENT' as Role, patientId: 'p1' },
];

// ==================== MEDICAL RECORDS ====================

export const medicalRecords = [
  {
    id: 'mr1', patientId: 'p1', patientName: 'Abebe Kebede',
    dentistId: 'd3', dentistName: 'Dr. Dawit Girma',
    appointmentId: 'a11', date: '2025-07-13',
    chiefComplaint: 'Missing lower left molar, requesting implant',
    examinationFindings: 'Edentulous at position 28. Sufficient bone density for implant.',
    diagnosis: 'Edentulous site #28 — suitable for titanium implant placement',
    clinicalNotes: 'Patient in good health. No contraindications for surgery identified.',
    treatmentNotes: 'Titanium implant (3.5mm diameter) placed under local anesthesia. Good primary stability achieved.',
    followUpInstructions: 'Soft diet for 2 weeks. Avoid the surgical site when brushing. Return in 7 days for suture removal.',
  },
  {
    id: 'mr2', patientId: 'p1', patientName: 'Abebe Kebede',
    dentistId: 'd1', dentistName: 'Dr. Yohannes Tesfaye',
    appointmentId: 'a1', date: '2025-07-14',
    chiefComplaint: 'Routine checkup',
    examinationFindings: 'Tooth #12 shows moderate caries. Gingival health good overall.',
    diagnosis: 'Moderate caries on tooth #12. Implant at #28 healing well.',
    clinicalNotes: 'No sensitivity reported. Implant site looks healthy with minimal swelling.',
    treatmentNotes: 'No treatment today — monitoring only. Filling for #12 scheduled.',
    followUpInstructions: 'Return in 2 weeks for composite filling on #12.',
  },
  {
    id: 'mr3', patientId: 'p2', patientName: 'Selamawit Alemu',
    dentistId: 'd2', dentistName: 'Dr. Marta Bekele',
    appointmentId: 'a12', date: '2025-07-12',
    chiefComplaint: 'Mild discomfort after wire adjustment',
    examinationFindings: 'Bracket alignment good. Wire seated properly. Mild crowding resolving.',
    diagnosis: 'Normal post-adjustment soreness. Treatment progressing as planned.',
    clinicalNotes: 'Patient tolerating treatment well. 4 months into 18-month plan.',
    treatmentNotes: 'Upper arch wire changed to 0.019x0.025 NiTi. Lower arch maintained.',
    followUpInstructions: 'Take OTC pain relief if needed. Next visit in 6 weeks.',
  },
  {
    id: 'mr4', patientId: 'p9', patientName: 'Yonas Girma',
    dentistId: 'd4', dentistName: 'Dr. Tigist Haile',
    appointmentId: 'a18', date: '2025-07-07',
    chiefComplaint: 'Severe toothache, upper left area',
    examinationFindings: 'Teeth #14 and #15 percussion positive. Periapical radiograph shows periapical lesion.',
    diagnosis: 'Irreversible pulpitis with periapical periodontitis on #14 and #15',
    clinicalNotes: 'Patient in significant pain. Emergency root canal initiated.',
    treatmentNotes: 'Completed root canal treatment on both #14 and #15 in single visit. Temporary restoration placed.',
    followUpInstructions: 'Avoid chewing on that side. Take antibiotics and pain medication as prescribed. Return for permanent restoration in 2 weeks.',
  },
];

// ==================== DENTAL CHARTS (array form) ====================

export const dentalCharts = [
  {
    id: 'chart1',
    patientId: 'p1',
    patientName: 'Abebe Kebede',
    lastUpdated: '2025-07-13',
    teeth: Object.entries(dentalChartP1).map(([num, data]) => ({
      toothNumber: parseInt(num),
      condition: data.condition,
      notes: data.notes,
    })),
  },
];

// Normalize invoice items shape for portal compatibility
export type InvoiceItem = { service: string; quantity: number; unitPrice: number; lineTotal: number };
export type PortalInvoice = {
  id: string; invoiceNumber: string; patientId: string; patientName: string;
  dentistName: string; date: string; status: InvoiceStatus;
  items: InvoiceItem[]; subtotal: number; discount: number; tax: number;
  total: number; paidAmount: number; balance: number;
};

export const portalInvoices: PortalInvoice[] = invoices.map(inv => ({
  ...inv,
  items: inv.items.map(item => ({
    service: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    lineTotal: item.total,
  })),
  paidAmount: inv.payments.reduce((s, p) => s + p.amount, 0),
}));

// Normalize treatment plan items for portal
export const treatmentPlansPortal = treatmentPlans.map(tp => ({
  ...tp,
  startDate: tp.createdAt,
  description: tp.notes,
  items: tp.items.map(item => ({
    ...item,
    service: item.service,
    cost: 'unitPrice' in item ? (item as { unitPrice: number }).unitPrice : 0,
    status: item.status as string,
  })),
}));
