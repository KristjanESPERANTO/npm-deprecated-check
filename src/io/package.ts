import { checkDependencies } from "../check";
import { PackageOption } from "../types";

export default function checkSpecified(options: PackageOption) {
  const { packageName, range } = options;

  checkDependencies({ [packageName]: { range } });
}