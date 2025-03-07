import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTestingModule } from 'src/test/shared-testing.module';
import { GitRepoStatsComponent } from './git-repo-stats.component';

describe('GitRepoStatsComponent', () => {
  let component: GitRepoStatsComponent;
  let fixture: ComponentFixture<GitRepoStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GitRepoStatsComponent, SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GitRepoStatsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('gitStats', undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
