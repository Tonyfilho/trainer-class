import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  imports: [],
  templateUrl: './wellcome.component.html',
  styleUrl: './wellcome.component.css',
})
export class WellcomeComponent {
  courseCode = signal('UC... or UFCD...');
  trainerName = signal('Tony');

  // Computed signal - atualiza automaticamente quando courseCode ou trainerName mudam
  welcomeMessage = computed(
    () =>
      `Welcome to ${this.courseCode()} Trainer Class by ${this.trainerName()}`
  );

  // Exemplo de uso
  updateCourse(code: string) {
    this.courseCode.set(code);
  }
}
