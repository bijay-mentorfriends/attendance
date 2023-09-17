import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() items!: IMenu[];

  constructor() { }

  ngOnInit(): void {
  }

}
