const HEADER_ROW = 'Player,Team,League,Position,Age,Performance Index,Minutes played,Possessions won per 90,Defensive duels per 90,Aerial duels per 90,Sliding tackles per 90,Sliding tackles (PAdj),Shots blocked per 90,Interceptions per 90,Interceptions (PAdj),Successful attacking actions per 90,Goals per 90,Non-penalty goals per 90,xG per 90,Headed goals per 90,Shots per 90,Assists per 90,Crosses per 90,Crosses to box per 90,Dribbles attempted per 90,Offensive duels per 90,Touches in box per 90,Progressive carries per 90,Accelerations per 90,Fouls suffered per 90,Passes per 90,Forward passes per 90,Short passes per 90,Long passes per 90,Average pass length (m),xA per 90,Shot assists per 90,Key passes per 90,Passes to final third per 90,Passes to penalty box per 90,Through passes per 90,Deep completions per 90,Progressive passes per 90,Shots conceded per 90,Clean sheets,xG conceded per 90,Prevented goals per 90,Exits per 90,Defensive duels won %,Aerial duels won %,Shots on target %,Goal conversion %,Cross accuracy %,Dribble success rate %,Offensive duels won %,Pass completion %,Forward pass completion %,Short pass completion %,Long pass accuracy %,Pass completion (to final third) %,Pass completion (to penalty box) %,Through pass completion %,Progressive pass accuracy %,Save percentage %,Free kicks per 90,Direct free kicks per 90,Direct free kicks oT %,Corners per 90,Penalties attempted,Penalty success rate %,Matches played,Duels per 90,Duels won %,Possession +/-,Forward pass ratio,xA per 100 passes,Chance creation ratio,Inaccurate passes %,Goals + Assists per 90,NPG+A per 90,xG+xA per 90,xG/Shot,Goals - xG per 90,Goals per xG,Assists - xA per 90,Assists per xA,Successful dribbles per 90,Shots on target per 90,Accurate crosses per 90,Offensive duels won per 90,Defensive duels won per 90,Aerial duels won per 90,Passes completed per 90,Forward passes completed per 90,Short passes completed per 90,Long passes completed per 90,Accurate passes to final third per 90,Accurate passes to pen box per 90,Through passes completed per 90,Progressive passes completed per 90,Misplaced passes per 90,Saves per 90,Possessions lost per 90,Possessions won - lost per 90,Progressive actions per 90,Duels won per 90,Minutes per match,Backward pass ratio,Penalties scored,npxG per 90,npxG/Shot,npxG+xA per 90,Touches per 90,Progressive action rate,Progressive passes (PAdj),Ball-carrying frequency,xG per 100 touches,Shot frequency,Dribbles per 100 touches,Goals per 100 touches,Passes received per 90,Backward passes per 90,Pre-assists per 90';

const NON_CONVERTIBLE_COLUMNS = new Set([5, 6, 11, 14, 34, 44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 66, 68, 69, 70, 72, 73, 74, 75, 76, 81, 83, 85, 106, 107, 108, 110, 113, 114, 115, 116, 117, 118, 119]);
const TWO_DECIMAL_TOTAL = new Set([18, 35, 45, 46, 80, 82, 84, 109, 111]);
const GOAL_CONVERSION_INDEX = 51;
const MINUTES_INDEX = 6;
const AGE_INDEX = 4;

const INDIVIDUAL_POSITIONS = [
    { value: 'Goalkeeper', i18n: 'positions.goalkeeper', label: 'Goalkeeper' },
    { value: 'Centre-back', i18n: 'positions.centreback', label: 'Centre-back' },
    { value: 'Full-back', i18n: 'positions.fullback', label: 'Full-back' },
    { value: 'Midfielder', i18n: 'positions.midfielder', label: 'Midfielder' },
    { value: 'Winger', i18n: 'positions.winger', label: 'Winger' },
    { value: 'Striker', i18n: 'positions.striker', label: 'Striker' }
];
const ALL_POSITIONS = INDIVIDUAL_POSITIONS.map(position => position.value);
const POSITION_ALIASES = {
    GK: 'Goalkeeper', Goalkeeper: 'Goalkeeper',
    CB: 'Centre-back', 'Centre-back': 'Centre-back',
    FB: 'Full-back', 'Full-back': 'Full-back',
    CM: 'Midfielder', Midfielder: 'Midfielder',
    FW: 'Winger', Winger: 'Winger',
    ST: 'Striker', Striker: 'Striker'
};

const TOP_5 = ['Premier League', 'Bundesliga', 'La Liga', 'Ligue 1', 'Serie A'];
const TOP_7 = ['Premier League', 'Bundesliga', 'La Liga', 'Ligue 1', 'Serie A', 'Eredivisie', 'Liga Portugal'];
const SECOND_DIVISIONS = ['Championship', 'Segunda Division', 'Serie B', 'Bundesliga 2', 'Ligue 2', 'Liga Portugal 2', 'Eerste Divisie'];
const SOUTH_AMERICA = ['Brazil Serie A', 'Argentina Primera', 'Uruguay Primera', 'Colombia', 'Chile', 'Paraguay', 'Ecuador'];
const SCANDINAVIA = ['Norway Eliteserien', 'Denmark Superliga', 'Sweden Allsvenskan'];
const EASTERN_EUROPE = ['Czech Fortuna Liga', 'Serbia SuperLiga', 'Croatia HNL', 'Russia', 'Ukraine', 'Poland', 'Slovenia', 'Romania', 'Bulgaria', 'Hungary', 'Slovakia'];
const GULF = ['Saudi Pro League', 'UAE', 'Qatar'];
const AFRICA = ['South Africa', 'Egypt', 'Morocco'];
const ALL_LEAGUES = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Liga Portugal', 'Eredivisie', 'Belgium Pro League', 'Scotland Premiership', 'Austrian Bundesliga', 'Swiss Super League', 'Süper Lig', 'Denmark Superliga', 'Sweden Allsvenskan', 'Norway Eliteserien', 'Ukraine', 'Russia', 'Poland', 'Croatia HNL', 'Serbia SuperLiga', 'Czech Fortuna Liga', 'Bulgaria', 'Hungary', 'Slovakia', 'Slovenia', 'Romania', 'Greece', 'Cyprus', 'Israel', 'Saudi Pro League', 'UAE', 'Qatar', 'J1 League', 'K League 1', 'MLS', 'LigaMX', 'Brazil Serie A', 'Argentina Primera', 'Uruguay Primera', 'Chile', 'Colombia', 'Ecuador', 'Paraguay', 'Egypt', 'Morocco', 'South Africa', 'Australia', 'Championship', 'Segunda Division', 'Serie B', 'Bundesliga 2', 'Ligue 2', 'Eerste Divisie', 'Liga Portugal 2', 'League One'];
const FIRST_DIVISIONS = ALL_LEAGUES.filter(league => !SECOND_DIVISIONS.includes(league) && league !== 'League One');
const NO_TOP_7 = ALL_LEAGUES.filter(league => !TOP_7.includes(league));

const INDIVIDUAL_LEAGUES = [
    { value: 'Premier League', i18n: 'leagues.premierLeague', icon: 'emojione:flag-for-united-kingdom', label: 'Premier League' },
    { value: 'La Liga', i18n: 'leagues.laLiga', icon: 'emojione:flag-for-spain', label: 'La Liga' },
    { value: 'Bundesliga', i18n: 'leagues.bundesliga', icon: 'emojione:flag-for-germany', label: 'Bundesliga' },
    { value: 'Serie A', i18n: 'leagues.serieA', icon: 'emojione:flag-for-italy', label: 'Serie A' },
    { value: 'Ligue 1', i18n: 'leagues.ligue1', icon: 'emojione:flag-for-france', label: 'Ligue 1' },
    { value: 'Liga Portugal', i18n: 'leagues.ligaPortugal', icon: 'emojione:flag-for-portugal', label: 'Liga Portugal' },
    { value: 'Eredivisie', i18n: 'leagues.eredivisie', icon: 'emojione:flag-for-netherlands', label: 'Eredivisie' },
    { value: 'Belgium Pro League', i18n: 'leagues.belgium', icon: 'emojione:flag-for-belgium', label: 'Belgium' },
    { value: 'Scotland Premiership', i18n: 'leagues.scotland', icon: '', label: 'Scotland', scotland: true },
    { value: 'Austrian Bundesliga', i18n: 'leagues.austria', icon: 'emojione:flag-for-austria', label: 'Austria' },
    { value: 'Swiss Super League', i18n: 'leagues.switzerland', icon: 'emojione:flag-for-switzerland', label: 'Switzerland' },
    { value: 'Süper Lig', i18n: 'leagues.turkey', icon: 'emojione:flag-for-turkey', label: 'Türkiye' },
    { value: 'Denmark Superliga', i18n: 'leagues.denmark', icon: 'emojione:flag-for-denmark', label: 'Denmark' },
    { value: 'Sweden Allsvenskan', i18n: 'leagues.sweden', icon: 'emojione:flag-for-sweden', label: 'Sweden' },
    { value: 'Norway Eliteserien', i18n: 'leagues.norway', icon: 'emojione:flag-for-norway', label: 'Norway' },
    { value: 'Ukraine', i18n: 'leagues.ukraine', icon: 'emojione:flag-for-ukraine', label: 'Ukraine' },
    { value: 'Russia', i18n: 'leagues.russia', icon: 'emojione:flag-for-russia', label: 'Russia' },
    { value: 'Poland', i18n: 'leagues.poland', icon: 'emojione:flag-for-poland', label: 'Poland' },
    { value: 'Croatia HNL', i18n: 'leagues.croatia', icon: 'emojione:flag-for-croatia', label: 'Croatia' },
    { value: 'Serbia SuperLiga', i18n: 'leagues.serbia', icon: 'emojione:flag-for-serbia', label: 'Serbia' },
    { value: 'Czech Fortuna Liga', i18n: 'leagues.czech', icon: 'emojione:flag-for-czechia', label: 'Czech Republic' },
    { value: 'Bulgaria', i18n: 'leagues.bulgaria', icon: 'emojione:flag-for-bulgaria', label: 'Bulgaria' },
    { value: 'Hungary', i18n: 'leagues.hungary', icon: 'emojione:flag-for-hungary', label: 'Hungary' },
    { value: 'Slovakia', i18n: 'leagues.slovakia', icon: 'emojione:flag-for-slovakia', label: 'Slovakia' },
    { value: 'Slovenia', i18n: 'leagues.slovenia', icon: 'emojione:flag-for-slovenia', label: 'Slovenia' },
    { value: 'Romania', i18n: 'leagues.romania', icon: 'emojione:flag-for-romania', label: 'Romania' },
    { value: 'Greece', i18n: 'leagues.greece', icon: 'emojione:flag-for-greece', label: 'Greece' },
    { value: 'Cyprus', i18n: 'leagues.cyprus', icon: 'emojione:flag-for-cyprus', label: 'Cyprus' },
    { value: 'Israel', i18n: 'leagues.israel', icon: 'emojione:flag-for-israel', label: 'Israel' },
    { value: 'Saudi Pro League', i18n: 'leagues.saudiArabia', icon: 'emojione:flag-for-saudi-arabia', label: 'Saudi Arabia' },
    { value: 'UAE', i18n: 'leagues.uae', icon: 'emojione:flag-for-united-arab-emirates', label: 'UAE' },
    { value: 'Qatar', i18n: 'leagues.qatar', icon: 'emojione:flag-for-qatar', label: 'Qatar' },
    { value: 'J1 League', i18n: 'leagues.japan', icon: 'emojione:flag-for-japan', label: 'Japan' },
    { value: 'K League 1', i18n: 'leagues.korea', icon: 'emojione:flag-for-south-korea', label: 'Korea' },
    { value: 'MLS', i18n: 'leagues.usa', icon: 'emojione:flag-for-united-states', label: 'MLS' },
    { value: 'LigaMX', i18n: 'leagues.mexico', icon: 'emojione:flag-for-mexico', label: 'Mexico' },
    { value: 'Brazil Serie A', i18n: 'leagues.brazil', icon: 'emojione:flag-for-brazil', label: 'Brazil Serie A' },
    { value: 'Argentina Primera', i18n: 'leagues.argentina', icon: 'emojione:flag-for-argentina', label: 'Argentina Primera' },
    { value: 'Uruguay Primera', i18n: 'leagues.uruguay', icon: 'emojione:flag-for-uruguay', label: 'Uruguay Primera' },
    { value: 'Chile', i18n: 'leagues.chile', icon: 'emojione:flag-for-chile', label: 'Chile' },
    { value: 'Colombia', i18n: 'leagues.colombia', icon: 'emojione:flag-for-colombia', label: 'Colombia' },
    { value: 'Ecuador', i18n: 'leagues.ecuador', icon: 'emojione:flag-for-ecuador', label: 'Ecuador' },
    { value: 'Paraguay', i18n: 'leagues.paraguay', icon: 'emojione:flag-for-paraguay', label: 'Paraguay' },
    { value: 'Egypt', i18n: 'leagues.egypt', icon: 'emojione:flag-for-egypt', label: 'Egypt' },
    { value: 'Morocco', i18n: 'leagues.morocco', icon: 'emojione:flag-for-morocco', label: 'Morocco' },
    { value: 'South Africa', i18n: 'leagues.southAfrica', icon: 'emojione:flag-for-south-africa', label: 'South Africa' },
    { value: 'Australia', i18n: 'leagues.australia', icon: 'emojione:flag-for-australia', label: 'Australia' },
    { value: 'Championship', i18n: 'leagues.championship', icon: 'emojione:flag-for-united-kingdom', label: 'Championship' },
    { value: 'Segunda Division', i18n: 'leagues.segundaDivision', icon: 'emojione:flag-for-spain', label: 'Spain Segunda' },
    { value: 'Serie B', i18n: 'leagues.serieB', icon: 'emojione:flag-for-italy', label: 'Serie B' },
    { value: 'Bundesliga 2', i18n: 'leagues.bundesliga2', icon: 'emojione:flag-for-germany', label: '2. Bundesliga' },
    { value: 'Ligue 2', i18n: 'leagues.ligue2', icon: 'emojione:flag-for-france', label: 'Ligue 2' },
    { value: 'Eerste Divisie', i18n: 'leagues.eersteDivisie', icon: 'emojione:flag-for-netherlands', label: 'Eerste Divisie' },
    { value: 'Liga Portugal 2', i18n: 'leagues.ligaPortugal2', icon: 'emojione:flag-for-portugal', label: 'Liga Portugal 2' },
    { value: 'League One', i18n: 'leagues.leagueOne', icon: 'emojione:flag-for-united-kingdom', label: 'League One' }
];

