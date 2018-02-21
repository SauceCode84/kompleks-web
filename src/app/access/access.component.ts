import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { BluetoothCore } from "@manekinekko/angular-web-bluetooth";

import { GateAccessBLEService } from "../../gate-access-ble.service";

@Component({
  selector: "access",
  templateUrl: "./access.component.html",
  styleUrls: ["./access.component.scss"],
  providers: [ GateAccessBLEService ]
})
export class AccessComponent implements OnInit, OnDestroy {

  connected: boolean = false;
  connectedSub: Subscription;

  access: boolean = false;

  constructor(private accessBLEService: GateAccessBLEService) { }

  ngOnInit() {
    console.log("web bluetooth supported: ", this.isSupported);
    
    if (this.isSupported) {
      this.connectedSub = this.accessBLEService.getDevice$()
        .subscribe(device => {
          console.log(device);
          this.connected = !!device;
        });

      this.accessBLEService.access$()
        .subscribe(access => this.access = access);
    }
  }

  async ngOnDestroy() {
    await this.accessBLEService.disconnect();

    if (this.connectedSub) {
      this.connectedSub.unsubscribe();
    }
  }

  get isSupported() {
    return this.accessBLEService.isWebBluetoothSupported;
  }

  async onConnect() {
    try {
      let connectResult = await this.accessBLEService.connect();

      if (connectResult) {
        console.log("Connected...");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async onValid() {
    await this.accessBLEService.sendAccessId("012ebc6d");
  }

  async onInvalid() {
    await this.accessBLEService.sendAccessId("01234567");
  }

}
