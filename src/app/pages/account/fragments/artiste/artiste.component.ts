import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ArtisteComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