const LEAGUE_PRESETS = [
    { value: 'All Leagues', i18n: 'leagues.allLeagues', icon: 'emojione:globe-showing-europe-africa', label: 'All Leagues', leagues: ALL_LEAGUES },
    { value: 'All First Divisions', i18n: 'leagues.firstDivisions', icon: 'emojione:globe-showing-europe-africa', label: 'All First Divisions', leagues: FIRST_DIVISIONS },
    { value: 'Top 7 Leagues', i18n: 'leagues.top7', icon: 'emojione:flag-for-flag-european-union', label: 'Top 7 Leagues', leagues: TOP_7 },
    { value: 'Top 5 Leagues', i18n: 'leagues.top5', icon: 'emojione:flag-for-flag-european-union', label: 'Top 5 Leagues', leagues: TOP_5 },
    { value: 'No Top 7', i18n: 'leagues.noTop7', icon: 'emojione:globe-showing-europe-africa', label: 'Outside Top 7', leagues: NO_TOP_7 },
    { value: 'South America', i18n: 'leagues.southAmerica', icon: 'emojione:globe-showing-americas', label: 'South America', leagues: SOUTH_AMERICA },
    { value: 'Scandinavia', i18n: 'leagues.scandinavia', icon: 'emojione:globe-showing-europe-africa', label: 'Scandinavia', leagues: SCANDINAVIA },
    { value: 'Eastern Europe', i18n: 'leagues.easternEurope', icon: 'emojione:globe-showing-europe-africa', label: 'Eastern Europe', leagues: EASTERN_EUROPE },
    { value: 'Gulf', i18n: 'leagues.gulf', icon: 'emojione:globe-showing-asia-australia', label: 'Gulf', leagues: GULF },
    { value: 'Africa', i18n: 'leagues.africa', icon: 'emojione:globe-showing-europe-africa', label: 'Africa', leagues: AFRICA },
    { value: '2nd Divisions', i18n: 'leagues.2ndDivisions', icon: 'emojione:globe-showing-europe-africa', label: '2nd Divisions', leagues: SECOND_DIVISIONS }
];

const customMetricOrder = [
    { text: 'Minutes played', i18n: 'metrics.minutesPlayed' },
    { text: 'Matches played', i18n: 'metrics.matchesPlayed' },
    { text: 'Minutes per match', i18n: 'metrics.minutesPerMatch' },
    { text: 'CATEGORY: Defending', i18n: 'categories.defending' },
    { text: 'Defensive duels per 90', i18n: 'metrics.defensiveDuels' },
    { text: 'Defensive duels won %', i18n: 'metrics.defensiveDuelsWon' },
    { text: 'Defensive duels won per 90', i18n: 'metrics.defensiveDuelsWonPerNinety' },
    { text: 'Sliding tackles per 90', i18n: 'metrics.slidingTackles' },
    { text: 'Sliding tackles (PAdj)', i18n: 'metrics.slidingTacklesAdj' },
    { text: 'Interceptions per 90', i18n: 'metrics.interceptions' },
    { text: 'Interceptions (PAdj)', i18n: 'metrics.interceptionsAdj' },
    { text: 'Possessions won per 90', i18n: 'metrics.possessionsWon' },
    { text: 'Aerial duels per 90', i18n: 'metrics.aerialDuels' },
    { text: 'Aerial duels won %', i18n: 'metrics.aerialDuelsWon' },
    { text: 'Aerial duels won per 90', i18n: 'metrics.aerialDuelsWonPerNinety' },
    { text: 'Shots blocked per 90', i18n: 'metrics.shotsBlocked' },
    { text: 'CATEGORY: Possession', i18n: 'categories.possession' },
    { text: 'Passes received per 90', i18n: 'metrics.passesReceived' },
    { text: 'Touches per 90', i18n: 'metrics.touches' },
    { text: 'Possessions lost per 90', i18n: 'metrics.possessionsLost' },
    { text: 'Possessions won - lost per 90', i18n: 'metrics.possessionsBalance' },
    { text: 'Possession +/-', i18n: 'metrics.possessionPlusMinus' },
    { text: 'Duels per 90', i18n: 'metrics.duels' },
    { text: 'Duels won %', i18n: 'metrics.duelsWon' },
    { text: 'Duels won per 90', i18n: 'metrics.duelsWonPerNinety' },
    { text: 'Progressive actions per 90', i18n: 'metrics.progressiveActions' },
    { text: 'Progressive action rate', i18n: 'metrics.progressiveActionRate' },
    { text: 'CATEGORY: Passing', i18n: 'categories.passing' },
    { text: 'Passes per 90', i18n: 'metrics.passes' },
    { text: 'Pass completion %', i18n: 'metrics.passCompletion' },
    { text: 'Passes completed per 90', i18n: 'metrics.passesCompleted' },
    { text: 'Forward passes per 90', i18n: 'metrics.forwardPasses' },
    { text: 'Forward pass completion %', i18n: 'metrics.forwardPassCompletion' },
    { text: 'Forward passes completed per 90', i18n: 'metrics.forwardPassesCompleted' },
    { text: 'Short passes per 90', i18n: 'metrics.shortPasses' },
    { text: 'Short pass completion %', i18n: 'metrics.shortPassCompletion' },
    { text: 'Short passes completed per 90', i18n: 'metrics.shortPassesCompleted' },
    { text: 'Long passes per 90', i18n: 'metrics.longPasses' },
    { text: 'Long pass accuracy %', i18n: 'metrics.longPassAccuracy' },
    { text: 'Long passes completed per 90', i18n: 'metrics.longPassesCompleted' },
    { text: 'Progressive passes per 90', i18n: 'metrics.progressivePasses' },
    { text: 'Progressive pass accuracy %', i18n: 'metrics.progressivePassAccuracy' },
    { text: 'Progressive passes completed per 90', i18n: 'metrics.progressivePassesCompleted' },
    { text: 'Progressive passes (PAdj)', i18n: 'metrics.progressivePassesAdj' },
    { text: 'Passes to final third per 90', i18n: 'metrics.passesToFinalThird' },
    { text: 'Pass completion (to final third) %', i18n: 'metrics.passCompletionFinalThird' },
    { text: 'Accurate passes to final third per 90', i18n: 'metrics.accuratePassesFinalThird' },
    { text: 'Passes to penalty box per 90', i18n: 'metrics.passesToBox' },
    { text: 'Pass completion (to penalty box) %', i18n: 'metrics.passCompletionToBox' },
    { text: 'Accurate passes to pen box per 90', i18n: 'metrics.accuratePassesToBox' },
    { text: 'Through passes per 90', i18n: 'metrics.throughPasses' },
    { text: 'Through pass completion %', i18n: 'metrics.throughPassCompletion' },
    { text: 'Through passes completed per 90', i18n: 'metrics.throughPassesCompleted' },
    { text: 'Average pass length (m)', i18n: 'metrics.averagePassLength' },
    { text: 'Backward passes per 90', i18n: 'metrics.backwardPasses' },
    { text: 'Misplaced passes per 90', i18n: 'metrics.misplacedPasses' },
    { text: 'Forward pass ratio', i18n: 'metrics.forwardPassRatio' },
    { text: 'Backward pass ratio', i18n: 'metrics.backwardPassRatio' },
    { text: 'CATEGORY: Dribbling and Ball-Carrying', i18n: 'categories.dribbling' },
    { text: 'Dribbles attempted per 90', i18n: 'metrics.dribblesAttempted' },
    { text: 'Dribble success rate %', i18n: 'metrics.dribbleSuccess' },
    { text: 'Successful dribbles per 90', i18n: 'metrics.successfulDribbles' },
    { text: 'Dribbles per 100 touches', i18n: 'metrics.dribblesPerTouches' },
    { text: 'Successful attacking actions per 90', i18n: 'metrics.attackingActions' },
    { text: 'Offensive duels per 90', i18n: 'metrics.offensiveDuels' },
    { text: 'Offensive duels won %', i18n: 'metrics.offensiveDuelsWon' },
    { text: 'Offensive duels won per 90', i18n: 'metrics.offensiveDuelsWonPerNinety' },
    { text: 'Progressive carries per 90', i18n: 'metrics.progressiveCarries' },
    { text: 'Ball-carrying frequency', i18n: 'metrics.ballCarrying' },
    { text: 'Accelerations per 90', i18n: 'metrics.accelerations' },
    { text: 'Fouls suffered per 90', i18n: 'metrics.foulsSuffered' },
    { text: 'CATEGORY: Goal Creation', i18n: 'categories.goalCreation' },
    { text: 'Assists per 90', i18n: 'metrics.assistsPerNinety' },
    { text: 'xA per 90', i18n: 'metrics.xaPerNinety' },
    { text: 'xA per 100 passes', i18n: 'metrics.xaPerPasses' },
    { text: 'Goals + Assists per 90', i18n: 'metrics.goalsAndAssists' },
    { text: 'NPG+A per 90', i18n: 'metrics.npGoalsAndAssists' },
    { text: 'xG+xA per 90', i18n: 'metrics.xgAndXa' },
    { text: 'npxG+xA per 90', i18n: 'metrics.npxgAndXa' },
    { text: 'Key passes per 90', i18n: 'metrics.keyPasses' },
    { text: 'Chance creation ratio', i18n: 'metrics.chanceCreation' },
    { text: 'Assists - xA per 90', i18n: 'metrics.assistsMinusXa' },
    { text: 'Assists per xA', i18n: 'metrics.assistsPerXa' },
    { text: 'Shot assists per 90', i18n: 'metrics.shotAssists' },
    { text: 'Pre-assists per 90', i18n: 'metrics.preAssists' },
    { text: 'Crosses per 90', i18n: 'metrics.crosses' },
    { text: 'Cross accuracy %', i18n: 'metrics.crossAccuracy' },
    { text: 'Accurate crosses per 90', i18n: 'metrics.accurateCrosses' },
    { text: 'Crosses to box per 90', i18n: 'metrics.crossesToBox' },
    { text: 'Deep completions per 90', i18n: 'metrics.deepCompletions' },
    { text: 'CATEGORY: Goal Scoring', i18n: 'categories.goalScoring' },
    { text: 'Goals per 90', i18n: 'metrics.goalsPerNinety' },
    { text: 'Non-penalty goals per 90', i18n: 'metrics.nonPenaltyGoals' },
    { text: 'xG per 90', i18n: 'metrics.xgPerNinety' },
    { text: 'xG/Shot', i18n: 'metrics.xgPerShot' },
    { text: 'npxG per 90', i18n: 'metrics.npxgPerNinety' },
    { text: 'npxG/Shot', i18n: 'metrics.npxgPerShot' },
    { text: 'Goals per 100 touches', i18n: 'metrics.goalsPerTouches' },
    { text: 'xG per 100 touches', i18n: 'metrics.xgPerTouches' },
    { text: 'Shot frequency', i18n: 'metrics.shotFrequency' },
    { text: 'Shots per 90', i18n: 'metrics.shotsPerNinety' },
    { text: 'Shots on target %', i18n: 'metrics.shotsOnTarget' },
    { text: 'Shots on target per 90', i18n: 'metrics.shotsOnTargetPerNinety' },
    { text: 'Goal conversion %', i18n: 'metrics.goalConversion' },
    { text: 'Goals - xG per 90', i18n: 'metrics.goalsMinusXg' },
    { text: 'Goals per xG', i18n: 'metrics.goalsPerXg' },
    { text: 'Headed goals per 90', i18n: 'metrics.headedGoals' },
    { text: 'Touches in box per 90', i18n: 'metrics.touchesInBox' },
    { text: 'CATEGORY: Goalkeeping', i18n: 'categories.goalkeeping' },
    { text: 'Saves per 90', i18n: 'metrics.saves' },
    { text: 'Save percentage %', i18n: 'metrics.savePercentage' },
    { text: 'Prevented goals per 90', i18n: 'metrics.preventedGoals' },
    { text: 'Shots conceded per 90', i18n: 'metrics.shotsConceded' },
    { text: 'xG conceded per 90', i18n: 'metrics.xgConceded' },
    { text: 'Clean sheets', i18n: 'metrics.cleanSheets' },
    { text: 'Exits per 90', i18n: 'metrics.exits' },
    { text: 'CATEGORY: Set Pieces', i18n: 'categories.setPieces' },
    { text: 'Free kicks per 90', i18n: 'metrics.freeKicks' },
    { text: 'Direct free kicks per 90', i18n: 'metrics.directFreeKicks' },
    { text: 'Direct free kicks oT %', i18n: 'metrics.directFreeKicksOnTarget' },
    { text: 'Corners per 90', i18n: 'metrics.corners' },
    { text: 'Penalties attempted', i18n: 'metrics.penaltiesAttempted' },
    { text: 'Penalties scored', i18n: 'metrics.penaltiesScored' },
    { text: 'Penalty success rate %', i18n: 'metrics.penaltySuccessRate' }
];

