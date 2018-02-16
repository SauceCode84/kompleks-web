import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  
  //batteryLevel: string = "--";
  //device: any = {};

  constructor() { }

  ngOnInit() {
    //this.getDeviceStatus();
    //this.streamValues();
  }

  /*public async getBatteryLevel() {
    let value = await this.batteryLevelService.getBatteryLevel();
    this.showBatteryLevel(value);
  }

  private getDeviceStatus() {
    this.batteryLevelService.getDevice()
      .subscribe(device => {
        if (device) {
          this.device = device;
        } else {
          this.device = null;
          this.batteryLevel = "--";
        }
      });
  }

  private streamValues() {
    this.batteryLevelService.streamValues()
      .subscribe(this.showBatteryLevel);
  }

  private showBatteryLevel(value: string | number) {
    console.log("Show value...", value);

    this.zone.run(() => {
      console.log("Reading battery level %d", value);
      this.batteryLevel = "" + value;
    });
  }*/
  
}
