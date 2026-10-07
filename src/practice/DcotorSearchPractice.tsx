import { useState } from "react";

const doctors = [
    { id: 1, name: "Sara Ahmed", specialty: "Cardiology" },
    { id: 2, name: "Omar Hassan", specialty: "Dermatology" },
  ];
  
  export function DoctorSearchPractice() {
    const [search, setSearch] = useState("");
  
    const filteredDoctors = doctors.filter((doctor) =>
      doctor.name.includes(search)
    );
  
    return (
      <div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
  
        {filteredDoctors.map((doctor) => (
          <p key={doctor.id}>{doctor.name}</p>
        ))}
      </div>
    );
  }