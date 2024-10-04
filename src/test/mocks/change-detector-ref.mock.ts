import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable()
export class MockChangeDetectorRef extends ChangeDetectorRef {
  override markForCheck(): void {
  }
  override detach(): void {
  }
  override detectChanges(): void {
  }
  override checkNoChanges(): void {
  }
  override reattach(): void {
  }
}
