import { Component, OnInit } from "@angular/core";

import { BluetoothCore } from "@manekinekko/angular-web-bluetooth";
import { GateAccessBLEService } from "../../gate-access-ble.service";

@Component({
  selector: "access",
  templateUrl: "./access.component.html",
  styleUrls: ["./access.component.scss"],
  providers: [ GateAccessBLEService ]
})
export class AccessComponent implements OnInit {

  constructor(private accessBLEService: GateAccessBLEService) { }

  ngOnInit() {
    console.log("web bluetooth supported: ", this.isSupported);
  }

  get isSupported() {
    return this.accessBLEService.isWebBluetoothSupported;
  }

  async onConnect() {
    try {
      let connected = await this.accessBLEService.connect();

      if (connected) {

      }
    } catch (err) {
      console.error(err);
    }
  }

}