const OUTFIELD_HIDDEN_CATEGORIES = new Set(['categories.goalkeeping']);
const GK_HIDDEN_CATEGORIES = new Set(['categories.goalScoring', 'categories.goalCreation', 'categories.dribbling']);
// GK needs Passing before Possession; outfield needs the opposite — remap at display time.
const OUTFIELD_CATEGORY_ORDER = [
    'categories.defending',
    'categories.possession',
    'categories.passing',
    'categories.dribbling',
    'categories.goalCreation',
    'categories.goalScoring',
    'categories.setPieces'
];
const GK_CATEGORY_ORDER = [
    'categories.goalkeeping',
    'categories.defending',
    'categories.passing',
    'categories.possession',
    'categories.setPieces'
];
const NEGATIVE_METRICS = new Set([
    'Possessions lost per 90',
    'Misplaced passes per 90',
    'Backward pass ratio',
    'Shots conceded per 90',
    'xG conceded per 90'
]);
const DIAGONAL_PAIRS = [
    ['Goals per 90', 'xG per 90'],
    ['Non-penalty goals per 90', 'npxG per 90'],
    ['Assists per 90', 'xA per 90'],
    ['Goals + Assists per 90', 'xG+xA per 90'],
    ['NPG+A per 90', 'npxG+xA per 90'],
    ['Goals per 100 touches', 'xG per 100 touches']
];
const OUTFIELD_TEMPLATES = [
    { id: 'defDuelPct', x: 'Defensive duels per 90', y: 'Defensive duels won %', i18n: 'templates.defDuelPct', label: 'Defensive duels' },
    { id: 'aerialPct', x: 'Aerial duels per 90', y: 'Aerial duels won %', i18n: 'templates.aerialPct', label: 'Aerial duels' },
    { id: 'defAerialPct', x: 'Defensive duels won %', y: 'Aerial duels won %', i18n: 'templates.defAerialPct', label: 'Defensive % vs Aerial %' },
    { id: 'possWonFwdPct', x: 'Possessions won per 90', y: 'Forward pass completion %', i18n: 'templates.possWonFwdPct', label: 'Poss won vs Fwd pass %' },
    { id: 'passPassPct', x: 'Passes per 90', y: 'Pass completion %', i18n: 'templates.passPassPct', label: 'Pass accuracy' },
    { id: 'progPassCarry', x: 'Progressive passes per 90', y: 'Progressive carries per 90', i18n: 'templates.progPassCarry', label: 'Progressive actions' },
    { id: 'keyProgPass', x: 'Key passes per 90', y: 'Progressive passes per 90', i18n: 'templates.keyProgPass', label: 'Key vs Progressive' },
    { id: 'keyXa', x: 'Key passes per 90', y: 'xA per 90', i18n: 'templates.keyXa', label: 'Key passes vs xA' },
    { id: 'goalAssist', x: 'Goals per 90', y: 'Assists per 90', i18n: 'templates.goalAssist', label: 'Goals vs Assists' },
    { id: 'goalsXg', x: 'Goals per 90', y: 'xG per 90', i18n: 'templates.goalsXg', label: 'Goals vs xG' },
    { id: 'npgNpxg', x: 'Non-penalty goals per 90', y: 'npxG per 90', i18n: 'templates.npgNpxg', label: 'NPG vs npxG' },
    { id: 'shotsGoalPct', x: 'Shots per 90', y: 'Goal conversion %', i18n: 'templates.shotsGoalPct', label: 'Shots vs Conversion' },
    { id: 'xgXa', x: 'xG per 90', y: 'xA per 90', i18n: 'templates.xgXa', label: 'xG vs xA' },
    { id: 'dribXgxa', x: 'Successful dribbles per 90', y: 'xG+xA per 90', i18n: 'templates.dribXgxa', label: 'Dribbles vs xG+xA' },
    { id: 'dribSucc', x: 'Dribble success rate %', y: 'Successful dribbles per 90', i18n: 'templates.dribSucc', label: 'Dribbling' },
];
const GK_TEMPLATES = [
    { id: 'gkSavesSavePct', x: 'Saves per 90', y: 'Save percentage %', i18n: 'templates.gkSavesSavePct', label: 'Saves vs Save %' },
    { id: 'gkSavesPrevented', x: 'Saves per 90', y: 'Prevented goals per 90', i18n: 'templates.gkSavesPrevented', label: 'Saves vs Prevented' },
    { id: 'gkPreventedSavePct', x: 'Prevented goals per 90', y: 'Save percentage %', i18n: 'templates.gkPreventedSavePct', label: 'Prevented vs Save %' },
    { id: 'gkShotsSaves', x: 'Shots conceded per 90', y: 'Saves per 90', i18n: 'templates.gkShotsSaves', label: 'Shots conceded vs Saves' },
    { id: 'gkPassSavePct', x: 'Pass completion %', y: 'Save percentage %', i18n: 'templates.gkPassSavePct', label: 'Pass % vs Save %' },
    { id: 'gkShortLongPct', x: 'Short pass completion %', y: 'Long pass accuracy %', i18n: 'templates.gkShortLongPct', label: 'Short % vs Long %' }
];
const LEAGUE_COLORS = {
    'Premier League': 'rgba(255, 0, 0, 0.7)',
    'La Liga': 'rgba(255, 223, 0, 0.7)',
    'Bundesliga': 'rgba(85, 209, 73, 0.7)',
    'Serie A': 'rgba(0, 191, 255, 0.7)',
    'Ligue 1': 'rgba(153, 50, 204, 0.7)',
    'Eredivisie': 'rgba(255, 140, 0, 0.7)',
    'Liga Portugal': 'rgba(255, 20, 147, 0.7)',
    'Championship': 'rgba(220, 20, 60, 0.7)',
    'Segunda Division': 'rgba(0, 71, 171, 0.7)',
    'Serie B': 'rgba(255, 198, 0, 0.7)',
    'Belgium Pro League': 'rgba(255, 255, 0, 0.7)',
    'Ligue 2': 'rgba(135, 206, 235, 0.7)',
    'Bundesliga 2': 'rgba(0, 128, 0, 0.7)',
    'Scotland Premiership': 'rgba(147, 112, 219, 0.7)',
    'Swiss Super League': 'rgba(246, 38, 129, 0.7)',
    'Austrian Bundesliga': 'rgba(240, 128, 128, 0.7)',
    'Süper Lig': 'rgba(255, 69, 0, 0.7)',
    'Denmark Superliga': 'rgba(70, 130, 180, 0.7)',
    'Sweden Allsvenskan': 'rgba(255, 245, 104, 0.7)',
    'Norway Eliteserien': 'rgba(34, 139, 34, 0.7)',
    'Croatia HNL': 'rgba(30, 144, 255, 0.7)',
    'Serbia SuperLiga': 'rgba(208, 32, 144, 0.7)',
    'Czech Fortuna Liga': 'rgba(238, 130, 238, 0.7)',
    'Poland': 'rgba(255, 99, 71, 0.7)',
    'Ukraine': 'rgba(65, 105, 225, 0.7)',
    'Russia': 'rgba(255, 215, 0, 0.7)',
    'Greece': 'rgba(255, 250, 160, 0.7)',
    'Israel': 'rgba(60, 179, 113, 0.7)',
    'J1 League': 'rgba(0, 206, 209, 0.7)',
    'K League 1': 'rgba(197, 142, 255, 0.7)',
    'Saudi Pro League': 'rgba(46, 139, 87, 0.7)',
    'MLS': 'rgba(255, 105, 180, 0.7)',
    'LigaMX': 'rgba(255, 165, 0, 0.7)',
    'Brazil Serie A': 'rgba(255, 207, 95, 0.7)',
    'Argentina Primera': 'rgba(255, 182, 193, 0.7)',
    'Uruguay Primera': 'rgba(102, 205, 170, 0.7)',
    'Chile': 'rgba(48, 98, 251, 0.7)',
    'Colombia': 'rgba(186, 85, 211, 0.7)',
    'Ecuador': 'rgba(123, 104, 238, 0.7)',
    'Paraguay': 'rgba(0, 128, 128, 0.7)',
    'UAE': 'rgba(0, 166, 147, 0.7)',
    'Australia': 'rgba(0, 102, 204, 0.7)',
    'Slovenia': 'rgba(120, 220, 100, 0.7)',
    'Cyprus': 'rgba(255, 215, 0, 0.7)',
    'South Africa': 'rgba(0, 119, 73, 0.7)',
    'Qatar': 'rgba(138, 43, 226, 0.7)',
    'Egypt': 'rgba(206, 17, 38, 0.7)',
    'Morocco': 'rgba(193, 39, 45, 0.7)',
    'Romania': 'rgba(180, 140, 220, 0.7)',
    'Bulgaria': 'rgba(0, 87, 183, 0.7)',
    'Hungary': 'rgba(255, 130, 110, 0.7)',
    'Slovakia': 'rgba(0, 102, 204, 0.7)',
    'Liga Portugal 2': 'rgba(255, 102, 0, 0.7)',
    'League One': 'rgba(200, 16, 46, 0.7)',
    'Eerste Divisie': 'rgba(255, 165, 0, 0.7)'
};
const DEFAULT_DOT = 'rgba(70, 130, 180, 0.7)';

