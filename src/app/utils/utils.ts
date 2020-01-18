/*
 * Created by Chaiwut Maneechot on 5/5/19 4:03 PM
 * Copyright (c) 2019 . All rights reserved.
 * Last modified 5/5/19 4:03 PM
 */

export class Utils {
  static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

