export type GeoCoordinate = [longitude: number, latitude: number];

export type SitePolygon = {
  name: string;
  coordinates: GeoCoordinate[];
  height: number;
  tone: "building" | "object";
};

export type SiteLine = {
  name: string;
  coordinates: GeoCoordinate[];
  tone: "fence" | "road";
};

const buildingHeight = 0.59;
const secondaryBuildingHeight = buildingHeight / 2;
const kioskHeight = secondaryBuildingHeight / 2;
const concreteBlockHeight = kioskHeight / 2;
const concreteSeatHeight = concreteBlockHeight / 2;

export const queuePath: GeoCoordinate[] = [
  [13.442941, 52.511054],
  [13.4429323, 52.5110461],
  [13.4428571, 52.5110788],
  [13.442849, 52.5110722],
  [13.4428441, 52.511014],
  [13.4428373, 52.5110088],
  [13.4428088, 52.511024],
  [13.4427933, 52.5110134],
  [13.4428217, 52.5109971],
  [13.4428045, 52.5109854],
  [13.4427778, 52.5110013],
  [13.4427629, 52.5109914],
  [13.4427902, 52.510976],
  [13.4427774, 52.5109681],
  [13.4427563, 52.5109652],
  [13.4423625, 52.5106769],
  [13.4422991, 52.5106141],
  [13.4422172, 52.5105255],
  [13.4420793, 52.5104634],
  [13.441944, 52.5103027],
  [13.4417151, 52.5100063],
  [13.4409508, 52.5090044],
];

export const sitePolygons: SitePolygon[] = [
  {
    name: "berghain",
    height: buildingHeight,
    tone: "building",
    coordinates: [
      [13.4438405, 52.5115247],
      [13.4432034, 52.5109574],
      [13.442742, 52.5111493],
      [13.4433791, 52.5117165],
      [13.4438405, 52.5115247],
    ],
  },
  {
    name: "lab",
    height: secondaryBuildingHeight,
    tone: "building",
    coordinates: [
      [13.4433362, 52.5116782],
      [13.443108, 52.5114756],
      [13.4429176, 52.5115557],
      [13.4431457, 52.5117581],
      [13.4433362, 52.5116782],
    ],
  },
  {
    name: "berghain-small-west",
    height: secondaryBuildingHeight,
    tone: "building",
    coordinates: [
      [13.4429098, 52.5114088],
      [13.4429942, 52.5113737],
      [13.4428627, 52.5112562],
      [13.4427783, 52.5112921],
      [13.4429098, 52.5114088],
    ],
  },
  {
    name: "berghain-small-east",
    height: secondaryBuildingHeight,
    tone: "building",
    coordinates: [
      [13.4433603, 52.5110987],
      [13.4433134, 52.5110578],
      [13.4434582, 52.5109958],
      [13.4434824, 52.5110162],
      [13.4434247, 52.5110407],
      [13.4434475, 52.5110603],
      [13.4433603, 52.5110987],
    ],
  },
  {
    name: "magic-cube-closed-kiosk",
    height: kioskHeight,
    tone: "object",
    coordinates: [
      [13.442181193996333, 52.51057734282199],
      [13.44223, 52.5105637],
      [13.4422069, 52.5105347],
      [13.4421588, 52.5105477],
      [13.442181193996333, 52.51057734282199],
    ],
  },
  {
    name: "open-kiosk",
    height: kioskHeight,
    tone: "object",
    coordinates: [
      [13.442112010755636, 52.51045829814032],
      [13.4421414, 52.510448],
      [13.4421101, 52.5104199],
      [13.4420805, 52.5104297],
      [13.442112010755636, 52.51045829814032],
    ],
  },
  {
    name: "concrete-block",
    height: concreteBlockHeight,
    tone: "object",
    coordinates: [
      [13.4423177, 52.5107071],
      [13.4423324, 52.5107016],
      [13.4423172, 52.5106874],
      [13.4423027, 52.5106929],
      [13.4423177, 52.5107071],
    ],
  },
  {
    name: "north-concrete-seat",
    height: concreteSeatHeight,
    tone: "object",
    coordinates: [
      [13.4422826, 52.5106732],
      [13.442313, 52.5106633],
      [13.442297, 52.5106455],
      [13.442267, 52.5106555],
      [13.4422826, 52.5106732],
    ],
  },
  {
    name: "middle-concrete-seat",
    height: concreteSeatHeight,
    tone: "object",
    coordinates: [
      [13.4422549, 52.5106402],
      [13.4422824, 52.5106298],
      [13.4422676, 52.5106145],
      [13.4422392, 52.510625],
      [13.4422549, 52.5106402],
    ],
  },
  {
    name: "south-concrete-seat",
    height: concreteSeatHeight,
    tone: "object",
    coordinates: [
      [13.4422245, 52.5106059],
      [13.4422534, 52.5105968],
      [13.4422385, 52.5105803],
      [13.4422106, 52.5105894],
      [13.4422245, 52.5106059],
    ],
  },
];

export const siteLines: SiteLine[] = [
  {
    name: "fence-east",
    tone: "fence",
    coordinates: [
      [13.4444523, 52.509989],
      [13.4430642, 52.5108326],
      [13.4428871, 52.5109762],
      [13.4422572, 52.5105334],
      [13.4421504, 52.51045],
      [13.4419944, 52.5103153],
      [13.4419361, 52.5102508],
      [13.4412597, 52.5093757],
      [13.4409211, 52.5089345],
    ],
  },
  {
    name: "fence-west",
    tone: "fence",
    coordinates: [
      [13.4423561, 52.511306],
      [13.4427769, 52.5110539],
      [13.442315, 52.5107119],
      [13.4415755, 52.5111332],
    ],
  },
  {
    name: "am-wriezener-bahnhof",
    tone: "road",
    coordinates: [
      [13.4387797, 52.512581],
      [13.4420013, 52.510746],
      [13.4420844, 52.5106841],
      [13.4420943, 52.5106505],
      [13.4420791, 52.510619],
      [13.4418435, 52.5103087],
      [13.4412694, 52.5095583],
      [13.4407669, 52.5089118],
    ],
  },
  {
    name: "wriezener-karree",
    tone: "road",
    coordinates: [
      [13.4382299, 52.5119157],
      [13.441307, 52.5101563],
      [13.4416351, 52.510043],
    ],
  },
  {
    name: "an-der-ostbahn",
    tone: "road",
    coordinates: [
      [13.4371256, 52.5104346],
      [13.4377012, 52.5102307],
      [13.4407495, 52.5089029],
      [13.4414032, 52.5086251],
      [13.4423854, 52.5084804],
      [13.4427966, 52.5084203],
      [13.4440203, 52.5080779],
      [13.4452232, 52.5077788],
      [13.4462836, 52.5076386],
      [13.4472798, 52.5074387],
    ],
  },
];

export const landmarkCoordinates = {
  door: queuePath[0],
  noQueue: [13.442849, 52.5110722],
  snakeStart: [13.4427563, 52.5109652],
  concreteBlock: [13.4423625, 52.5106769],
  middleConcreteSeat: [13.4422991, 52.5106141],
  magicCube: [13.4422172, 52.5105255],
  openKiosk: [13.4420793, 52.5104634],
  wriezenerKarree: [13.4417151, 52.5100063],
  metro: queuePath[queuePath.length - 1],
} satisfies Record<string, GeoCoordinate>;
