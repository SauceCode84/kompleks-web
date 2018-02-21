import { Pipe, PipeTransform } from "@angular/core";

const FILE_SIZE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const FILE_SIZE_UNITS_LONG = ["Bytes", "Kilobytes", "Megabytes", "Gigabytes", "Pettabytes", "Exabytes", "Zettabytes", "Yottabytes"];

@Pipe({
  name: "fileSize"
})
export class FileSizePipe implements PipeTransform {

  transform(sizeInBytes: number, longForm: boolean) {
    const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;

    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);

    let size = sizeInBytes / Math.pow(1024, power);
    let formattedSize = Math.round(size * 100) / 100;
    let unit = units[power];

    return size ? `${formattedSize} ${unit}` : "0";
  }

}