const columnIndexMap = {};
HEADER_ROW.split(',').forEach((name, index) => { columnIndexMap[name] = index; });

const AGE_OPTIONS = [
    { text: 'Age', value: '', i18n: 'age.all' },
    { text: 'U17', value: '17' }, { text: 'U18', value: '18' }, { text: 'U19', value: '19' },
    { text: 'U20', value: '20' }, { text: 'U21', value: '21' }, { text: 'U22', value: '22' },
    { text: 'U23', value: '23' }, { text: 'U24', value: '24' }, { text: 'U25', value: '25' },
    { text: 'U26', value: '26' }, { text: 'U27', value: '27' }, { text: 'U28', value: '28' },
    { text: 'U29', value: '29' }, { text: 'U30', value: '30' }, { text: 'U35', value: '35' }
];

let originalDataArray = [];
let filteredData = [];
let selectedLeagues = new Set(ALL_LEAGUES);
let selectedPositions = new Set(['Centre-back']);
let xMetricName = 'Minutes played';
let yMetricName = 'Minutes played';
let sizeMetricName = 'Minutes played';
let selectedAge = '';
let thresholdMetricValue = String(MINUTES_INDEX);
let isToggled = false;
let isPastSeason = false;
let currentTemplate = 'custom';
let medianLinesVisible = false;
let clickedCircles = new Set();
let searchTerm = '';
let chartReady = false;
let thresholdDebounce = null;
let searchDebounce = null;

let svg, plot, xScale, yScale, sizeScale, gXAxis, gYAxis, xLabel, yLabel, tooltip;
let margin = { top: 40, right: 30, bottom: 60, left: 79 };
let width = 1082 - 30 - 79;
let height = 770 - 40 - 60;
let diagonalHoverTimer = null;

function t(key, fallback) {
    return typeof getTranslatedText === 'function' ? (getTranslatedText(key, fallback) || fallback) : fallback;
}

function setsEqual(a, b) {
    if (a.size !== b.size) return false;
    for (const value of a) if (!b.has(value)) return false;
    return true;
}

function parseCsv(text) {
    const lines = text.split('\n');
    const rows = new Array(lines.length);
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i]) continue;
        rows[count++] = lines[i].split(',');
    }
    rows.length = count;
    return rows;
}

function columnCanConvert(index) {
    return index > 4 && !NON_CONVERTIBLE_COLUMNS.has(index);
}

function getMetricValue(row, colIndex, asTotal) {
    const parsed = parseFloat(row[colIndex]);
    const raw = Number.isFinite(parsed) ? parsed : 0;
    if (!asTotal || !columnCanConvert(colIndex)) return raw;
    const minutesParsed = parseFloat(row[MINUTES_INDEX]);
    const minutes = Number.isFinite(minutesParsed) ? minutesParsed : 0;
    if (!minutes) return 0;
    return raw * minutes / 90;
}

function formatMetricValue(value, colIndex, asTotal) {
    if (!Number.isFinite(value)) return '';
    if (colIndex === GOAL_CONVERSION_INDEX) return value.toFixed(2);
    if (asTotal) {
        if (TWO_DECIMAL_TOTAL.has(colIndex)) return value.toFixed(2);
        return String(Math.round(value));
    }
    if (Number.isInteger(value)) return String(value);
    return String(Math.round(value * 1000) / 1000);
}

function getMetricDef(name) {
    return customMetricOrder.find(metric => metric.text === name);
}

function metricLabel(name) {
    const metric = getMetricDef(name);
    if (!metric) return name === 'None' ? t('metrics.none', 'None') : name;
    return typeof metricDisplayText === 'function' ? metricDisplayText(metric) : (isToggled ? metric.text.replace(' per 90', '') : metric.text);
}

function gkOnlySelected() {
    return selectedPositions.size === 1 && selectedPositions.has('Goalkeeper');
}

function hiddenCategories() {
    return gkOnlySelected() ? GK_HIDDEN_CATEGORIES : OUTFIELD_HIDDEN_CATEGORIES;
}

function activeCategoryOrder() {
    return gkOnlySelected() ? GK_CATEGORY_ORDER : OUTFIELD_CATEGORY_ORDER;
}

function metricAllowed(metric) {
    if (metric.text.startsWith('CATEGORY: ')) return !hiddenCategories().has(metric.i18n);
    let currentCategory = '';
    for (let i = 0; i < customMetricOrder.length; i++) {
        const item = customMetricOrder[i];
        if (item.text.startsWith('CATEGORY: ')) currentCategory = item.i18n;
        if (item.text === metric.text) {
            if (currentCategory && hiddenCategories().has(currentCategory)) return false;
            return true;
        }
    }
    return true;
}

function visibleMetrics() {
    const filtered = customMetricOrder.filter(metricAllowed);
    const prefix = [];
    const groups = new Map();
    let currentCategory = null;

    filtered.forEach(metric => {
        if (metric.text.startsWith('CATEGORY: ')) {
            currentCategory = metric.i18n;
            if (!groups.has(currentCategory)) groups.set(currentCategory, []);
            groups.get(currentCategory).push(metric);
            return;
        }
        if (!currentCategory) {
            prefix.push(metric);
            return;
        }
        if (!groups.has(currentCategory)) groups.set(currentCategory, []);
        groups.get(currentCategory).push(metric);
    });

    const ordered = prefix.slice();
    activeCategoryOrder().forEach(category => {
        const items = groups.get(category);
        if (!items) return;
        ordered.push(...items);
        groups.delete(category);
    });
    groups.forEach(items => ordered.push(...items));
    return ordered;
}

function availableTemplates() {
    return gkOnlySelected() ? GK_TEMPLATES : OUTFIELD_TEMPLATES;
}

function defaultPair() {
    return { x: 'Minutes played', y: 'Minutes played', template: 'custom' };
}

function ensureMetricsAvailable() {
    const allowed = new Set(visibleMetrics().filter(m => !m.text.startsWith('CATEGORY: ')).map(m => m.text));
    const fallback = defaultPair();
    if (!allowed.has(xMetricName) || !allowed.has(yMetricName)) {
        xMetricName = fallback.x;
        yMetricName = fallback.y;
        currentTemplate = fallback.template;
    }
    if (sizeMetricName !== 'None' && !allowed.has(sizeMetricName)) sizeMetricName = 'Minutes played';
    syncTemplateFromMetrics();
}

function isInverted(name) {
    return NEGATIVE_METRICS.has(name);
}

function isDiagonalPair(xName, yName) {
    return DIAGONAL_PAIRS.some(pair => (pair[0] === xName && pair[1] === yName) || (pair[1] === xName && pair[0] === yName));
}

function getLeagueColor(league) {
    return LEAGUE_COLORS[league] || 'rgba(255, 0, 0, 0.7)';
}

function getDropdownOptions(trigger) {
    if (!trigger) return null;
    const next = trigger.nextElementSibling;
    if (next && next.classList.contains('custom-select-options')) return next;
    const parent = trigger.parentElement;
    return parent ? parent.querySelector('.custom-select-options') : null;
}

function closeOpenDropdowns(exceptTrigger) {
    document.querySelectorAll('.custom-select-trigger.open, .menu-trigger.open').forEach(openTrigger => {
        if (openTrigger === exceptTrigger) return;
        openTrigger.classList.remove('open');
        const options = getDropdownOptions(openTrigger);
        if (options) options.style.display = 'none';
    });
}

function toggleDropdown(trigger, options) {
    const isOpen = trigger.classList.contains('open');
    closeOpenDropdowns(trigger);
    trigger.classList.toggle('open', !isOpen);
    options.style.display = isOpen ? 'none' : 'block';
    return !isOpen;
}

function closeSelector(triggerId, optionsId) {
    const trigger = document.getElementById(triggerId);
    const options = document.getElementById(optionsId);
    if (trigger) trigger.classList.remove('open');
    if (options) options.style.display = 'none';
}

function makeOptionCheck() {
    const check = document.createElement('span');
    check.className = 'option-check';
    return check;
}

function clickedCheck(e) {
    return !!(e.target && e.target.closest && e.target.closest('.option-check'));
}

function translatedItemLabel(item) {
    return t(item.i18n, item.label);
}

function joinSelectedLabels(catalog, selectedSet) {
    const byValue = {};
    catalog.forEach(item => { byValue[item.value] = item; });
    const labels = [];
    selectedSet.forEach(value => {
        const item = byValue[value];
        if (item) labels.push(translatedItemLabel(item));
    });
    return labels.join(' + ');
}

function clearTriggerFlags(trigger) {
    const existing = trigger.querySelector('.scotland-flag-icon');
    if (existing) existing.remove();
}

function setTriggerIcon(trigger, iconName, scotland) {
    clearTriggerFlags(trigger);
    let icon = trigger.querySelector('iconify-icon');
    const span = trigger.querySelector('span');
    if (scotland) {
        if (icon) icon.style.display = 'none';
        const flag = document.createElement('div');
        flag.className = 'scotland-flag-icon';
        trigger.insertBefore(flag, span);
        trigger.classList.add('has-icon');
        return;
    }
    if (!icon) {
        icon = document.createElement('iconify-icon');
        icon.setAttribute('width', '18');
        icon.setAttribute('height', '18');
        trigger.insertBefore(icon, span);
    }
    icon.setAttribute('icon', iconName);
    icon.style.display = 'inline-block';
    trigger.classList.add('has-icon');
}

