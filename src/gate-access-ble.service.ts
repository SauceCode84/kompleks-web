import { Injectable } from "@angular/core";
import { BluetoothCore } from "@manekinekko/angular-web-bluetooth";

import { TextDecoder } from "text-encoding";

@Injectable()
export class GateAccessBLEService {

  static GATT_GATE_SERVICE = "e0d38f1c-56ca-4b75-9d44-3e4134f7cb0a";
  static GATT_CHARACTERISTIC_EXAMPLE = "e0d38f1c-56ca-4b75-9d44-3e4134f7cb0b";
  static GATT_CHARACTERISTIC_VALIDATE = "e0d38f1c-56ca-4b75-9d44-3e4134f7cb0c";
  static GATT_CHARACTERISTIC_ACCESS = "e0d38f1c-56ca-4b75-9d44-3e4134f7cb0d";

  private device: BluetoothDevice;
  private gatt: BluetoothRemoteGATTServer;

  constructor(private ble: BluetoothCore) { }

  get isWebBluetoothSupported() {
    return this.ble.isSupported;
  }

  public getDevice() {
    return this.ble.getDevice$();
  }

  public streamValues() {
    return this.ble.streamValues$()
      .map((value: DataView) => value.getUint8(0));
  }

  private async getDescription(characteristic: BluetoothRemoteGATTCharacteristic) {
    try {
      let descriptor = await characteristic.getDescriptor(0x2901);
      console.log(descriptor);

      let value = await descriptor.readValue();
      
      return value;
      /*let decoder = new TextDecoder("utf-8");
              let descriptorValue = decoder.decode(value);
              console.log("descriptor value", descriptorValue);*/
    } catch (err) {
      console.error("getDescription error", err);
    }
  }

  public async connect() {
    console.log("connect");
    
    try {
      let options = {
        acceptAllDevices: true,
        optionalServices: [ GateAccessBLEService.GATT_GATE_SERVICE ]
      };

      this.device = await this.ble.discover(options);
      this.gatt = await this.device.gatt.connect();

      return true;
    } catch (err) {
      console.error("connect", err);
      return false;
    }
  }

  public async getBatteryLevel() {
    console.log("Getting battery service...");

    try {
      let options = {
        acceptAllDevices: true,
        optionalServices: [ GateAccessBLEService.GATT_GATE_SERVICE ]
      };
      let device = await this.ble.discover(options);
      let gatt = await device.gatt.connect();
      
      let primaryService = await gatt.getPrimaryService(GateAccessBLEService.GATT_GATE_SERVICE);

      let chars = await primaryService.getCharacteristics();

      console.log(chars);

      let characteristic = await primaryService.getCharacteristic(GateAccessBLEService.GATT_CHARACTERISTIC_EXAMPLE);
      let writeChar = await primaryService.getCharacteristic(GateAccessBLEService.GATT_CHARACTERISTIC_VALIDATE);
      let accessChar = await primaryService.getCharacteristic(GateAccessBLEService.GATT_CHARACTERISTIC_ACCESS);
      
      console.log(primaryService);
      console.log(characteristic);
      console.log(writeChar);
      console.log(accessChar);

      await accessChar.startNotifications();
      accessChar.addEventListener("characteristicvaluechanged", (event) => {
        let value: DataView = (event.target as any).value;
        let access = value.getUint8(0);

        console.log("accessChar characteristicvaluechanged", value);
        console.log("access", access === 1 ? "granted" : "denied");
      });

      console.log("writing char...");
      
      let data = new Buffer("012ebc6d");
      await writeChar.writeValue(data);
      
      let decoder = new TextDecoder("utf-8");
      
      let value = await characteristic.readValue();
      console.log(value);
      
      let descriptors = await characteristic.getDescriptors();
      console.log(descriptors);

      for(let descriptor of descriptors) {
        let descriptorValue = await descriptor.readValue();
        console.log(decoder.decode(descriptorValue));
      }

      return decoder.decode(value);
      
      /*return this.ble
        .discover$({
          acceptAllDevices: true,
          optionalServices: [ BatteryLevelService.GATT_GATE_SERVICE ]
        })
        .mergeMap((gatt: BluetoothRemoteGATTServer) =>
          this.ble.getPrimaryService$(gatt, BatteryLevelService.GATT_GATE_SERVICE))
        .mergeMap((primaryService: BluetoothRemoteGATTService) =>
          this.ble.getCharacteristic$(primaryService, BatteryLevelService.GATT_CHARACTERISTIC_EXAMPLE))
        .mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
          this.getDescription(characteristic)
            .then(console.log);
          
          return this.ble.readValue$(characteristic);
        })
        .map((value: DataView) => {
          let decoder = new TextDecoder("utf-8");
          return decoder.decode(value);
        });*/
    } catch (err) {
      console.error(err);
    }
  }

}