const Teams = () => {
    const teams = {ATLANTA_HAWKS: {
      name: "Atlanta Hawks",
      logo: "https://www.example.com/hawks-logo.png",
      primaryColor: "#E03A3E",
      secondaryColor: "#C1D32F"
    },
    BOSTON_CELTICS: {
      name: "Boston Celtics",
      logo: "https://www.example.com/celtics-logo.png",
      primaryColor: "#007A33",
      secondaryColor: "#BA9653"
    },
    BROOKLYN_NETS: {
      name: "Brooklyn Nets",
      logo: "https://www.example.com/nets-logo.png",
      primaryColor: "#000000",
      secondaryColor: "#FFFFFF"
    },
    CHARLOTTE_HORNETS: {
      name: "Charlotte Hornets",
      logo: "https://www.example.com/hornets-logo.png",
      primaryColor: "#1D1160",
      secondaryColor: "#00788C"
    },
    CHICAGO_BULLS: {
      name: "Chicago Bulls",
      logo: "https://www.example.com/bulls-logo.png",
      primaryColor: "#CE1141",
      secondaryColor: "#000000"
    },
    CLEVELAND_CAVALIERS: {
      name: "Cleveland Cavaliers",
      logo: "https://www.example.com/cavaliers-logo.png",
      primaryColor: "#860038",
      secondaryColor: "#041E42"
    },
    DALLAS_MAVERICKS: {
      name: "Dallas Mavericks",
      logo: "https://www.example.com/mavericks-logo.png",
      primaryColor: "#00538C",
      secondaryColor: "#0072CE"
    },
    DENVER_NUGGETS: {
      name: "Denver Nuggets",
      logo: "https://www.example.com/nuggets-logo.png",
      primaryColor: "#0E2240",
      secondaryColor: "#FEC524"
    },
    DETROIT_PISTONS: {
      name: "Detroit Pistons",
      logo: "https://www.example.com/pistons-logo.png",
      primaryColor: "#C8102E",
      secondaryColor: "#1D42BA"
    },
    GOLDEN_STATE_WARRIORS: {
      name: "Golden State Warriors",
      logo: "https://www.example.com/warriors-logo.png",
      primaryColor: "#006BB6",
      secondaryColor: "#FDB927"
    },
    HOUSTON_ROCKETS: {
      name: "Houston Rockets",
      logo: "https://www.example.com/rockets-logo.png",
      primaryColor: "#CE1141",
      secondaryColor: "#000000"
    },
 INDIANA_PACERS: {
    name: "Indiana Pacers",
    logo: "https://www.example.com/pacers-logo.png",
    primaryColor: "#002D62",
    secondaryColor: "#FDBB30"
  },
  LOS_ANGELES_CLIPPERS: {
    name: "Los Angeles Clippers",
    logo: "https://www.example.com/clippers-logo.png",
    primaryColor: "#C8102E",
    secondaryColor: "#1D42BA"
  },
  LOS_ANGELES_LAKERS: {
    name: "Los Angeles Lakers",
    logo: "https://www.example.com/lakers-logo.png",
    primaryColor: "#552583",
    secondaryColor: "#FDB927"
  },
  MEMPHIS_GRIZZLIES: {
    name: "Memphis Grizzlies",
    logo: "https://www.example.com/grizzlies-logo.png",
    primaryColor: "#5D76A9",
    secondaryColor: "#12173F"
  },
  MIAMI_HEAT: {
    name: "Miami Heat",
    logo: "https://www.example.com/heat-logo.png",
    primaryColor: "#98002E",
    secondaryColor: "#F9A01B"
  },
  MILWAUKEE_BUCKS: {
    name: "Milwaukee Bucks",
    logo: "https://www.example.com/bucks-logo.png",
    primaryColor: "#00471B",
    secondaryColor: "#EEE1C6"
  },
  MINNESOTA_TIMBERWOLVES: {
    name: "Minnesota Timberwolves",
    logo: "https://www.example.com/timberwolves-logo.png",
    primaryColor: "#0C2340",
    secondaryColor: "#236192"
  },
  NEW_ORLEANS_PELICANS: {
    name: "New Orleans Pelicans",
    logo: "https://www.example.com/pelicans-logo.png",
    primaryColor: "#0C2340",
    secondaryColor: "#85714D"
  },
  NEW_YORK_KNICKS: {
    name: "New York Knicks",
    logo: "https://www.example.com/knicks-logo.png",
    primaryColor: "#006BB6",
    secondaryColor: "#F58426"
  },
  OKLAHOMA_CITY_THUNDER: {
    name: "Oklahoma City Thunder",
    logo: "https://www.example.com/thunder-logo.png",
    primaryColor: "#007AC1",
    secondaryColor: "#EF3B24"
  },
  ORLANDO_MAGIC: {
    name: "Orlando Magic",
    logo: "https://www.example.com/magic-logo.png",
    primaryColor: "#0077C9",
    secondaryColor: "#C4CED4"
  },
  INDIANA_PACERS: {
    name: "Indiana Pacers",
    logo: "https://www.example.com/pacers-logo.png",
    primaryColor: "#002D62",
    secondaryColor: "#FDBB30"
  },
  LOS_ANGELES_CLIPPERS: {
    name: "Los Angeles Clippers",
    logo: "https://www.example.com/clippers-logo.png",
    primaryColor: "#C8102E",
    secondaryColor: "#1D42BA"
  },
  LOS_ANGELES_LAKERS: {
    name: "Los Angeles Lakers",
    logo: "https://www.example.com/lakers-logo.png",
    primaryColor: "#552583",
    secondaryColor: "#FDB927"
  },
  MEMPHIS_GRIZZLIES: {
    name: "Memphis Grizzlies",
    logo: "https://www.example.com/grizzlies-logo.png",
    primaryColor: "#5D76A9",
    secondaryColor: "#12173F"
  },
  MIAMI_HEAT: {
    name: "Miami Heat",
    logo: "https://www.example.com/heat-logo.png",
    primaryColor: "#98002E",
    secondaryColor: "#F9A01B"
  },
  MILWAUKEE_BUCKS: {
    name: "Milwaukee Bucks",
    logo: "https://www.example.com/bucks-logo.png",
    primaryColor: "#00471B",
    secondaryColor: "#EEE1C6"
  },
  MINNESOTA_TIMBERWOLVES: {
    name: "Minnesota Timberwolves",
    logo: "https://www.example.com/timberwolves-logo.png",
    primaryColor: "#0C2340",
    secondaryColor: "#236192"
  },
  NEW_ORLEANS_PELICANS: {
    name: "New Orleans Pelicans",
    logo: "https://www.example.com/pelicans-logo.png",
    primaryColor: "#0C2340",
    secondaryColor: "#85714D"
  },
  NEW_YORK_KNICKS: {
    name: "New York Knicks",
    logo: "https://www.example.com/knicks-logo.png",
    primaryColor: "#006BB6",
    secondaryColor: "#F58426"
  },
  OKLAHOMA_CITY_THUNDER: {
    name: "Oklahoma City Thunder",
    logo: "https://www.example.com/thunder-logo.png",
    primaryColor: "#007AC1",
    secondaryColor: "#EF3B24"
  },
  ORLANDO_MAGIC: {
    name: "Orlando Magic",
    logo: "https://www.example.com/magic-logo.png",
    primaryColor: "#0077C9",
    secondaryColor: "#C4CED4"
  },
  PHILADELPHIA_76ERS: {
    name: "Philadelphia 76ers",
    logo: "https://www.example.com/76ers-logo.png",
    primaryColor: "#006BB6",
    secondaryColor: "#ED174C"
  },
  PHOENIX_SUNS: {
    name: "Phoenix Suns",
    logo: "https://www.example.com/suns-logo.png",
    primaryColor: "#1D1160",
    secondaryColor: "#E56020"
  },
  PORTLAND_TRAIL_BLAZERS: {
    name: "Portland Trail Blazers",
    logo: "https://www.example.com/trailblazers-logo.png",
    primaryColor: "#E03A3E",
    secondaryColor: "#000000"
  },
  SACRAMENTO_KINGS: {
    name: "Sacramento Kings",
    logo: "https://www.example.com/kings-logo.png",
    primaryColor: "#5A2D81",
    secondaryColor: "#63727A"
  },
  SAN_ANTONIO_SPURS: {
    name: "San Antonio Spurs",
    logo: "https://www.example.com/spurs-logo.png",
    primaryColor: "#B6BFBF",
    secondaryColor: "#000000"
  },
  TORONTO_RAPTORS: {
    name: "Toronto Raptors",
    logo: "https://www.example.com/raptors-logo.png",
    primaryColor: "#CE1141",
    secondaryColor: "#000000"
  },
  UTAH_JAZZ: {
    name: "Utah Jazz",
    logo: "https://www.example.com/jazz-logo.png",
    primaryColor: "#002B5C",
    secondaryColor: "#F9A01B"
  },
  WASHINGTON_WIZARDS: {
    name: "Washington Wizards",
    logo: "https://www.example.com/wizards-logo.png",
    primaryColor: "#E31837",
    secondaryColor: "#002B5C"
  }};
};
const SampleStandings = () => {
  const sample_western_standings = [
    Teams.DALLAS_MAVERICKS,
    Teams.DENVER_NUGGETS,
    Teams.GOLDEN_STATE_WARRIORS,
    Teams.HOUSTON_ROCKETS,
    Teams.LOS_ANGELES_CLIPPERS,
    Teams.LOS_ANGELES_LAKERS,
    Teams.MEMPHIS_GRIZZLIES,
    Teams.MINNESOTA_TIMBERWOLVES,
    Teams.NEW_ORLEANS_PELICANS,
    Teams.OKLAHOMA_CITY_THUNDER,
    Teams.PHOENIX_SUNS,
    Teams.PORTLAND_TRAIL_BLAZERS,
    Teams.SACRAMENTO_KINGS,
    Teams.SAN_ANTONIO_SPURS,
    Teams.UTAH_JAZZ
  ];
  const sample_eastern_standings = [
      Teams.ATLANTA_HAWKS,
      Teams.BOSTON_CELTICS,
      Teams.BROOKLYN_NETS,
      Teams.CHARLOTTE_HORNETS,
      Teams.CHICAGO_BULLS,
      Teams.CLEVELAND_CAVALIERS,
      Teams.DETROIT_PISTONS,
      Teams.INDIANA_PACERS,
      Teams.MIAMI_HEAT,
      Teams.MILWAUKEE_BUCKS,
      Teams.NEW_YORK_KNICKS,
      Teams.ORLANDO_MAGIC,
      Teams.PHILADELPHIA_76ERS,
      Teams.TORONTO_RAPTORS,
      Teams.WASHINGTON_WIZARDS
  ];
};


export default {Teams, SampleStandings};