function appendLeagueFlag(parent, league) {
    if (league.scotland) {
        const flag = document.createElement('div');
        flag.className = 'scotland-flag-icon';
        parent.appendChild(flag);
        return;
    }
    if (league.icon) {
        const icon = document.createElement('iconify-icon');
        icon.setAttribute('icon', league.icon);
        icon.setAttribute('width', '18');
        icon.setAttribute('height', '18');
        parent.appendChild(icon);
    }
}

function buildLeagueOptions() {
    const options = document.getElementById('league-select-options');
    options.innerHTML = '';
    options.classList.add('multi-select');

    LEAGUE_PRESETS.forEach(preset => {
        const option = document.createElement('div');
        option.className = 'custom-select-option league-preset';
        option.setAttribute('data-value', preset.value);
        option.appendChild(makeOptionCheck());
        appendLeagueFlag(option, preset);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', preset.i18n);
        span.textContent = preset.label;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            selectedLeagues = new Set(preset.leagues);
            onLeaguesChanged();
            if (!clickedCheck(e)) closeSelector('league-select-trigger', 'league-select-options');
        });
        options.appendChild(option);
    });

    const divider = document.createElement('div');
    divider.className = 'league-options-divider';
    options.appendChild(divider);

    INDIVIDUAL_LEAGUES.forEach(league => {
        const option = document.createElement('div');
        option.className = 'custom-select-option league-option';
        option.setAttribute('data-value', league.value);
        option.appendChild(makeOptionCheck());
        appendLeagueFlag(option, league);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', league.i18n);
        span.textContent = league.label;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            if (clickedCheck(e)) {
                if (selectedLeagues.has(league.value)) {
                    if (selectedLeagues.size === 1) return;
                    selectedLeagues.delete(league.value);
                } else {
                    selectedLeagues.add(league.value);
                }
                onLeaguesChanged();
                return;
            }
            selectedLeagues = new Set([league.value]);
            onLeaguesChanged();
            closeSelector('league-select-trigger', 'league-select-options');
        });
        options.appendChild(option);
    });
    updateLeagueTrigger();
}

function updateLeagueTrigger() {
    const trigger = document.getElementById('league-select-trigger');
    const span = trigger.querySelector('span');
    const matchingPreset = LEAGUE_PRESETS.find(preset => setsEqual(selectedLeagues, new Set(preset.leagues)));
    if (matchingPreset) {
        setTriggerIcon(trigger, matchingPreset.icon);
        span.textContent = t(matchingPreset.i18n, matchingPreset.label);
        span.setAttribute('data-i18n', matchingPreset.i18n);
    } else if (selectedLeagues.size === 1) {
        const value = selectedLeagues.values().next().value;
        const league = INDIVIDUAL_LEAGUES.find(item => item.value === value);
        if (league) {
            setTriggerIcon(trigger, league.icon, league.scotland);
            span.textContent = t(league.i18n, league.label);
            span.setAttribute('data-i18n', league.i18n);
        }
    } else {
        setTriggerIcon(trigger, 'emojione:globe-showing-europe-africa');
        span.textContent = selectedLeagues.size > 3
            ? t('leagues.nSelected', '{n} leagues').replace('{n}', String(selectedLeagues.size))
            : joinSelectedLabels(INDIVIDUAL_LEAGUES, selectedLeagues);
        span.removeAttribute('data-i18n');
    }
    document.querySelectorAll('#league-select-options .custom-select-option').forEach(option => {
        const value = option.getAttribute('data-value');
        if (option.classList.contains('league-preset')) {
            const preset = LEAGUE_PRESETS.find(item => item.value === value);
            option.classList.toggle('checked', !!(preset && setsEqual(selectedLeagues, new Set(preset.leagues))));
        } else {
            option.classList.toggle('checked', selectedLeagues.has(value));
        }
    });
}

function onLeaguesChanged() {
    updateLeagueTrigger();
    rebuildMetricLists();
    updateChart();
}

function setupLeagueSelector() {
    const trigger = document.getElementById('league-select-trigger');
    const options = document.getElementById('league-select-options');
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const opened = toggleDropdown(trigger, options);
        if (opened) {
            const checked = options.querySelector('.custom-select-option.checked');
            if (checked) checked.scrollIntoView({ block: 'nearest' });
        }
    });
}

function buildPositionOptions() {
    const options = document.getElementById('position-select-options');
    options.innerHTML = '';
    options.classList.add('multi-select');

    const allOption = document.createElement('div');
    allOption.className = 'custom-select-option position-preset';
    allOption.setAttribute('data-value', 'All');
    allOption.appendChild(makeOptionCheck());
    const allSpan = document.createElement('span');
    allSpan.setAttribute('data-i18n', 'positions.all');
    allSpan.textContent = t('positions.all', 'All positions');
    allOption.appendChild(allSpan);
    allOption.addEventListener('click', function (e) {
        e.stopPropagation();
        selectedPositions = new Set(ALL_POSITIONS);
        onPositionsChanged();
        if (!clickedCheck(e)) closeSelector('position-select-trigger', 'position-select-options');
    });
    options.appendChild(allOption);

    const divider = document.createElement('div');
    divider.className = 'league-options-divider';
    options.appendChild(divider);

    INDIVIDUAL_POSITIONS.forEach(position => {
        const option = document.createElement('div');
        option.className = 'custom-select-option position-option';
        option.setAttribute('data-value', position.value);
        option.appendChild(makeOptionCheck());
        const span = document.createElement('span');
        span.setAttribute('data-i18n', position.i18n);
        span.textContent = position.label;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            if (clickedCheck(e)) {
                if (selectedPositions.has(position.value)) {
                    if (selectedPositions.size === 1) return;
                    selectedPositions.delete(position.value);
                } else {
                    selectedPositions.add(position.value);
                }
                onPositionsChanged();
                return;
            }
            selectedPositions = new Set([position.value]);
            onPositionsChanged();
            closeSelector('position-select-trigger', 'position-select-options');
        });
        options.appendChild(option);
    });
    updatePositionTrigger();
}

function updatePositionTrigger() {
    const trigger = document.getElementById('position-select-trigger');
    const span = trigger.querySelector('span');
    const allSelected = setsEqual(selectedPositions, new Set(ALL_POSITIONS));
    if (allSelected) {
        span.textContent = t('positions.all', 'All positions');
        span.setAttribute('data-i18n', 'positions.all');
    } else if (selectedPositions.size === 1) {
        const value = selectedPositions.values().next().value;
        const position = INDIVIDUAL_POSITIONS.find(item => item.value === value);
        if (position) {
            span.textContent = t(position.i18n, position.label);
            span.setAttribute('data-i18n', position.i18n);
        }
    } else {
        span.textContent = selectedPositions.size > 3
            ? t('positions.nSelected', '{n} positions').replace('{n}', String(selectedPositions.size))
            : joinSelectedLabels(INDIVIDUAL_POSITIONS, selectedPositions);
        span.removeAttribute('data-i18n');
    }
    document.querySelectorAll('#position-select-options .custom-select-option').forEach(option => {
        const value = option.getAttribute('data-value');
        option.classList.toggle('checked', value === 'All' ? allSelected : selectedPositions.has(value));
    });
}

function onPositionsChanged() {
    updatePositionTrigger();
    ensureMetricsAvailable();
    rebuildMetricLists();
    buildTemplateOptions();
    updateChart();
}

function setupPositionSelector() {
    const trigger = document.getElementById('position-select-trigger');
    const options = document.getElementById('position-select-options');
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const opened = toggleDropdown(trigger, options);
        if (opened) {
            const checked = options.querySelector('.custom-select-option.checked');
            if (checked) checked.scrollIntoView({ block: 'nearest' });
        }
    });
}

function fillMetricList(listEl, currentValue, includeNone, onPick) {
    listEl.innerHTML = '';
    if (includeNone) {
        const noneOption = document.createElement('div');
        noneOption.className = 'custom-select-option' + (currentValue === 'None' ? ' selected' : '');
        noneOption.setAttribute('data-value', 'None');
        const noneSpan = document.createElement('span');
        noneSpan.setAttribute('data-i18n', 'metrics.none');
        noneSpan.textContent = t('metrics.none', 'None');
        noneOption.appendChild(noneSpan);
        noneOption.addEventListener('click', function (e) {
            e.stopPropagation();
            onPick('None');
        });
        listEl.appendChild(noneOption);
    }
    visibleMetrics().forEach(metric => {
        if (metric.text.startsWith('CATEGORY: ')) {
            const header = document.createElement('div');
            header.className = 'metric-category-header';
            const span = document.createElement('span');
            span.setAttribute('data-i18n', metric.i18n);
            span.textContent = t(metric.i18n, metric.text.replace('CATEGORY: ', ''));
            header.appendChild(span);
            listEl.appendChild(header);
            return;
        }
        const option = document.createElement('div');
        option.className = 'custom-select-option' + (currentValue === metric.text ? ' selected' : '');
        option.setAttribute('data-value', metric.text);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', metric.i18n);
        span.textContent = metricLabel(metric.text);
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            onPick(metric.text);
        });
        listEl.appendChild(option);
    });
}

function updateMetricTrigger(which) {
    const name = which === 'x' ? xMetricName : which === 'y' ? yMetricName : sizeMetricName;
    const trigger = document.getElementById(which + '-metric-trigger');
    const span = trigger.querySelector('span');
    if (name === 'None') {
        span.textContent = t('metrics.none', 'None');
        span.setAttribute('data-i18n', 'metrics.none');
        return;
    }
    const metric = getMetricDef(name);
    span.textContent = metricLabel(name);
    if (metric) span.setAttribute('data-i18n', metric.i18n);
}

function setupMetricSelector(which) {
    const trigger = document.getElementById(which + '-metric-trigger');
    const options = document.getElementById(which + '-metric-options');
    const search = document.getElementById(which + 'MetricSearch');
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const opened = toggleDropdown(trigger, options);
        if (opened && search) {
            search.value = '';
            filterMetricDropdown(which, '');
            search.focus();
        }
    });
    if (search) {
        search.addEventListener('click', function (e) { e.stopPropagation(); });
        search.addEventListener('input', function () { filterMetricDropdown(which, this.value); });
        search.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') return;
            e.stopPropagation();
        });
    }
}

function filterMetricDropdown(which, query) {
    const list = document.getElementById(which + '-metric-list');
    const q = (query || '').trim().toLowerCase();
    let lastHeader = null;
    let headerHasMatch = false;
    list.querySelectorAll('.metric-category-header, .custom-select-option').forEach(el => {
        if (el.classList.contains('metric-category-header')) {
            if (lastHeader) lastHeader.hidden = !headerHasMatch && !!q;
            lastHeader = el;
            headerHasMatch = false;
            el.hidden = false;
            return;
        }
        const text = el.textContent.toLowerCase();
        const match = !q || text.includes(q);
        el.hidden = !match;
        if (match) headerHasMatch = true;
    });
    if (lastHeader) lastHeader.hidden = !headerHasMatch && !!q;
}

function pickMetric(which, name) {
    if (which === 'x') xMetricName = name;
    else if (which === 'y') yMetricName = name;
    else sizeMetricName = name;
    syncTemplateFromMetrics();
    rebuildMetricLists();
    closeSelector(which + '-metric-trigger', which + '-metric-options');
    updateChart();
}

