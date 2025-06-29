export const DoctorSpecialty = {
  GeneralDoctor: 'General Doctor / Physician',
  Dentist: 'Dentist',
  Pediatrician: 'Pediatrician',
  Cardiologist: 'Cardiologist',
  Dermatologist: 'Dermatologist',
  Neurologist: 'Neurologist',
  Psychiatrist: 'Psychiatrist',
  Ophthalmologist: 'Ophthalmologist',
  OrthopedicSurgeon: 'Orthopedic Surgeon',
  ENTDoctor: 'ENT Doctor (Otolaryngologist)',
  Gynecologist: 'Gynecologist',
  Obstetrician: 'Obstetrician',
  Urologist: 'Urologist',
  Oncologist: 'Oncologist',
  Anesthesiologist: 'Anesthesiologist',
  Radiologist: 'Radiologist',
  Surgeon: 'Surgeon',
  GeneralPractitioner: 'General Practitioner (GP)',
  Endocrinologist: 'Endocrinologist',
  Pulmonologist: 'Pulmonologist',
} as const;

export type DoctorSpecialty =
  (typeof DoctorSpecialty)[keyof typeof DoctorSpecialty];
