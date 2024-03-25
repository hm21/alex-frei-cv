import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxCountAnimationModule } from 'ngx-count-animation';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';

@Component({
  selector: 'af-about-me-intro',
  standalone: true,
  imports: [TypewriterComponent, NgxCountAnimationModule],
  templateUrl: './about-me-intro.component.html',
  styleUrl: './about-me-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeIntroComponent implements OnInit {
  /**
   * An array of strings representing different roles or titles.
   */
  public readonly items = [
    $localize`Full Stack Developer`,
    $localize`Angular Developer`,
    $localize`Flutter Developer`,
    $localize`Frontend Developer`,
    $localize`Backend Developer`,
    $localize`UI/ UX Designer`,
    $localize`Google Cloud Developer`,
    $localize`Firebase Developer`,
    $localize`Supabase Developer`,
  ];

  /**
   * Represents the age of the person.
   */
  public age = 0;

  ngOnInit(): void {
    this.calculateAge();
  }

  /**
   * Calculates the age based on the provided birth date.
   * @private
   */
  private calculateAge() {
    function calcAge(birthDate: Date) {
      const currDt = new Date();

      const currY = currDt.getFullYear();
      const currM = currDt.getMonth();
      const currD = currDt.getDate();

      const birthY = birthDate.getFullYear();
      const birthM = birthDate.getMonth();
      const birthD = birthDate.getDate();

      let age = currY - birthY;

      if (currM < birthM || (birthM === currM && currD < birthD)) {
        age--;
      }

      return age;
    }

    this.age = calcAge(new Date(1995, 2, 21));
  }
}
