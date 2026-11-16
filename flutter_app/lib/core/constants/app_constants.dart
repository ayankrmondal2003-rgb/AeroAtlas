class AppConstants {
  static const String appName = 'AeroAtlas';
  static const String appTagline = 'Martian Exploration & EVA Planning';

  // Live web application URL (Render deployment or local fallback)
  static const String webAppUrl = 'https://aeroatlas.onrender.com';

  // Landing Site Coordinates (Jezero Crater)
  static const double jezeroLat = 18.38;
  static const double jezeroLon = 77.58;

  // Mars Time constants
  // Mars Sol length is approximately 24 hours, 39 minutes, 35.244 seconds (88,775.244 seconds)
  static const double solSeconds = 88775.244;
  
  // Perseverance Landing: 18 February 2021, 20:55 UTC (Sol 0)
  static final DateTime landingDateUtc = DateTime.utc(2021, 2, 18, 20, 55);

  // NASA DONKI Space Weather API Endpoint
  static const String donkiUrl =
      'https://api.nasa.gov/DONKI/WSAEnlilSimulations';
  static const String demoApiKey = 'DEMO_KEY';
}
