import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../services';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  error: any;
  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorService.$error.subscribe((error) => {
      this.error = error;
    });
  }
}