function rebuildMetricLists() {
    fillMetricList(document.getElementById('x-metric-list'), xMetricName, false, name => pickMetric('x', name));
    fillMetricList(document.getElementById('y-metric-list'), yMetricName, false, name => pickMetric('y', name));
    fillMetricList(document.getElementById('size-metric-list'), sizeMetricName, true, name => pickMetric('size', name));
    updateMetricTrigger('x');
    updateMetricTrigger('y');
    updateMetricTrigger('size');
    buildThresholdMetricOptions();
}

function syncTemplateFromMetrics() {
    const match = availableTemplates().find(item => item.x === xMetricName && item.y === yMetricName);
    currentTemplate = match ? match.id : 'custom';
    updateTemplateTrigger();
}

function buildTemplateOptions() {
    const options = document.getElementById('template-select-options');
    options.innerHTML = '';
    const custom = { id: 'custom', i18n: 'templates.presets', label: 'Presets' };
    [custom].concat(availableTemplates()).forEach(template => {
        const option = document.createElement('div');
        option.className = 'custom-select-option' + (currentTemplate === template.id ? ' selected' : '');
        option.setAttribute('data-value', template.id);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', template.i18n);
        span.textContent = t(template.i18n, template.label);
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            if (template.id !== 'custom') {
                xMetricName = template.x;
                yMetricName = template.y;
            }
            currentTemplate = template.id;
            updateMetricTrigger('x');
            updateMetricTrigger('y');
            rebuildMetricLists();
            updateTemplateTrigger();
            closeSelector('template-select-trigger', 'template-select-options');
            updateChart();
        });
        options.appendChild(option);
    });
    updateTemplateTrigger();
}

function updateTemplateTrigger() {
    const trigger = document.getElementById('template-select-trigger');
    const tip = document.getElementById('template-tooltip');
    const templates = [{ id: 'custom', i18n: 'templates.presets', label: 'Presets' }].concat(availableTemplates());
    const template = templates.find(item => item.id === currentTemplate) || templates[0];
    if (trigger) trigger.classList.toggle('active', currentTemplate !== 'custom');
    if (tip) {
        tip.textContent = t(template.i18n, template.label);
        tip.setAttribute('data-i18n', template.i18n);
    }
    document.querySelectorAll('#template-select-options .custom-select-option').forEach(option => {
        option.classList.toggle('selected', option.getAttribute('data-value') === currentTemplate);
    });
}

function setupTemplateSelector() {
    const trigger = document.getElementById('template-select-trigger');
    const options = document.getElementById('template-select-options');
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDropdown(trigger, options);
    });
}

function buildAgeOptions() {
    const options = document.getElementById('age-select-options');
    options.innerHTML = '';
    AGE_OPTIONS.forEach(age => {
        const option = document.createElement('div');
        option.className = 'custom-select-option' + (selectedAge === age.value ? ' selected' : '');
        option.setAttribute('data-value', age.value);
        const span = document.createElement('span');
        if (age.i18n) span.setAttribute('data-i18n', age.i18n);
        span.textContent = age.text;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            selectedAge = age.value;
            updateAgeTrigger();
            closeSelector('age-select-trigger', 'age-select-options');
            updateChart();
        });
        options.appendChild(option);
    });
    updateAgeTrigger();
}

function updateAgeTrigger() {
    const trigger = document.getElementById('age-select-trigger');
    const span = trigger.querySelector('span');
    const age = AGE_OPTIONS.find(item => item.value === selectedAge) || AGE_OPTIONS[0];
    span.textContent = age.i18n ? t(age.i18n, age.text) : age.text;
    if (age.i18n) span.setAttribute('data-i18n', age.i18n);
    else span.removeAttribute('data-i18n');
    document.querySelectorAll('#age-select-options .custom-select-option').forEach(option => {
        option.classList.toggle('selected', option.getAttribute('data-value') === selectedAge);
    });
}

function setupAgeSelector() {
    const trigger = document.getElementById('age-select-trigger');
    const options = document.getElementById('age-select-options');
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDropdown(trigger, options);
    });
}

function buildThresholdMetricOptions() {
    const list = document.getElementById('threshold-metric-list');
    list.innerHTML = '';
    visibleMetrics().forEach(metric => {
        if (metric.text.startsWith('CATEGORY: ')) {
            const header = document.createElement('div');
            header.className = 'metric-category-header';
            const span = document.createElement('span');
            span.setAttribute('data-i18n', metric.i18n);
            span.textContent = t(metric.i18n, metric.text.replace('CATEGORY: ', ''));
            header.appendChild(span);
            list.appendChild(header);
            return;
        }
        const index = columnIndexMap[metric.text];
        if (index === undefined) return;
        const option = document.createElement('div');
        option.className = 'custom-select-option' + (thresholdMetricValue === String(index) ? ' selected' : '');
        option.setAttribute('data-value', String(index));
        const span = document.createElement('span');
        span.setAttribute('data-i18n', metric.i18n);
        span.textContent = metricLabel(metric.text);
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            thresholdMetricValue = String(index);
            updateThresholdTrigger();
            closeSelector('threshold-metric-trigger', 'threshold-metric-options');
            updateChart();
        });
        list.appendChild(option);
    });
    updateThresholdTrigger();
}

function updateThresholdTrigger() {
    const trigger = document.getElementById('threshold-metric-trigger');
    const span = trigger.querySelector('span');
    const index = parseInt(thresholdMetricValue, 10);
    const metric = customMetricOrder.find(item => !item.text.startsWith('CATEGORY: ') && columnIndexMap[item.text] === index);
    if (metric) {
        span.textContent = metricLabel(metric.text);
        span.setAttribute('data-i18n', metric.i18n);
    }
}

function setupThresholdSelector() {
    const trigger = document.getElementById('threshold-metric-trigger');
    const options = document.getElementById('threshold-metric-options');
    const search = document.getElementById('thresholdMetricSearch');
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const opened = toggleDropdown(trigger, options);
        if (opened && search) {
            search.value = '';
            filterThresholdOptions('');
            search.focus();
        }
    });
    search.addEventListener('click', function (e) { e.stopPropagation(); });
    search.addEventListener('input', function () { filterThresholdOptions(this.value); });
    search.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') return;
        e.stopPropagation();
    });
}

function filterThresholdOptions(query) {
    const list = document.getElementById('threshold-metric-list');
    const q = (query || '').trim().toLowerCase();
    let lastHeader = null;
    let headerHasMatch = false;
    list.querySelectorAll('.metric-category-header, .custom-select-option').forEach(el => {
        if (el.classList.contains('metric-category-header')) {
            if (lastHeader) lastHeader.hidden = !headerHasMatch && !!q;
            lastHeader = el;
            headerHasMatch = false;
            el.hidden = false;
            return;
        }
        const match = !q || el.textContent.toLowerCase().includes(q);
        el.hidden = !match;
        if (match) headerHasMatch = true;
    });
    if (lastHeader) lastHeader.hidden = !headerHasMatch && !!q;
}

function paddedDomain(values, invert) {
    const extent = d3.extent(values);
    if (!Number.isFinite(extent[0]) || !Number.isFinite(extent[1])) return invert ? [1, 0] : [0, 1];
    if (extent[0] === extent[1]) {
        const pad = Math.abs(extent[0]) * 0.1 || 1;
        const domain = [extent[0] - pad, extent[1] + pad];
        return invert ? [domain[1], domain[0]] : domain;
    }
    const nice = d3.scaleLinear().domain(extent).nice().domain();
    const originalRange = extent[1] - extent[0];
    const niceRange = nice[1] - nice[0];
    let domain;
    if ((niceRange / originalRange) > 1.2) {
        const padding = originalRange * 0.1;
        domain = [extent[0] - padding, extent[1] + padding];
    } else {
        domain = nice;
    }
    return invert ? [domain[1], domain[0]] : domain;
}

function circleRadius(d) {
    if (sizeMetricName === 'None') return 8;
    const value = getMetricValue(d, columnIndexMap[sizeMetricName], isToggled && columnCanConvert(columnIndexMap[sizeMetricName]));
    return Number.isFinite(value) ? sizeScale(value) : 8;
}

function updateChartDimensions() {
    const wrapper = document.querySelector('.chart-wrapper');
    if (!wrapper) return;
    const containerWidth = wrapper.clientWidth;
    const containerHeight = window.innerHeight * 0.7;
    const sideMargin = 30;
    const svgWidth = Math.min(1082, containerWidth - (sideMargin * 2));
    const isVerticalScreen = window.innerWidth / window.innerHeight < 1;

    let svgHeight;
    if (isVerticalScreen) {
        margin = {
            top: 40,
            right: 30,
            bottom: 60,
            left: 75
        };
        svgHeight = Math.min(containerHeight, svgWidth * 1.4);
        svgHeight = Math.max(svgHeight, 500);
    } else {
        margin = {
            top: 40,
            right: 30,
            bottom: 60,
            left: 79
        };
        svgHeight = svgWidth * 0.7;
    }

    width = svgWidth - margin.left - margin.right;
    height = svgHeight - margin.top - margin.bottom;
    d3.select('#scatter-plot').attr('width', svgWidth).attr('height', svgHeight);
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) chartContainer.style.height = svgHeight + 'px';
    if (plot) plot.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

function setupChart() {
    tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);
    svg = d3.select('#scatter-plot');
    updateChartDimensions();
    plot = svg.append('g').attr('class', 'plot-root').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    xScale = d3.scaleLinear();
    yScale = d3.scaleLinear();
    sizeScale = d3.scaleLinear().range([6, 14.8]);
    gXAxis = plot.append('g').attr('class', 'x-axis');
    gYAxis = plot.append('g').attr('class', 'y-axis');
    xLabel = plot.append('text').attr('class', 'x-label').attr('text-anchor', 'end').style('font-size', '14px');
    yLabel = plot.append('text').attr('class', 'y-label').attr('text-anchor', 'end').attr('transform', 'rotate(-90)').style('font-size', '14px');
    plot.append('g').attr('class', 'ref-layer');
    plot.append('g').attr('class', 'dot-layer');
    plot.append('g').attr('class', 'label-layer');
    chartReady = true;
}

function filterRows() {
    if (!originalDataArray.length) return [];
    const thresholdInput = document.getElementById('thresholdMin');
    const thresholdMin = thresholdInput ? parseFloat(thresholdInput.value) : NaN;
    const hasThreshold = Number.isFinite(thresholdMin);
    const thresholdIndex = parseInt(thresholdMetricValue, 10);
    const xIndex = columnIndexMap[xMetricName];
    const yIndex = columnIndexMap[yMetricName];
    const combinePositions = selectedPositions.size !== 1;
    const uniquePlayers = combinePositions ? new Set() : null;
    const rows = [];

    for (let i = 1; i < originalDataArray.length; i++) {
        const row = originalDataArray[i];
        if (!row || !row[0]) continue;
        if (!selectedLeagues.has(row[2])) continue;
        if (!selectedPositions.has(row[3])) continue;
        if (combinePositions) {
            const key = row[0] + '\0' + row[1];
            if (uniquePlayers.has(key)) continue;
            uniquePlayers.add(key);
        }
        if (selectedAge !== '' && parseFloat(row[AGE_INDEX]) > parseInt(selectedAge, 10)) continue;
        const xVal = getMetricValue(row, xIndex, isToggled);
        const yVal = getMetricValue(row, yIndex, isToggled);
        if (hasThreshold) {
            const thresholdValue = getMetricValue(row, thresholdIndex, isToggled);
            if (thresholdValue < thresholdMin) continue;
        }
        row._x = xVal;
        row._y = yVal;
        rows.push(row);
    }
    return rows;
}

