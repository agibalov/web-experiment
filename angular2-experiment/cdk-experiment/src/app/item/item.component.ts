import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  static InstanceCount = 0;

  @Input() content: string;

  ngOnInit() {
    ++ItemComponent.InstanceCount;
  }

  ngOnDestroy(): void {
    --ItemComponent.InstanceCount;
  }
}
