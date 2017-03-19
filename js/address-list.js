'use strict';

window.addressList = (function () {
  var addressList = [
    '100-0088 Tōkyō-to, Chiyoda-ku, Ichibanchō, 10−1',
    '101-0012 Tōkyō-to, Chiyoda-ku, Ichibanchō, 18−4',
    '102-0061 Tōkyō-to, Chiyoda-ku, Sanbanchō',
    '103-0024 Tōkyō-to, Chiyoda-ku, Kioichō, 9',
    '104-0055 Tōkyō-to, Chiyoda-ku, Yonbanchō, 5−6',
    '105-0003 Tōkyō-to, Minato-ku, Nishishinbashi, 2 Chome−11',
    '106-0188 Tōkyō-to, Chiyoda-ku, Kioichō, 12-6',
    '107-0105 Tōkyō-to, Chiyoda-ku, Sanbanchō 2',
    '108-0094 Tōkyō-to, Chiyoda-ku, Ichibanchō, 20−8',
    '109-0103 Tōkyō-to, Minato-ku, Nishishinbashi, 11-6'
  ];

  var getRandomAddress = function () {
    var randomIndex = window.utils.getRandomElement(addressList, 0);
    return addressList[randomIndex];
  };

  return getRandomAddress;
})();
