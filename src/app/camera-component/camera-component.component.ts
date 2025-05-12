import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CameraRange, CameraUtilService } from '../camera-util.service';

@Component({
  selector: 'app-camera-component',
  imports: [CommonModule, MatCardModule],
  providers:[CameraUtilService],
  templateUrl: './camera-component.component.html',
  styleUrl: './camera-component.component.css'
})
export class CameraComponentComponent implements OnInit {
  isCovered: boolean = false;
  constructor(private cameraService:CameraUtilService){}

  ngOnInit(): void {
    const required: CameraRange = {
      distance: [1, 10],
      light: [100, 1000]
    };

    const hardwareCameras: CameraRange[] = [
      { distance: [1, 5], light: [100, 800] },
      { distance: [5, 10], light: [300, 1000] }
    ];

    this.isCovered = this.cameraService.isCameraSetupSufficient(required, hardwareCameras);

  }
}