function updateChart() {
    if (!chartReady) return;
    filteredData = filterRows();
    updateChartDimensions();
    xScale.range([0, width]).domain(paddedDomain(filteredData.map(d => d._x), isInverted(xMetricName)));
    yScale.range([height, 0]).domain(paddedDomain(filteredData.map(d => d._y), isInverted(yMetricName)));
    if (sizeMetricName !== 'None') {
        const sizeIndex = columnIndexMap[sizeMetricName];
        const sizeExtent = d3.extent(filteredData, d => getMetricValue(d, sizeIndex, isToggled && columnCanConvert(sizeIndex)));
        if (!Number.isFinite(sizeExtent[0]) || sizeExtent[0] === sizeExtent[1]) {
            const mid = Number.isFinite(sizeExtent[0]) ? sizeExtent[0] : 1;
            sizeScale.domain([mid - 1, mid + 1]);
        } else {
            sizeScale.domain(sizeExtent);
        }
    }

    gXAxis.attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(xScale).tickSize(0));
    gYAxis.call(d3.axisLeft(yScale).tickSize(0));
    xLabel.attr('x', width).attr('y', height + 35).text(metricLabel(xMetricName) + (isInverted(xMetricName) ? ' ↓' : ''));
    yLabel.attr('y', -53).attr('x', 0).text(metricLabel(yMetricName) + (isInverted(yMetricName) ? ' ↓' : ''));

    drawReferenceLines();
    drawCircles();
    drawClickedLabels();
    applySearchHighlight();
    updateSelectAllButtonText();
    updateLeagueLegend();
}

function drawReferenceLines() {
    const layer = plot.select('.ref-layer');
    layer.selectAll('*').remove();
    if (isDiagonalPair(xMetricName, yMetricName) && filteredData.length) {
        const xVals = filteredData.map(d => d._x);
        const yVals = filteredData.map(d => d._y);
        const minVal = Math.max(d3.min(xVals), d3.min(yVals));
        const maxVal = Math.min(d3.max(xVals), d3.max(yVals));
        layer.append('line')
            .attr('class', 'xy-line')
            .attr('x1', xScale(minVal)).attr('y1', yScale(minVal))
            .attr('x2', xScale(maxVal)).attr('y2', yScale(maxVal))
            .style('stroke', '#2ecc71').style('stroke-width', 2).style('stroke-dasharray', '5,3');
        layer.append('line')
            .attr('class', 'xy-line-hover')
            .attr('x1', xScale(minVal)).attr('y1', yScale(minVal))
            .attr('x2', xScale(maxVal)).attr('y2', yScale(maxVal))
            .style('stroke', 'transparent').style('stroke-width', 15).style('cursor', 'help')
            .on('mouseover', function () {
                if (diagonalHoverTimer) clearTimeout(diagonalHoverTimer);
                const eventX = d3.event.pageX;
                const eventY = d3.event.pageY;
                diagonalHoverTimer = setTimeout(function () {
                    tooltip.transition().duration(200).style('opacity', 0.9);
                    tooltip.html(
                        '<strong>' + t('tooltip.lineTitle', '1:1 line') + '</strong><br/>' +
                        diagonalTooltip(xMetricName, yMetricName)
                    ).style('left', (eventX + 10) + 'px').style('top', (eventY - 28) + 'px');
                }, 600);
            })
            .on('mouseout', function () {
                if (diagonalHoverTimer) {
                    clearTimeout(diagonalHoverTimer);
                    diagonalHoverTimer = null;
                }
                tooltip.transition().duration(300).style('opacity', 0);
            });
    }
    if (medianLinesVisible && filteredData.length) {
        const xMedian = d3.median(filteredData, d => d._x);
        const yMedian = d3.median(filteredData, d => d._y);
        layer.append('line').attr('class', 'median-line')
            .attr('x1', xScale(xMedian)).attr('y1', 0)
            .attr('x2', xScale(xMedian)).attr('y2', height)
            .style('stroke', 'rgba(0, 0, 0, 0.3)').style('stroke-dasharray', '4');
        layer.append('line').attr('class', 'median-line')
            .attr('x1', 0).attr('y1', yScale(yMedian))
            .attr('x2', width).attr('y2', yScale(yMedian))
            .style('stroke', 'rgba(0, 0, 0, 0.3)').style('stroke-dasharray', '4');
    }
}

function diagonalTooltip(xName, yName) {
    const pair = DIAGONAL_PAIRS.find(item =>
        (item[0] === xName && item[1] === yName) || (item[1] === xName && item[0] === yName)
    );
    const actualOnY = !!(pair && pair[0] === yName);
    const kind = pair ? pair[0] : '';
    const aboveKey = actualOnY ? 'above' : 'below';
    if (kind === 'Goals per 90' || kind === 'Non-penalty goals per 90' || kind === 'Goals per 100 touches') {
        return aboveKey === 'above'
            ? '<span>' + t('tooltip.lineAboveGoals', 'Players above this line are scoring more than expected.') + '</span><br/><span>' + t('tooltip.lineBelowGoals', 'Players below this line are scoring fewer than expected.') + '</span>'
            : '<span>' + t('tooltip.lineBelowGoals', 'Players below this line are scoring more than expected.') + '</span><br/><span>' + t('tooltip.lineAboveGoals', 'Players above this line are scoring fewer than expected.') + '</span>';
    }
    if (kind === 'Assists per 90') {
        return aboveKey === 'above'
            ? '<span>' + t('tooltip.lineAboveAssists', 'Players above this line are assisting more than expected.') + '</span><br/><span>' + t('tooltip.lineBelowAssists', 'Players below this line are assisting fewer than expected.') + '</span>'
            : '<span>' + t('tooltip.lineBelowAssists', 'Players below this line are assisting more than expected.') + '</span><br/><span>' + t('tooltip.lineAboveAssists', 'Players above this line are assisting fewer than expected.') + '</span>';
    }
    if (kind === 'Goals + Assists per 90' || kind === 'NPG+A per 90') {
        return aboveKey === 'above'
            ? '<span>' + t('tooltip.lineAboveGa', 'Players above this line have more goals and assists than expected.') + '</span><br/><span>' + t('tooltip.lineBelowGa', 'Players below this line have fewer goals and assists than expected.') + '</span>'
            : '<span>' + t('tooltip.lineBelowGa', 'Players below this line have more goals and assists than expected.') + '</span><br/><span>' + t('tooltip.lineAboveGa', 'Players above this line have fewer goals and assists than expected.') + '</span>';
    }
    return '<span>' + t('tooltip.lineTitle', '1:1 line') + '</span>';
}

function drawCircles() {
    const layer = plot.select('.dot-layer');
    const circles = layer.selectAll('circle').data(filteredData, d => getPlayerUniqueId(d));
    circles.exit().remove();
    const entered = circles.enter().append('circle').style('cursor', 'pointer');
    entered.merge(circles)
        .attr('cx', d => xScale(d._x))
        .attr('cy', d => yScale(d._y))
        .attr('r', d => circleRadius(d))
        .style('fill', d => clickedCircles.has(getPlayerUniqueId(d)) ? getLeagueColor(d[2]) : DEFAULT_DOT)
        .style('stroke', d => clickedCircles.has(getPlayerUniqueId(d)) ? '#000' : 'none')
        .style('stroke-width', d => clickedCircles.has(getPlayerUniqueId(d)) ? 2 : 0)
        .on('mouseover', onCircleOver)
        .on('mouseout', onCircleOut)
        .on('click', onCircleClick);
}

function onCircleOver(d) {
    const node = d3.select(this);
    const base = circleRadius(d);
    node.transition()
        .duration(200)
        .attr('r', base * 1.25)
        .style('fill', getLeagueColor(d[2]));
    const xIndex = columnIndexMap[xMetricName];
    const yIndex = columnIndexMap[yMetricName];
    const sizeIndex = sizeMetricName === 'None' ? null : columnIndexMap[sizeMetricName];
    tooltip.transition().duration(200).style('opacity', 0.9);
    tooltip.html(
        '<strong>' + d[0] + ' <span style="font-weight:400;">(' + d[1] + ', ' + d[AGE_INDEX] + ')</span></strong><br/>' +
        metricLabel(xMetricName) + ': ' + formatMetricValue(d._x, xIndex, isToggled) + '<br/>' +
        metricLabel(yMetricName) + ': ' + formatMetricValue(d._y, yIndex, isToggled) +
        (sizeIndex == null ? '' : '<br/>' + metricLabel(sizeMetricName) + ': ' + formatMetricValue(getMetricValue(d, sizeIndex, isToggled && columnCanConvert(sizeIndex)), sizeIndex, isToggled && columnCanConvert(sizeIndex)))
    );
    const tooltipNode = tooltip.node();
    const rect = tooltipNode.getBoundingClientRect();
    let left = d3.event.pageX + 10;
    let top = d3.event.pageY - 28;
    if (left + rect.width > window.innerWidth - 10) left = d3.event.pageX - rect.width - 10;
    if (top + rect.height > window.innerHeight - 10) top = d3.event.pageY - rect.height - 10;
    tooltip.style('left', Math.max(10, left) + 'px').style('top', Math.max(10, top) + 'px');

    if (window.matchMedia('(hover: none)').matches) {
        setTimeout(function () {
            tooltip.transition().duration(200).style('opacity', 0);
        }, 1000);
    }
}

function onCircleOut(d) {
    const node = d3.select(this);
    const base = circleRadius(d);
    const selected = clickedCircles.has(getPlayerUniqueId(d));
    if (window.matchMedia('(hover: hover)').matches) {
        tooltip.transition().duration(500).style('opacity', 0);
    }
    node.transition()
        .duration(200)
        .attr('r', base)
        .style('fill', selected ? getLeagueColor(d[2]) : DEFAULT_DOT);
}

function onCircleClick(d) {
    const id = getPlayerUniqueId(d);
    if (d3.select(this).classed('search-match')) resetSearch(false);
    if (clickedCircles.has(id)) clickedCircles.delete(id);
    else clickedCircles.add(id);
    drawCircles();
    drawClickedLabels();
    applySearchHighlight();
    updateSelectAllButtonText();
    updateLeagueLegend();
}

function selectHighlightedCircles() {
    const matches = plot.selectAll('circle.search-match');
    if (matches.empty()) return;
    matches.each(function (d) {
        clickedCircles.add(getPlayerUniqueId(d));
    });
    resetSearch(true);
    drawCircles();
    drawClickedLabels();
    updateSelectAllButtonText();
    updateLeagueLegend();
}

function selectAllCircles() {
    const allSelected = filteredData.length && filteredData.every(d => clickedCircles.has(getPlayerUniqueId(d)));
    if (allSelected) clickedCircles = new Set();
    else filteredData.forEach(d => clickedCircles.add(getPlayerUniqueId(d)));
    drawCircles();
    drawClickedLabels();
    updateSelectAllButtonText();
    updateLeagueLegend();
}

function updateSelectAllButtonText() {
    const icon = document.getElementById('select-icon');
    const tip = document.getElementById('select-all-tooltip');
    const allSelected = filteredData.length && filteredData.every(d => clickedCircles.has(getPlayerUniqueId(d)));
    if (icon) icon.className = allSelected ? 'ion-ios-circle-outline' : 'ion-ios-circle-filled';
    if (tip) {
        tip.textContent = allSelected ? t('tooltip.unselectAll', 'Unselect all players') : t('tooltip.select-all', 'Select all players');
        tip.setAttribute('data-i18n', allSelected ? 'tooltip.unselectAll' : 'tooltip.select-all');
    }
}

