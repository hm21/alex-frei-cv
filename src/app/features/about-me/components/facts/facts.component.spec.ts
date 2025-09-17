import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { FUN_FACTS } from 'src/app/core/constants/fun-facts.constants';
import { GitManagerService } from 'src/app/core/services/git-manager/git-manager.service';
import { SharedTestingModule } from 'src/test/shared-testing.module';
import { FactsComponent } from './facts.component';

describe('FactsComponent', () => {
  let component: FactsComponent;
  let fixture: ComponentFixture<FactsComponent>;
  let gitManagerService: GitManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactsComponent, SharedTestingModule],
      providers: [GitManagerService],
    }).compileComponents();

    fixture = TestBed.createComponent(FactsComponent);
    component = fixture.componentInstance;
    gitManagerService = TestBed.inject(GitManagerService);
    spyOn(gitManagerService, 'getCommitCount').and.returnValue(of(0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items with FUN_FACTS', () => {
    expect(component.items()).toEqual(FUN_FACTS);
  });

  it('should call getCommitCount on init', () => {
    spyOn(component, 'getCommitCount' as any);
    component.ngOnInit();
    expect(component['getCommitCount']).toHaveBeenCalled();
  });

  it('should update items with commit count', async () => {
    const commitCount = 42;
    (gitManagerService.getCommitCount as jasmine.Spy).and.returnValue(
      of(commitCount),
    );

    component['getCommitCount']();

    const updatedItem = component.items().find((el) => el.id === 'git-commits');
    expect(updatedItem?.value).toBe(commitCount);
    expect(updatedItem?.loading).toBe(false);
  });
});
