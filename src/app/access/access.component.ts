import { Component, OnInit } from "@angular/core";

import { BluetoothCore } from "@manekinekko/angular-web-bluetooth";

@Component({
  selector: "access",
  templateUrl: "./access.component.html",
  styleUrls: ["./access.component.scss"]
})
export class AccessComponent implements OnInit {

  private device: BluetoothDevice;

  constructor(private ble: BluetoothCore) { }

  ngOnInit() {
    
  }

  get canConnect() {
    return this.ble.isSupported;
  }

  async onConnect() {
    try {
      this.device = await this.ble.discover({
        acceptAllDevices: true
      });
    } catch (err) {
      console.error(err);
    }
  }

}
