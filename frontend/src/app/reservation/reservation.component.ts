import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'reservationpage',
  standalone: true,
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css'],
  imports: [CommonModule, FormsModule], // Füge FormsModule zu imports hinzu
})
export class ReservationComponent implements OnInit {
  selectedDate: string = ''; // Für die Datumsauswahl
  selectedTime: string = ''; // Für die Uhrzeitauswahl
  selectedTable: any = null; // Aktuell ausgewählter Tisch
  bookedTimes: string[] = []; // Liste von bereits gebuchten Uhrzeiten
  tables = [
    { id: 1, booked: false, seats: { min: 2, max: 4 }, position: { top: '20%', left: '30%' } },
    { id: 2, booked: false, seats: { min: 4, max: 6 }, position: { top: '20%', left: '60%' } },
    { id: 3, booked: false, seats: { min: 2, max: 4 }, position: { top: '50%', left: '30%' } },
    { id: 4, booked: false, seats: { min: 4, max: 6 }, position: { top: '50%', left: '60%' } },
    { id: 5, booked: false, seats: { min: 6, max: 8 }, position: { top: '80%', left: '30%' } },
    { id: 6, booked: false, seats: { min: 8, max: 10 }, position: { top: '80%', left: '60%' } },
  ];

  availableTimes: string[] = []; // Liste der verfügbaren Zeiten für die Auswahl

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const startTime = 10; // 10:00 Uhr
    const endTime = 22; // 22:00 Uhr
    const interval = 30; // 30 Minuten

    // Array für die verfügbaren Zeiten
    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        let time = `${this.formatTime(hour)}:${this.formatTime(minute)}`;
        this.availableTimes.push(time);
      }
    }
  }

  formatTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }

  openTablePopup(table: any): void {
    if (!table.booked) {
      this.selectedTable = table;
    } else {
      alert(`Tisch ${table.id} ist bereits gebucht.`);
    }
  }

  closePopup(): void {
    this.selectedTable = null;
  }

  // Überprüfen, ob die angegebene Zeit bereits gebucht ist
  isTimeAvailable(time: string): boolean {
    return !this.bookedTimes.includes(time);
  }

  // Tisch buchen
  bookTable(): void {
    if (this.selectedTable) {
      if (this.selectedDate && this.selectedTime) {
        if (this.isTimeAvailable(this.selectedTime)) {
          this.selectedTable.booked = true;
          this.bookedTimes.push(this.selectedTime); // Die gebuchte Zeit speichern
          alert(
            `Tisch ${this.selectedTable.id} wurde erfolgreich für ${this.selectedDate} um ${this.selectedTime} gebucht.`
          );
          this.closePopup();
        } else {
          alert('Die gewählte Uhrzeit ist bereits gebucht.');
        }
      } else {
        alert('Bitte wähle ein Datum und eine Uhrzeit aus.');
      }
    }
  }
}
