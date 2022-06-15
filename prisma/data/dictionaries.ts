import { Prisma } from "@prisma/client";

const modelCarData: Prisma.SeasonsCreateInput[]=[
    {
      name: "Business CA1"
    },
    {
      name: "Nordman S2 SUV"
    },
    {
      name: "NR201"
    },
    {
      name: "Мальта"
    },
]

const seasonsData: Prisma.SeasonsCreateInput[]=[
    {
      name: "Зима"
    },
    {
      name: "Лето"
    },
    {
      name: "Всесезонные"
    }
  ]
  
  const сonditionsData: Prisma.ConditionsCreateInput[]=[
    {
      name: "Новое"
    },
    {
      name: `Б\У`
    }
  ]
  
  const speedIndexData: Prisma.SpeedIndexCreateInput[]=[
    {
      name: "H(934)"
    },
    {
      name: `J(100)`
    },
    {
      name: `M(130)`
    }
  ];
  
  const fuelEfficiencyData: Prisma.FuelEfficiencyCreateInput[]=[
    {
      name: "A"
    },
    {
      name: `B`
    },
    {
      name: `C`
    },
    {
      name: `D`
    },
    {
      name: `E`
    },
    {
      name: `F`
    },
    {
      name: `G`
    },
  ]
  
  const gripSurfacesData: Prisma.GripSurfacesCreateInput[]=[
    {
      name: "A"
    },
    {
      name: `B`
    },
    {
      name: `C`
    },
    {
      name: `D`
    },
    {
      name: `E`
    },
    {
      name: `F`
    },
    {
      name: `G`
    },
  ]
  
  const manufacturersData: Prisma.ManufacturersCreateInput[]=[
    {
      name: "Nokian"
    },
    {
      name: `Ford`
    },
    {
      name: "Hankook"
    },
    {
      name: `Michelin`
    },
    {
      name: `Cordiant`
    },
    {
      name: `Петрошина`
    },
    {
      name: `СКАД`
    },
  ]

  export const dictionaries: {[key: string]: any} = {
    "seasons":seasonsData,
    "conditions":сonditionsData,
    "speedIndex":speedIndexData,
    "fuelEfficiency":fuelEfficiencyData,
    "gripSurfaces":gripSurfacesData,
    "manufacturers":manufacturersData,
    "carModel":modelCarData
  }