import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownComponent } from "./countdown/countdown.component";
import { CameraComponentComponent } from "./camera-component/camera-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CountdownComponent, CameraComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {}
}
