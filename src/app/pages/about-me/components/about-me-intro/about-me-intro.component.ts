import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { NgxCountAnimationDirective } from 'ngx-count-animation';
import { TypewriterComponent } from 'src/app/components/typewriter/typewriter.component';

@Component({
  selector: 'af-about-me-intro',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TypewriterComponent, NgxCountAnimationDirective],
  templateUrl: './about-me-intro.component.html',
  styleUrl: './about-me-intro.component.scss',
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
  public age = signal(0);

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
      const birthDt = birthDate;

      let age = currDt.year - birthDt.year;
      if (
        currDt.month < birthDt.month ||
        (birthDt.month === currDt.month && currDt.day < birthDt.day)
      ) {
        age--;
      }

      return age;
    }

    this.age.set(calcAge(new Date(1995, 2, 21)));
  }
}
