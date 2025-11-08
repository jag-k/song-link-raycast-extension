import { convertToPlatformCommand } from "./utils/convert-command";

export default async function Command() {
  await convertToPlatformCommand("Yandex Music");
}