function drawClickedLabels() {
    const layer = plot.select('.label-layer');
    layer.selectAll('.team-label').remove();
    const existing = [];
    filteredData.forEach(d => {
        const id = getPlayerUniqueId(d);
        if (clickedCircles.has(id)) addTeamLabel(layer, d, false, existing);
    });
}

function addTeamLabel(layer, d, isSearchMatch, existingBoxes) {
    const x = xScale(d._x);
    const y = yScale(d._y);
    const playerName = d[0];
    const temp = layer.append('text').attr('class', 'temp-label').text(playerName)
        .style('font-size', '12px').style('opacity', 0);
    const labelWidth = temp.node().getComputedTextLength();
    temp.remove();
    const positions = [
        { dx: 8, dy: 0, anchor: 'start' },
        { dx: -8, dy: 0, anchor: 'end' },
        { dx: 0, dy: -8, anchor: 'middle' },
        { dx: 0, dy: 8, anchor: 'middle' }
    ];
    const labelHeight = 12;
    let chosen = null;
    if (!isSearchMatch) {
        for (let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            const labelX = x + pos.dx;
            const labelY = y + pos.dy;
            const box = {
                x1: pos.anchor === 'end' ? labelX - labelWidth : (pos.anchor === 'middle' ? labelX - labelWidth / 2 : labelX),
                y1: pos.dy < 0 ? labelY - labelHeight : labelY,
                x2: pos.anchor === 'start' ? labelX + labelWidth : (pos.anchor === 'middle' ? labelX + labelWidth / 2 : labelX),
                y2: pos.dy < 0 ? labelY : labelY + labelHeight
            };
            if (box.x1 < 0 || box.x2 > width || box.y1 < 0 || box.y2 > height) continue;
            const collides = existingBoxes.some(existing => !(box.x2 < existing.x1 || box.x1 > existing.x2 || box.y2 < existing.y1 || box.y1 > existing.y2));
            if (!collides) {
                chosen = pos;
                break;
            }
        }
        if (!chosen) {
            let neighbors = 0;
            existingBoxes.forEach(box => {
                const cx = (box.x1 + box.x2) / 2;
                const cy = (box.y1 + box.y2) / 2;
                if (Math.hypot(cx - x, cy - y) < 50) neighbors++;
            });
            if (neighbors > 3) return;
        }
    }
    if (!chosen) {
        chosen = positions[0];
        const labelX = x + chosen.dx;
        const labelY = y + chosen.dy;
        const box = {
            x1: chosen.anchor === 'end' ? labelX - labelWidth : (chosen.anchor === 'middle' ? labelX - labelWidth / 2 : labelX),
            y1: chosen.dy < 0 ? labelY - labelHeight : labelY,
            x2: chosen.anchor === 'start' ? labelX + labelWidth : (chosen.anchor === 'middle' ? labelX + labelWidth / 2 : labelX),
            y2: chosen.dy < 0 ? labelY : labelY + labelHeight
        };
        if (box.x1 < 0) chosen = positions[0];
        else if (box.x2 > width) chosen = positions[1];
        if (box.y1 < 0) chosen = positions[3];
        else if (box.y2 > height) chosen = positions[2];
    }
    const label = layer.append('text')
        .datum(d)
        .attr('class', 'team-label' + (isSearchMatch ? ' search-match' : ''))
        .attr('x', x + chosen.dx)
        .attr('y', y + chosen.dy)
        .attr('text-anchor', chosen.anchor)
        .attr('dominant-baseline', chosen.dy < 0 ? 'auto' : 'hanging')
        .text(playerName)
        .style('font-size', '12px')
        .style('font-weight', '500')
        .style('fill', '#333');
    const bbox = label.node().getBBox();
    existingBoxes.push({ x1: bbox.x - 2, y1: bbox.y - 2, x2: bbox.x + bbox.width + 2, y2: bbox.y + bbox.height + 2 });
}

function normalizeText(str) {
    if (!str) return '';
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/Ø/g, 'O').replace(/ø/g, 'o')
        .replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/Ł/g, 'L')
        .toLowerCase();
}

function applySearchHighlight() {
    if (!plot) return;
    const term = normalizeText(searchTerm);
    const layer = plot.select('.dot-layer');
    const labelLayer = plot.select('.label-layer');
    layer.selectAll('circle').classed('search-match', false).attr('r', d => circleRadius(d));
    labelLayer.selectAll('.team-label').classed('search-match', false).classed('search-dimmed', false);
    if (!term || term.length < 3) return;

    const matching = [];
    layer.selectAll('circle').filter(function (d) {
        const hit = normalizeText(d[0]).includes(term) || normalizeText(d[1]).includes(term);
        if (hit) matching.push(d);
        return hit;
    }).classed('search-match', true)
        .each(function () { this.parentNode.appendChild(this); });

    if (!matching.length) return;
    const matchIds = new Set(matching.map(d => getPlayerUniqueId(d)));
    labelLayer.selectAll('.team-label').each(function (d) {
        const node = d3.select(this);
        const isMatch = d && matchIds.has(getPlayerUniqueId(d));
        node.classed('search-match', isMatch).classed('search-dimmed', !isMatch);
    });
    const labeled = new Set();
    labelLayer.selectAll('.team-label').each(function (d) {
        if (d) labeled.add(getPlayerUniqueId(d));
    });
    const existing = [];
    labelLayer.selectAll('.team-label').each(function () {
        const bbox = this.getBBox();
        existing.push({ x1: bbox.x - 2, y1: bbox.y - 2, x2: bbox.x + bbox.width + 2, y2: bbox.y + bbox.height + 2 });
    });
    matching.forEach(d => {
        const id = getPlayerUniqueId(d);
        if (!labeled.has(id)) addTeamLabel(labelLayer, d, true, existing);
    });
}

function resetSearch(clearInput) {
    searchTerm = '';
    if (clearInput !== false) {
        const bar = document.getElementById('search-bar');
        if (bar) bar.value = '';
    }
    applySearchHighlight();
    drawClickedLabels();
}

function updateLeagueLegend() {
    const container = document.getElementById('league-legend');
    const matchingPreset = LEAGUE_PRESETS.find(preset => setsEqual(selectedLeagues, new Set(preset.leagues)));
    const show = matchingPreset && matchingPreset.value !== 'All Leagues' && matchingPreset.value !== 'All First Divisions' && matchingPreset.value !== 'No Top 7';
    if (!show || !clickedCircles.size) {
        container.style.display = 'none';
        return;
    }
    const visibleSelected = filteredData.some(d => clickedCircles.has(getPlayerUniqueId(d)));
    if (!visibleSelected) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';
    container.innerHTML = '';
    matchingPreset.leagues.forEach(league => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        const color = document.createElement('div');
        color.className = 'legend-color';
        color.style.backgroundColor = getLeagueColor(league);
        const text = document.createElement('span');
        const meta = INDIVIDUAL_LEAGUES.find(item => item.value === league);
        text.textContent = meta ? t(meta.i18n, meta.label) : league;
        item.appendChild(color);
        item.appendChild(text);
        container.appendChild(item);
    });
}

async function loadData() {
    const loading = document.getElementById('plotLoading');
    loading.hidden = false;
    loading.textContent = t('filters.loading', 'Loading…');
    const dataUrl = isPastSeason
        ? 'https://datamb.football/database/OLDINDEX.csv'
        : 'https://datamb.football/database/INDEX.csv';
    try {
        const response = await fetch(dataUrl, { cache: 'no-cache' });
        if (!response.ok) {
            alert('Failed to load data. Status: ' + response.status);
            return;
        }
        const text = await response.text();
        originalDataArray = parseCsv(HEADER_ROW + '\n' + text);
        updateChart();
    } catch (error) {
        alert('Error loading data: ' + error.message);
    } finally {
        loading.hidden = true;
    }
}

function parseStartupParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('past') === '1' || params.get('season') === 'past') isPastSeason = true;
    const raw = params.get('pos') || params.get('positions') || '';
    if (!raw) return;
    const next = new Set();
    raw.split(',').forEach(token => {
        const mapped = POSITION_ALIASES[token.trim()];
        if (mapped) next.add(mapped);
    });
    if (next.size) selectedPositions = next;
}

function initPlotApp() {
    parseStartupParams();
    ensureMetricsAvailable();
    setupChart();
    buildLeagueOptions();
    setupLeagueSelector();
    buildPositionOptions();
    setupPositionSelector();
    buildTemplateOptions();
    setupTemplateSelector();
    buildAgeOptions();
    setupAgeSelector();
    rebuildMetricLists();
    setupMetricSelector('x');
    setupMetricSelector('y');
    setupMetricSelector('size');
    setupThresholdSelector();

    document.getElementById('toggleMetrics').addEventListener('click', function () {
        isToggled = !isToggled;
        this.classList.toggle('active', isToggled);
        const tip = this.parentElement.querySelector('.btn-tooltip-text');
        const key = isToggled ? 'toggles.switchToPer90' : 'toggles.switchToTotal';
        tip.textContent = t(key, isToggled ? 'Switch to per 90' : 'Switch to total');
        tip.setAttribute('data-i18n', key);
        rebuildMetricLists();
        updateChart();
    });

    const pastBtn = document.getElementById('pastSeasonBtn');
    pastBtn.classList.toggle('active', isPastSeason);
    pastBtn.addEventListener('click', async function () {
        isPastSeason = !isPastSeason;
        this.classList.toggle('active', isPastSeason);
        const tip = this.parentElement.querySelector('.btn-tooltip-text');
        const key = isPastSeason ? 'toggles.switchToCurrentSeason' : 'toggles.switchToPastSeason';
        tip.textContent = t(key, isPastSeason ? 'Switch to current season' : 'Switch to past season');
        tip.setAttribute('data-i18n', key);
        await loadData();
    });

    document.getElementById('toggle-median-lines').addEventListener('click', function () {
        medianLinesVisible = !medianLinesVisible;
        const tip = document.getElementById('median-lines-tooltip');
        const key = medianLinesVisible ? 'tooltip.hideMedianLines' : 'tooltip.median-lines';
        tip.textContent = t(key, medianLinesVisible ? 'Hide median lines' : 'Show median lines');
        tip.setAttribute('data-i18n', key);
        updateChart();
    });
    document.getElementById('select-all-button').addEventListener('click', selectAllCircles);
    document.getElementById('screenshot-button').addEventListener('click', takeScreenshot);

    const thresholdMinField = document.getElementById('thresholdMinField');
    const thresholdMinInput = document.getElementById('thresholdMin');
    function syncThresholdMinField() {
        const empty = !thresholdMinInput.value.trim();
        thresholdMinField.classList.toggle('is-empty', empty);
    }
    thresholdMinField.addEventListener('click', function () {
        thresholdMinInput.focus();
    });
    thresholdMinInput.addEventListener('input', function () {
        syncThresholdMinField();
        clearTimeout(thresholdDebounce);
        thresholdDebounce = setTimeout(updateChart, 140);
    });
    thresholdMinInput.addEventListener('blur', syncThresholdMinField);
    syncThresholdMinField();

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function () {
        searchTerm = this.value;
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(applySearchHighlight, 60);
    });
    searchBar.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            searchTerm = this.value;
            applySearchHighlight();
            selectHighlightedCircles();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateChart, 80);
    });

    loadData();
}
